"use client";

import { AddToCart } from "components/cart/add-to-cart";
import { useProduct } from "components/product/product-context";
import { Product } from "lib/shopify/types";
import { useRef } from "react";
import { DropdownInstruction } from "./dropdown-instruction";
import { EstimatedShipping } from "./estimated-shipping";
import { ProductChecklist } from "./product-checklist";
import { ProductContent } from "./product-content";
import { ProductFeatures } from "./product-features";
import { ProductInfoReview } from "./product-info-review";
import { ProductPrice } from "./product-price";
import { ProductRating } from "./product-rating";
import { ProductTitle } from "./product-title";
import { QuantitySelector } from "./quantity-selector";
import { StickyAddToCart } from "./sticky-add-to-cart";
import { UrgencyText } from "./urgency-text";
import { VariantSelect } from "./variant-selector-buttons";

export function ProductInfo({ product }: { product: Product }) {
  // Create a ref for the AddToCart button
  const addToCartRef = useRef<HTMLDivElement>(null);
  const { state } = useProduct();

  // Find the selected variant based on the current state
  const selectedVariant =
    product.variants.find((variant) =>
      variant.selectedOptions.every(
        (option) => option.value === state[option.name.toLowerCase()]
      )
    ) || product.variants[0]; // Fallback to first variant if none selected

  if (!selectedVariant) {
    return null; // Handle case where no variants exist
  }

  // Mock compareAtPrice for demonstration purposes
  const compareAtPrice = {
    amount: parseFloat(product.compareAtPriceRange.maxVariantPrice.amount),
    currencyCode: product.compareAtPriceRange.maxVariantPrice.currencyCode,
  };

  return (
    <div className="flex flex-col h-full text-black">
      <UrgencyText text="SOLD OUT 3X+ | Selling fast." />
      <ProductTitle title={product.title} />
      <ProductRating />
      <ProductPrice
        price={{
          amount: selectedVariant.price.amount.toString(),
          currencyCode: selectedVariant.price.currencyCode,
        }}
        compareAtPrice={{
          amount: compareAtPrice.amount.toString(),
          currencyCode: compareAtPrice.currencyCode,
        }}
      />
      {/* <VariantDropdown options={product.options} variants={product.variants} /> */}
      <ProductChecklist
        features={[
          "curbs cravings",
          "boosts metabolism",
          "improves digestion",
          "promotes weight loss",
        ]}
      />
      <ProductInfoReview
        review="I've been using this product for a week and I've already seen a difference in my energy levels. I'm more focused and less hungry."
        name="John Doe"
        stars={4.5}
      />
      <VariantSelect options={product.options} variants={product.variants} />
      {/* Our new Quantity Selector with variant dropdowns */}
      <QuantitySelector options={product.options} variants={product.variants} />
      {/* Add ref to track the AddToCart button position */}
      <div ref={addToCartRef}>
        <AddToCart product={product} />
      </div>
      {/* <BuyNowButton product={product} /> */}
      {/* Product Features with Icons */}
      <ProductFeatures />
      {/* Estimated Shipping Text */}
      <EstimatedShipping />
      <DropdownInstruction
        instructions={[
          {
            header: "How it works",
            content:
              "Shilajit works by providing a natural boost to your energy, stamina, and mental clarity. Crafted from pure, earth-sourced minerals and 75% fulvic acid, it supports fast absorption to deliver sustained vitality throughout your day.\n\nFuel your day with Shilajit—experience **unstoppable energy and clarity!**",
          },
          {
            header: "Recommended use",
            content:
              "1. **Tear open** one Shilajit stick.\n2. **Sip directly** from the packet or mix it with your favorite drink.\n3. Enjoy the energy, focus, and stamina boost to power through your day!\n\n**Tip:** Avoid taking it before bedtime if you don’t want to stay awake.",
          },
        ]}
      />
      {/* Product Description */}
      <ProductContent descriptionHtml={product.descriptionHtml} />
      {/* Sticky Add to Cart component */}
      <StickyAddToCart product={product} addToCartRef={addToCartRef} />
    </div>
  );
}
