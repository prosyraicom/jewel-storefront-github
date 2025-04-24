"use client";

import { useCart } from "components/cart/cart-context";
import Price from "components/price";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

function CartContent() {
  const { cart, updateCartItem } = useCart();
  const [isClient, setIsClient] = useState(false);

  // Only render the actual cart content after client-side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show a loading state during server-side rendering
  if (!isClient) {
    return <CartLoading />;
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
    <div className="mx-auto max-w-[1400px] py-8 px-[15px] md:px-[50px]">
      {/* Cart Table */}
      <div className="mb-10">
        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-3 text-sm font-medium uppercase tracking-wider border-b pb-3">
          <div className="text-left">PRODUCT</div>
          <div className="text-center">QUANTITY</div>
          <div className="text-right">TOTAL</div>
        </div>

        {/* Cart Items */}
        <div className="divide-y divide-gray-200">
          {cart.lines.map((item, i) => (
            <div key={i} className="py-6 grid md:grid-cols-3 items-center">
              {/* Product */}
              <div className="flex items-center space-x-4">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded border">
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
                <div>
                  <div className="font-medium">
                    <Link
                      href={`/product/${item.merchandise.product.handle}`}
                      className="hover:underline"
                    >
                      {item.merchandise.product.title}
                    </Link>
                  </div>
                  {item.merchandise.title !== "Default Title" && (
                    <p className="text-sm text-gray-500">
                      {item.merchandise.title}
                    </p>
                  )}
                  <div className="text-sm mt-1">
                    <Price
                      amount={item.cost.totalAmount.amount}
                      currencyCode={item.cost.totalAmount.currencyCode}
                      className="md:hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-center mt-4 md:mt-0">
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

              {/* Total */}
              <div className="flex justify-between items-center mt-4 md:mt-0">
                <Price
                  className="md:hidden"
                  amount={item.cost.totalAmount.amount}
                  currencyCode={item.cost.totalAmount.currencyCode}
                />
                <div className="ml-auto">
                  <Price
                    className="hidden md:block font-medium"
                    amount={item.cost.totalAmount.amount}
                    currencyCode={item.cost.totalAmount.currencyCode}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Footer */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-start md:justify-end">
          <div className="w-full md:w-72">
            <div className="flex justify-between items-center mb-4">
              <span className="font-medium">Subtotal</span>
              <Price
                className="text-lg font-medium"
                amount={cart.cost.subtotalAmount.amount}
                currencyCode={cart.cost.subtotalAmount.currencyCode}
              />
            </div>

            <Link
              href="/checkout"
              className="flex items-center justify-center rounded bg-green-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-600"
            >
              Check out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartLoading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-pulse text-center">
        <div className="h-8 w-32 bg-gray-200 rounded mb-4 mx-auto"></div>
        <div className="h-4 w-48 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <Suspense fallback={<CartLoading />}>
      <CartContent />
    </Suspense>
  );
}
