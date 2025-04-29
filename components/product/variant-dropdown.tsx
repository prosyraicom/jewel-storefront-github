"use client";

import { usePostHog } from "components/posthog-context";
import { useProduct, useUpdateURL } from "components/product/product-context";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { useState } from "react";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean;
};

export function VariantDropdown({
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
  const [isOpen, setIsOpen] = useState(false);

  const hasNoOptionsOrJustOneOption =
    !options.length ||
    (options.length === 1 && options[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
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
    setIsOpen(false);

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
    <div className="relative mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 z-10"
      >
        <span>Select {options[0]?.name}</span>
        <svg
          className={`h-4 w-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-full rounded-md border border-neutral-300 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-900 z-50">
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
                className={`block w-full px-4 py-2 text-left text-sm ${
                  isActive ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20" : ""
                } ${
                  !isAvailableForSale
                    ? "cursor-not-allowed text-neutral-400 dark:text-neutral-600"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800"
                }`}
              >
                {value}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
