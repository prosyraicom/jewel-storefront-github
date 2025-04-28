"use client";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { usePostHog } from "components/posthog-context";
import Link from "next/link";
import posthog from "posthog-js";
import { useEffect, useState } from "react";
import { useCart } from "./cart-context";

export default function OpenCart({ className }: { className?: string }) {
  const { cart } = useCart();
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const { postHogBaseInfo } = usePostHog();

  useEffect(() => {
    setIsClient(true);
    if (cart?.lines) {
      setTotalQuantity(
        cart.lines.reduce((total, item) => total + item.quantity, 0) || 0
      );
    }
  }, [cart]);

  const handleCartClick = () => {
    posthog.capture("cart_opened", {
      ...postHogBaseInfo,
      cart_items_count: totalQuantity,
      cart_total: cart?.cost?.totalAmount?.amount,
      cart_currency: cart?.cost?.totalAmount?.currencyCode,
    });
  };

  return (
    <Link
      href="/cart"
      className="relative flex h-7 w-7 items-center justify-center text-black transition-colors dark:border-neutral-700 dark:text-white"
      onClick={handleCartClick}
    >
      <ShoppingBagIcon
        className={clsx(
          "h-6 transition-all ease-in-out hover:scale-110",
          className
        )}
      />

      {isClient && totalQuantity > 0 ? (
        <div className="absolute right-0 bottom-0 -mr-2 -mb-2 h-4 w-4 rounded-full bg-[#23ae3b] text-[9px] font-medium text-white flex items-center justify-center">
          {totalQuantity}
        </div>
      ) : null}
    </Link>
  );
}
