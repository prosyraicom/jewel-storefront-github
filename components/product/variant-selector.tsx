"use client";

import { usePostHog } from "components/posthog-context";
import { useProduct, useUpdateURL } from "components/product/product-context";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import posthog from "posthog-js";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const { postHogBaseInfo } = usePostHog();

  if (!options.length) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant.selectedOptions.reduce(
      (accumulator, option) => ({
        ...accumulator,
        [option.name.toLowerCase()]: option.value,
      }),
      {}
    ),
  }));

  const handleVariantSelect = (optionName: string, value: string) => {
    const newState = updateOption(optionName, value);
    updateURL(newState);

    // Track variant selection
    posthog.capture("variant_selected", {
      ...postHogBaseInfo,
      option_name: optionName,
      option_value: value,
      product_id: variants[0]?.id,
      product_title: variants[0]?.title,
      is_available: combinations.some(
        (combination) =>
          combination[optionName.toLowerCase()] === value &&
          combination.availableForSale
      ),
    });
  };

  return (
    <div className="mb-2 text-black">
      {options.map((option) => {
        const optionNameLowerCase = option.name.toLowerCase();
        const selectedValue = state[optionNameLowerCase] || option.values[0];

        return (
          <div key={option.id} className="mb-4">
            <label
              htmlFor={`select-${optionNameLowerCase}`}
              className="block mb-2 text-sm font-medium text-black"
            >
              {option.name}
            </label>
            <select
              id={`select-${optionNameLowerCase}`}
              value={selectedValue}
              onChange={(e) => {
                const newValue = e.target.value;
                handleVariantSelect(optionNameLowerCase, newValue);
              }}
              className="max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-black bg-white"
            >
              {option.values.map((value) => {
                // Check if this value is available (not sold out)
                const optionParams = { ...state, [optionNameLowerCase]: value };
                const isAvailable = variants.some(
                  (variant) =>
                    variant.selectedOptions.every(
                      (opt) =>
                        optionParams[opt.name.toLowerCase()] === opt.value ||
                        !optionParams[opt.name.toLowerCase()]
                    ) && variant.availableForSale
                );

                return (
                  <option key={value} value={value} disabled={!isAvailable}>
                    {value}
                    {!isAvailable ? " (Out of Stock)" : ""}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}
    </div>
  );
}
