"use client";

import { useCart } from "components/cart/cart-context";
import { usePostHog } from "components/posthog-context";
import Price from "components/price";
import Link from "next/link";
import posthog from "posthog-js";

export default function CheckoutButton() {
  const { cart } = useCart();
  const { postHogBaseInfo } = usePostHog();

  if (!cart || !cart.lines.length) {
    return null;
  }

  const handleCheckoutClick = () => {
    posthog.capture("checkout_initiated", {
      ...postHogBaseInfo,
      cart_items_count: cart.totalQuantity,
      cart_total: cart.cost.totalAmount.amount,
      cart_currency: cart.cost.totalAmount.currencyCode,
      cart_items: cart.lines.map((item) => ({
        product_id: item.merchandise.product.id,
        product_title: item.merchandise.product.title,
        variant_id: item.merchandise.id,
        quantity: item.quantity,
        price: item.cost.totalAmount.amount,
        currency: item.cost.totalAmount.currencyCode,
      })),
    });
  };

  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="flex justify-start md:justify-end">
        <div className="w-full md:w-[350px]">
          <div className="flex text-[21px] justify-between items-center mb-2">
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
            onClick={handleCheckoutClick}
          >
            Check out
          </Link>
        </div>
      </div>
    </div>
  );
}
