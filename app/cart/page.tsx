"use client";

import { useCart } from "components/cart/cart-context";
import { DeleteItemButton } from "components/cart/delete-item-button";
import { EditItemQuantityButton } from "components/cart/edit-item-quantity-button";
import Price from "components/price";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cart, updateCartItem } = useCart();

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
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <ul className="divide-y divide-gray-200">
        {cart.lines.map((item, i) => (
          <li key={i} className="flex py-6">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
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

            <div className="ml-4 flex flex-1 flex-col">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-medium">
                    <Link
                      href={`/product/${item.merchandise.product.handle}`}
                      className="hover:underline"
                    >
                      {item.merchandise.product.title}
                    </Link>
                  </h3>
                  {item.merchandise.title !== "Default Title" && (
                    <p className="mt-1 text-sm text-gray-500">
                      {item.merchandise.title}
                    </p>
                  )}
                </div>
                <Price
                  className="text-sm font-medium"
                  amount={item.cost.totalAmount.amount}
                  currencyCode={item.cost.totalAmount.currencyCode}
                />
              </div>

              <div className="flex flex-1 items-end justify-between">
                <div className="flex items-center border rounded-full">
                  <EditItemQuantityButton
                    item={item}
                    type="minus"
                    optimisticUpdate={updateCartItem}
                  />
                  <p className="mx-2 text-sm">{item.quantity}</p>
                  <EditItemQuantityButton
                    item={item}
                    type="plus"
                    optimisticUpdate={updateCartItem}
                  />
                </div>
                <DeleteItemButton
                  item={item}
                  optimisticUpdate={updateCartItem}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-gray-200 pt-8">
        <div className="flex justify-between text-base font-medium">
          <p>Subtotal</p>
          <Price
            className="text-lg font-semibold"
            amount={cart.cost.subtotalAmount.amount}
            currencyCode={cart.cost.subtotalAmount.currencyCode}
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Shipping and taxes calculated at checkout
        </p>

        <div className="mt-6">
          <Link
            href="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-[#23ae3b] px-6 py-3 text-base font-bold text-white shadow-sm hover:opacity-90"
          >
            Checkout
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
