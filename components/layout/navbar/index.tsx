import CartModal from "components/cart/modal";
import LogoSquare from "components/logo-square";
import { getMenu } from "lib/shopify";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Timer from "./timer";

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <>
      {/* Black sticky header with timer */}
      <div className="sticky top-0 z-50 bg-black text-white py-2 px-4 flex justify-center items-center">
        <div className="text-center">
          <span className="font-semibold">⏰ FLASH SALE: </span>
          <span className="font-medium">UP TO </span>
          <span className="font-bold">90% OFF</span>
          <span className="font-medium"> ENDS IN </span>
          <Timer initialHours={0} initialMinutes={13} initialSeconds={53} />
        </div>
      </div>

      {/* White header - static text part */}
      <div className="bg-white py-4 border-b text-center">
        <p className="text-base">
          <span className="font-medium">
            90 day money-back guarantee on all orders.
          </span>{" "}
          ✨{" "}
          <span className="italic">
            Love what you buy or get your money back.
          </span>{" "}
          ❤️
        </p>
      </div>

      {/* White header - menu, logo, cart part */}
      <nav className="relative flex items-center justify-between p-4 lg:px-6 bg-white border-b">
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              prefetch={true}
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <LogoSquare />
              <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
                {SITE_NAME}
              </div>
            </Link>
            {menu.length ? (
              <ul className="hidden gap-6 text-sm md:flex md:items-center">
                {menu.map((item: Menu) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      prefetch={true}
                      className="text-neutral-700 underline-offset-4 hover:text-black hover:underline"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            {/* Image placeholder instead of search */}
            <div className="w-8 h-8 flex items-center justify-center">
              <span className="material-symbols-outlined">image</span>
            </div>
          </div>
          <div className="flex justify-end md:w-1/3">
            <CartModal />
          </div>
        </div>
      </nav>
    </>
  );
}
