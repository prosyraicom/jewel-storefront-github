import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <Link
      href="/cart"
      className="relative flex h-7 w-7 items-center justify-center text-black transition-colors dark:border-neutral-700 dark:text-white"
    >
      <ShoppingBagIcon
        className={clsx(
          "h-6 transition-all ease-in-out hover:scale-110",
          className
        )}
      />

      {quantity ? (
        <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-sm bg-blue-600 text-[11px] font-medium text-white flex items-center justify-center">
          {quantity}
        </div>
      ) : null}
    </Link>
  );
}
