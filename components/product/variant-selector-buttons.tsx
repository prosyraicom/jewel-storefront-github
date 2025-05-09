"use client";

import { usePostHog } from "components/posthog-context";
import { useProduct, useUpdateURL } from "components/product/product-context";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useEffect } from "react";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantSelect({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();
  const router = useRouter();
  const { postHogBaseInfo } = usePostHog();

  // If there's only one option value, automatically select it
  useEffect(() => {
    const firstOption = options[0];
    if (firstOption?.name && firstOption.values.length === 1) {
      const optionName = firstOption.name.toLowerCase();
      const optionValue = firstOption.values[0];
      if (typeof optionName === "string" && typeof optionValue === "string") {
        handleVariantSelect(optionName, optionValue);
      }
    } else if (firstOption?.name && !state[firstOption.name.toLowerCase()]) {
      const firstAvailableValue = firstOption.values.find((value) =>
        combinations.some(
          (combination) =>
            combination[firstOption.name.toLowerCase()] === value &&
            combination.availableForSale
        )
      );
      if (firstAvailableValue) {
        handleVariantSelect(
          firstOption.name.toLowerCase(),
          firstAvailableValue
        );
      }
    }
  }, [options]);

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

  // Don't render anything if there's only one option value
  if (!options[0] || options[0].values.length <= 1) {
    return null;
  }

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-medium text-black dark:text-white">
        {options[0]?.name}:
      </label>
      <div className="flex flex-wrap gap-2">
        {options[0]?.values.map((value) => {
          const optionNameLowerCase = options[0]?.name.toLowerCase() || "";
          const isActive = state[optionNameLowerCase] === value;
          const isAvailableForSale = combinations.some(
            (combination) =>
              combination[optionNameLowerCase] === value &&
              combination.availableForSale
          );

          return (
            <button
              key={value}
              onClick={() => handleVariantSelect(optionNameLowerCase, value)}
              disabled={!isAvailableForSale}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                isActive
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-white text-black border border-neutral-300 hover:bg-neutral-100 dark:bg-neutral-900 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-800"
              } ${
                !isAvailableForSale
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}
