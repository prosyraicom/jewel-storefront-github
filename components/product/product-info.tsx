"use client";

import { AddToCart } from "components/cart/add-to-cart";
import { useProduct } from "components/product/product-context";
import { Product } from "lib/shopify/types";
import { useRef } from "react";
import { EstimatedShipping } from "./estimated-shipping";
import { ProductContent } from "./product-content";
import { ProductFeatures } from "./product-features";
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

      {/* Product Description */}
      <ProductContent descriptionHtml={product.descriptionHtml} />

      {/* Sticky Add to Cart component */}
      <StickyAddToCart product={product} addToCartRef={addToCartRef} />
    </div>
  );
}
