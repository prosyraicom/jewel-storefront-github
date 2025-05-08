"use client";

import { usePostHog } from "components/posthog-context";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import posthog from "posthog-js";
import { useState } from "react";

export function VariantSelector({
  options,
  variants,
  position,
  onSelect,
  selectedValue,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
  position: number;
  onSelect: (position: number, variant: string) => void;
  selectedValue: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { postHogBaseInfo } = usePostHog();

  const handleSelect = (value: string) => {
    onSelect(position - 1, value);
    setIsOpen(false);

    // Track selection
    posthog.capture("pack_variant_selected", {
      ...postHogBaseInfo,
      position: position,
      variant: value,
    });
  };

  // If no options are available, don't render
  if (!options.length || !options[0]?.values.length) {
    return null;
  }

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
      >
        <span>{selectedValue || options[0].values[0]}</span>
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
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {options[0].values.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => handleSelect(value)}
              className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                selectedValue === value ? "bg-gray-50 font-medium" : ""
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
