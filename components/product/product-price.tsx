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
      <span className="text-xl font-bold mr-2 text-green-600">
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
        <span className="badge price__badge-sale color-accent-2 ml-2 bg-red-600 text-white px-2 py-1.5 rounded-md flex items-center font-bold text-xs uppercase tracking-wide">
          <svg
            aria-hidden="true"
            focusable="false"
            className="icon icon-discount w-3 h-3 mr-1 text-white"
            viewBox="0 0 12 12"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7 0h3a2 2 0 012 2v3a1 1 0 01-.3.7l-6 6a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4l6-6A1 1 0 017 0zm2 2a1 1 0 102 0 1 1 0 00-2 0z"
              fill="currentColor"
            ></path>
          </svg>
          <span className="nowrap">
            {Math.round(
              (1 -
                parseFloat(price.amount) / parseFloat(compareAtPrice.amount)) *
                100
            )}
            % OFF ENDS 12AM
          </span>
        </span>
      )}
    </div>
  );
}
