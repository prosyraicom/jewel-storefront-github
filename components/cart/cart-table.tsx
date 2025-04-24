"use client";

import { useCart } from "components/cart/cart-context";
import Price from "components/price";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartTable() {
  const { cart, updateCartItem } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <CartTableLoading />;
  }

  if (!cart || !cart.lines.length) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 py-12">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <Link
          href="/"
          className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mb-10">
      {/* Table Header */}
      <div className="grid grid-cols-12 md:grid-cols-5 text-xs font-light uppercase tracking-wider border-b pb-5">
        <div className="col-span-9 md:col-span-3 text-left">PRODUCT</div>
        <div className="hidden md:block md:col-span-1 text-center">
          QUANTITY
        </div>
        <div className="col-span-3 md:col-span-1 text-right">TOTAL</div>
      </div>

      {/* Cart Items */}
      <div className="divide-y divide-gray-200">
        {cart.lines.map((item, i) => (
          <div
            key={i}
            className="py-6 grid grid-cols-12 md:grid-cols-5 items-start md:items-center"
          >
            {/* Product - Mobile: 9/12 columns, Desktop: 3/5 columns */}
            <div className="col-span-9 md:col-span-3 flex items-start space-x-4">
              <div className="relative h-[100px] w-[100px] md:h-[120px] md:w-[120px] flex-shrink-0 overflow-hidden rounded">
                <Image
                  src={item.merchandise.product.featuredImage.url}
                  alt={
                    item.merchandise.product.featuredImage.altText ||
                    item.merchandise.product.title
                  }
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="text-[10px] font-light uppercase mb-1">
                  JEWEL
                </div>
                <div className="font-semibold text-lg line-clamp-4 pr-2">
                  <Link
                    href={`/product/${item.merchandise.product.handle}`}
                    className="hover:underline"
                  >
                    {item.merchandise.product.title}
                  </Link>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  <Price
                    amount={item.cost.totalAmount.amount}
                    currencyCode={item.cost.totalAmount.currencyCode}
                  />
                </div>
                {/* Variant Options */}
                {item.merchandise.selectedOptions?.map(
                  (option, index) =>
                    option.value !== "Default Title" && (
                      <p
                        key={index}
                        className="text-sm text-gray-500 line-clamp-2"
                      >
                        {option.name}: {option.value}
                      </p>
                    )
                )}
                {/* Trash icon shown only on mobile */}
                <button
                  onClick={() => updateCartItem(item.merchandise.id, "delete")}
                  className="mt-2 text-gray-400 hover:text-gray-600 self-start md:hidden"
                  aria-label="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    focusable="false"
                    className="w-5 h-5"
                  >
                    <path
                      d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z"
                      fill="currentColor"
                    />
                    <path
                      d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Quantity - Only visible on desktop */}
            <div className="hidden md:flex md:col-span-1 items-center justify-center">
              <button
                onClick={() => updateCartItem(item.merchandise.id, "delete")}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Remove item"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  focusable="false"
                  className="w-5 h-5"
                >
                  <path
                    d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z"
                    fill="currentColor"
                  />
                  <path
                    d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            {/* Total - Visible on both mobile and desktop */}
            <div className="col-span-3 md:col-span-1 flex items-center justify-end">
              <Price
                className="font-light"
                amount={item.cost.totalAmount.amount}
                currencyCode={item.cost.totalAmount.currencyCode}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartTableLoading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-pulse text-center">
        <div className="h-8 w-32 bg-gray-200 rounded mb-4 mx-auto"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
