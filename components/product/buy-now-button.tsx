"use client";

import { useProduct } from "components/product/product-context";
import { Product, ProductVariant } from "lib/shopify/types";

export function BuyNowButton({ product }: { product: Product }) {
  const { variants, availableForSale } = product;
  const { state } = useProduct();

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()]
    )
  );
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId
  );

  const handleBuyNow = () => {
    console.log("Buy Now clicked for product:", product.title);
    console.log("Selected variant:", finalVariant);
    alert(
      `Buy Now clicked for ${product.title} - ${finalVariant?.title || "default variant"}`
    );
  };

  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-green-600 p-4 tracking-wide text-white mt-4";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button disabled className={`${buttonClasses} ${disabledClasses}`}>
        Out Of Stock
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Please select an option"
        disabled
        className={`${buttonClasses} ${disabledClasses}`}
      >
        Buy Now
      </button>
    );
  }

  return (
    <button
      aria-label="Buy Now"
      className={`${buttonClasses} hover:opacity-90`}
      onClick={handleBuyNow}
    >
      Buy Now
    </button>
  );
}
