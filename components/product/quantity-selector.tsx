"use client";

import { usePostHog } from "components/posthog-context";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { VariantSelector } from "./variant-selector";

interface QuantityOption {
  id: number;
  quantity: number;
  label: string;
  subLabel: string;
  price: number;
  originalPrice: number;
  saveAmount: number;
  saveText: string;
  supply: string;
}

export function QuantitySelector({
  options,
  variants,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
}) {
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);
  const { postHogBaseInfo } = usePostHog();

  const quantityOptions: QuantityOption[] = [
    {
      id: 1,
      quantity: 1,
      label: "Buy 1",
      subLabel: "1 Pack (30-Day Supply)",
      price: 10,
      originalPrice: 50,
      saveAmount: 40,
      saveText: "You save $40",
      supply: "30-Day Supply",
    },
    {
      id: 2,
      quantity: 2,
      label: "Buy 2",
      subLabel: "2 Packs (60-Day Supply)",
      price: 20,
      originalPrice: 100,
      saveAmount: 80,
      saveText: "You save $80",
      supply: "60-Day Supply",
    },
    {
      id: 3,
      quantity: 3,
      label: "Buy 3",
      subLabel: "3 Packs (90-Day Supply)",
      price: 30,
      originalPrice: 150,
      saveAmount: 120,
      saveText: "You save $120",
      supply: "90-Day Supply",
    },
    {
      id: 4,
      quantity: 4,
      label: "Buy 4",
      subLabel: "4 Packs (120-Day Supply)",
      price: 40,
      originalPrice: 200,
      saveAmount: 160,
      saveText: "You save $160",
      supply: "120-Day Supply",
    },
  ];

  // Initialize selected variants with the first variant
  useEffect(() => {
    if (variants.length && options.length) {
      const initialVariant = options[0]?.values[0] || "";
      setSelectedVariants(Array(4).fill(initialVariant));
    }
  }, [variants, options]);

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity);

    // Track quantity selection
    posthog.capture("quantity_selected", {
      ...postHogBaseInfo,
      quantity: quantity,
    });
  };

  const handleVariantChange = (index: number, variant: string) => {
    const newSelectedVariants = [...selectedVariants];
    newSelectedVariants[index] = variant;
    setSelectedVariants(newSelectedVariants);

    // Track variant change for specific position
    posthog.capture("pack_variant_selected", {
      ...postHogBaseInfo,
      position: index + 1,
      variant: variant,
    });
  };

  return (
    <div className="w-full">
      <div className="text-center border-t border-b border-black py-2 mb-4">
        <span className="font-bold">LIMITED TIME OFFER | SAVE $100+</span>
      </div>

      <div className="flex flex-col gap-4">
        {quantityOptions.map((option) => {
          const isSelected = selectedQuantity === option.quantity;
          const isMostPopular = option.quantity === 2;

          return (
            <div
              key={option.id}
              className={`relative border rounded-lg p-4 ${
                isSelected ? "border-2 border-black" : "border-gray-300"
              }`}
            >
              {isMostPopular && (
                <div className="absolute right-0 top-0 bg-black text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-bold">
                  Most Popular
                </div>
              )}

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    id={`quantity-${option.quantity}`}
                    name="quantity"
                    checked={isSelected}
                    onChange={() => handleQuantityChange(option.quantity)}
                    className="w-4 h-4"
                  />
                  <div>
                    <label
                      htmlFor={`quantity-${option.quantity}`}
                      className="font-bold text-lg cursor-pointer"
                    >
                      {option.label}
                    </label>
                    <span className="ml-2 px-2 py-1 text-xs bg-gray-200 rounded-full">
                      {option.saveText}
                    </span>
                    <p className="text-sm text-gray-600">{option.subLabel}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xl">${option.price}</div>
                  <div className="text-sm text-gray-500 line-through">
                    ${option.originalPrice}
                  </div>
                </div>
              </div>

              {/* Show variant selectors only if this quantity is selected and quantity > 1 */}
              {isSelected && option.quantity > 1 && (
                <div className="mt-4 pl-8">
                  {Array.from({ length: option.quantity }).map((_, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <span className="font-bold mr-2">#{index + 1}</span>
                      <VariantSelector
                        options={options}
                        variants={variants}
                        position={index + 1}
                        onSelect={handleVariantChange}
                        selectedValue={selectedVariants[index] || ""}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
