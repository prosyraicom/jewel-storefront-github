"use client";

import { useProduct, useUpdateURL } from "components/product/product-context";
import { ProductOption, ProductVariant } from "lib/shopify/types";

interface VariantDropdownProps {
  options: ProductOption[];
  variants: ProductVariant[];
}

export function VariantDropdown({ options, variants }: VariantDropdownProps) {
  const { state, updateOption } = useProduct();
  const updateURL = useUpdateURL();

  if (!options.length) {
    return null;
  }

  return (
    <div className="mb-6 text-black">
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
                const newState = updateOption(optionNameLowerCase, newValue);

                updateURL(newState);
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
