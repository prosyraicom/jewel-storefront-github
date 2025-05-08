"use client";

import clsx from "clsx";
import { useCart } from "components/cart/cart-context";
import { usePostHog } from "components/posthog-context";
import { useProduct } from "components/product/product-context";
import { Product, ProductVariant } from "lib/shopify/types";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";

function SubmitButton({
  availableForSale,
  selectedVariantId,
  quantity,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
  quantity: number;
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-md bg-[#23ae3b] p-4 tracking-wide text-white font-bold text-lg";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        Add to cart
      </button>
    );
  }

  return (
    <button
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        "hover:opacity-90": true,
      })}
    >
      {quantity > 1 ? `Add ${quantity} to cart` : "Add to cart"}
    </button>
  );
}

export function AddToCart({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { addCartItem } = useCart();
  const { state } = useProduct();
  const searchParams = useSearchParams();
  const { postHogBaseInfo } = usePostHog();

  // Get quantity from URL or default to 1
  const quantity = parseInt(searchParams.get("quantity") || "1", 10);

  // Function to find a variant by its selected option value
  const findVariantByValue = (value: string): ProductVariant | undefined => {
    return variants.find((variant: ProductVariant) =>
      variant.selectedOptions.some((option) => option.value === value)
    );
  };

  // Default variant when no variant parameters are in the URL
  const defaultVariant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId =
    variants.length === 1 ? variants[0]?.id : defaultVariant?.id;

  // Handler for adding items to cart
  const handleAddToCart = () => {
    if (quantity === 1) {
      // For single item, use the default variant
      const singleVariant = defaultVariant || variants[0];
      if (singleVariant) {
        addCartItem(singleVariant, product);

        // Track single item addition
        posthog.capture("add_to_cart", {
          ...postHogBaseInfo,
          quantity: 1,
          variant_id: singleVariant.id,
          product_id: product.id,
        });
      }
    } else {
      // For multiple items, read variants from URL
      for (let i = 0; i < quantity; i++) {
        const variantParam = searchParams.get(`variant${i + 1}`);
        if (variantParam) {
          const variant = findVariantByValue(variantParam);
          if (variant) {
            addCartItem(variant, product);

            // Track each variant addition
            posthog.capture("add_to_cart", {
              ...postHogBaseInfo,
              quantity: 1,
              variant_id: variant.id,
              product_id: product.id,
              position: i + 1,
              total_quantity: quantity,
            });
          }
        }
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddToCart();
      }}
    >
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={defaultVariantId}
        quantity={quantity}
      />
    </form>
  );
}
