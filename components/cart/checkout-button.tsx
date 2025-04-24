"use client";

import { useCart } from "components/cart/cart-context";
import Price from "components/price";
import Link from "next/link";

export default function CheckoutButton() {
  const { cart } = useCart();

  if (!cart || !cart.lines.length) {
    return null;
  }

  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="flex justify-start md:justify-end">
        <div className="w-full md:w-[350px]">
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
            className="flex items-center justify-center rounded bg-[#23ae3b] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-600"
          >
            Check out
          </Link>
        </div>
      </div>
    </div>
  );
}
