"use client";

import { AddToCart } from "components/cart/add-to-cart";
import { Product } from "lib/shopify/types";
import { EstimatedShipping } from "./estimated-shipping";
import { ProductContent } from "./product-content";
import { ProductFeatures } from "./product-features";
import { ProductPrice } from "./product-price";
import { ProductRating } from "./product-rating";
import { ProductTitle } from "./product-title";
import { UrgencyText } from "./urgency-text";
import { VariantDropdown } from "./variant-dropdown";

export function ProductInfo({ product }: { product: Product }) {
  // Mock compareAtPrice for demonstration purposes
  const compareAtPrice = {
    amount: (
      parseFloat(product.priceRange.maxVariantPrice.amount) * 1.2
    ).toString(),
    currencyCode: product.priceRange.maxVariantPrice.currencyCode,
  };

  return (
    <div className="flex flex-col h-full text-black">
      <UrgencyText text="SOLD OUT 3X+ | Selling fast." />
      <ProductTitle title={product.title} />
      <ProductRating />
      <ProductPrice
        price={product.priceRange.maxVariantPrice}
        compareAtPrice={compareAtPrice}
      />
      <VariantDropdown options={product.options} variants={product.variants} />

      <AddToCart product={product} />
      {/* <BuyNowButton product={product} /> */}

      {/* Product Features with Icons */}
      <ProductFeatures />

      {/* Estimated Shipping Text */}
      <EstimatedShipping />

      {/* Product Description */}
      <ProductContent descriptionHtml={product.descriptionHtml} />
    </div>
  );
}
