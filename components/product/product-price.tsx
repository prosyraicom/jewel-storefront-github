"use client";

import { Money } from "lib/shopify/types";

interface ProductPriceProps {
  price: Money;
  compareAtPrice?: Money;
}

export function ProductPrice({ price, compareAtPrice }: ProductPriceProps) {
  const hasDiscount =
    compareAtPrice &&
    parseFloat(compareAtPrice.amount) > parseFloat(price.amount);

  return (
    <div className="flex items-center mb-4">
      <span className="text-2xl font-bold mr-2 text-black">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: price.currencyCode,
        }).format(parseFloat(price.amount))}
      </span>

      {hasDiscount && (
        <span className="text-lg text-gray-500 line-through">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: compareAtPrice.currencyCode,
          }).format(parseFloat(compareAtPrice.amount))}
        </span>
      )}

      {hasDiscount && (
        <span className="ml-2 text-sm text-green-600 font-medium">
          {Math.round(
            (1 - parseFloat(price.amount) / parseFloat(compareAtPrice.amount)) *
              100
          )}
          % off
        </span>
      )}
    </div>
  );
}
