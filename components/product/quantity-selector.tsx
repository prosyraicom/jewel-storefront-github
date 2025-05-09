"use client";

import { usePostHog } from "components/posthog-context";
import { ProductOption, ProductVariant } from "lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";
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
  basePrice,
  compareAtPrice,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
  basePrice: number;
  compareAtPrice?: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { postHogBaseInfo } = usePostHog();

  // Get quantity from URL or default to 1
  const initialQuantity = parseInt(searchParams.get("quantity") || "1", 10);
  const [selectedQuantity, setSelectedQuantity] =
    useState<number>(initialQuantity);

  // Get variants from URL or initialize with empty array
  const [selectedVariants, setSelectedVariants] = useState<string[]>([]);

  // Calculate prices and savings for each quantity option
  const quantityOptions: QuantityOption[] = [
    {
      id: 1,
      quantity: 1,
      label: "Buy 1",
      subLabel: "1 Pack (30-Day Supply)",
      price: basePrice,
      originalPrice: compareAtPrice || basePrice,
      saveAmount: compareAtPrice ? compareAtPrice - basePrice : 0,
      saveText: compareAtPrice
        ? `You save $${(compareAtPrice - basePrice).toFixed(2)}`
        : "",
      supply: "30-Day Supply",
    },
    {
      id: 2,
      quantity: 2,
      label: "Buy 2",
      subLabel: "2 Packs (60-Day Supply)",
      price: basePrice * 2,
      originalPrice: (compareAtPrice || basePrice) * 2,
      saveAmount: compareAtPrice ? (compareAtPrice - basePrice) * 2 : 0,
      saveText: compareAtPrice
        ? `You save $${((compareAtPrice - basePrice) * 2).toFixed(2)}`
        : "",
      supply: "60-Day Supply",
    },
    {
      id: 3,
      quantity: 3,
      label: "Buy 3",
      subLabel: "3 Packs (90-Day Supply)",
      price: basePrice * 3,
      originalPrice: (compareAtPrice || basePrice) * 3,
      saveAmount: compareAtPrice ? (compareAtPrice - basePrice) * 3 : 0,
      saveText: compareAtPrice
        ? `You save $${((compareAtPrice - basePrice) * 3).toFixed(2)}`
        : "",
      supply: "90-Day Supply",
    },
    {
      id: 4,
      quantity: 4,
      label: "Buy 4",
      subLabel: "4 Packs (120-Day Supply)",
      price: basePrice * 4,
      originalPrice: (compareAtPrice || basePrice) * 4,
      saveAmount: compareAtPrice ? (compareAtPrice - basePrice) * 4 : 0,
      saveText: compareAtPrice
        ? `You save $${((compareAtPrice - basePrice) * 4).toFixed(2)}`
        : "",
      supply: "120-Day Supply",
    },
  ];

  // Initialize selected variants from URL or with defaults
  useEffect(() => {
    if (variants.length && options.length) {
      const initialVariant = options[0]?.values[0] || "";
      const variantsFromUrl: string[] = [];

      // Read variants from URL
      for (let i = 0; i < 4; i++) {
        const variantParam = searchParams.get(`variant${i + 1}`);
        variantsFromUrl.push(variantParam || initialVariant);
      }

      setSelectedVariants(variantsFromUrl);
    }
  }, [variants, options, searchParams]);

  // Update URL when quantity or variants change
  const updateUrl = (quantity: number, updatedVariants: string[]) => {
    const params = new URLSearchParams(searchParams.toString());

    // Set quantity parameter
    params.set("quantity", quantity.toString());

    // Set variant parameters
    for (let i = 0; i < quantity; i++) {
      if (updatedVariants[i]) {
        params.set(`variant${i + 1}`, updatedVariants[i] || "");
      }
    }

    // Remove unused variant parameters
    for (let i = quantity; i < 4; i++) {
      params.delete(`variant${i + 1}`);
    }

    // Update URL without refreshing the page
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleQuantityChange = (quantity: number) => {
    setSelectedQuantity(quantity);
    updateUrl(quantity, selectedVariants);

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
    updateUrl(selectedQuantity, newSelectedVariants);

    // Track variant change for specific position
    posthog.capture("pack_variant_selected", {
      ...postHogBaseInfo,
      position: index + 1,
      variant: variant,
    });
  };

  return (
    <div className="w-full mb-4">
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-black"></div>
        <span className="mx-4 font-bold tracking-wide">
          LIMITED TIME OFFER | SAVE $100+
        </span>
        <div className="flex-grow border-t border-black"></div>
      </div>

      <div className="flex flex-col gap-4">
        {quantityOptions.map((option) => {
          const isSelected = selectedQuantity === option.quantity;
          const isMostPopular = option.quantity === 2;

          return (
            <div
              key={option.id}
              className={`relative border rounded-lg p-4 transition-colors duration-200 hover:bg-gray-50 ${
                isSelected ? "border-2 border-black" : "border-gray-300"
              }`}
            >
              {isMostPopular && (
                <div className="absolute -right-4 top-0 bg-black text-white px-3 py-1 text-sm font-bold rotate-10 origin-top-right">
                  Most Popular
                </div>
              )}

              <label
                htmlFor={`quantity-${option.quantity}`}
                className="flex justify-between items-center cursor-pointer"
              >
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
                    <span className="font-bold text-lg">{option.label}</span>
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
              </label>

              {/* Show variant selectors only if this quantity is selected, quantity > 1, and there are multiple options */}
              {isSelected &&
                option.quantity > 1 &&
                options[0] &&
                options[0].values.length > 1 && (
                  <div className="mt-4 pl-8">
                    {Array.from({ length: option.quantity }).map((_, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <span className="font-bold mr-2">#{index + 1}</span>
                        <VariantSelector
                          options={options}
                          variants={variants}
                          position={index + 1}
                          onSelect={(_, variant) =>
                            handleVariantChange(index, variant)
                          }
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
