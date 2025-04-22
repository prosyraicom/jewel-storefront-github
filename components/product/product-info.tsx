"use client";

import { AddToCart } from "components/cart/add-to-cart";
import Prose from "components/prose";
import { Product } from "lib/shopify/types";
import { BuyNowButton } from "./buy-now-button";
import { ProductPrice } from "./product-price";
import { ProductRating } from "./product-rating";
import { ProductTitle } from "./product-title";
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
      <ProductTitle title={product.title} />
      <ProductRating />
      <ProductPrice
        price={product.priceRange.maxVariantPrice}
        compareAtPrice={compareAtPrice}
      />
      <VariantDropdown options={product.options} variants={product.variants} />

      <div className="mt-auto">
        <AddToCart product={product} />
        <BuyNowButton product={product} />
      </div>

      <div className="mt-8">
        {product.descriptionHtml ? (
          <Prose
            className="text-sm leading-normal text-black"
            html={product.descriptionHtml}
          />
        ) : null}
      </div>
    </div>
  );
}
