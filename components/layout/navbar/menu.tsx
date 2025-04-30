"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import OpenCart from "components/cart/open-cart";
import { usePostHog } from "components/posthog-context";
import { Sheet, SheetContent, SheetTrigger } from "components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import posthog from "posthog-js";
import React, { useState } from "react";

interface MenuLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  menuType?: string;
}

const MenuLink = ({
  href,
  children,
  className = "",
  menuType = "default",
}: MenuLinkProps) => {
  const isExternal = href.startsWith("http");
  const { postHogBaseInfo } = usePostHog();

  const handleClick = () => {
    posthog.capture("menu_link_clicked", {
      ...postHogBaseInfo,
      link_text: children,
      link_url: href,
      is_external: isExternal,
      menu_type: menuType,
      menu_section: "main_menu",
    });
  };

  return (
    <Link
      href={href}
      className={`block px-5 py-[4.5px] text-lg text-[19px] font-light hover:bg-gray-100 ${className}`}
      style={{ letterSpacing: "1.4px" }}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default function NavbarMenu({
  menu = [],
}: {
  menu?: { title: string; path: string }[];
}) {
  const { postHogBaseInfo } = usePostHog();
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    posthog.capture("menu_opened", {
      ...postHogBaseInfo,
      menu_state: isOpen ? "closed" : "opened",
    });
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center justify-between px-[15px] py-[10px] md:px-[50px] py-4 w-full max-w-[1400px] mx-auto">
      {/* Left side - Burger Menu */}
      <Sheet>
        <SheetTrigger
          className="p-2 -ml-2 transition-colors hover:text-blue-600"
          onClick={handleMenuClick}
        >
          <button className="relative flex h-7 w-7 items-center justify-center text-black transition-colors dark:border-neutral-700 dark:text-white">
            <Bars3Icon className="h-6" />
          </button>
          <span className="sr-only">Menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] py-8">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <div className="space-y-1">
              {menu.length > 0 ? (
                menu.map((item) => (
                  <MenuLink
                    key={item.path}
                    href={item.path}
                    menuType="navigation"
                  >
                    {item.title}
                  </MenuLink>
                ))
              ) : (
                <>
                  <MenuLink
                    href="https://jewelshoppingco.com/products/homepage-membership"
                    menuType="membership"
                  >
                    Become a Member
                  </MenuLink>
                  <MenuLink href="https://jewelcovip.com/login" menuType="vip">
                    VIP Login
                  </MenuLink>
                  <MenuLink
                    href="https://jewelshoppingco.com/pages/general-faq"
                    menuType="faq"
                  >
                    General FAQ
                  </MenuLink>
                  <MenuLink
                    href="https://jewelshoppingco.com/pages/shipping-faq"
                    menuType="shipping"
                  >
                    Shipping FAQ
                  </MenuLink>
                  <MenuLink
                    href="https://jewelshoppingco.com/pages/returns-exchanges"
                    menuType="returns"
                  >
                    Returns & Exchanges
                  </MenuLink>
                  <MenuLink
                    href="https://jewelshoppingco.com/pages/accessibility"
                    menuType="accessibility"
                  >
                    Accessibility
                  </MenuLink>
                  <MenuLink
                    href="https://jewelshoppingco.com/pages/privacy-policy"
                    menuType="legal"
                  >
                    Privacy Policy
                  </MenuLink>
                  <MenuLink
                    href="https://jewelshoppingco.com/pages/terms-of-service"
                    menuType="legal"
                  >
                    Terms of Service
                  </MenuLink>
                  <MenuLink
                    href="https://jewelshoppingco.com/tools/tracking"
                    menuType="tracking"
                  >
                    Track My Order
                  </MenuLink>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Middle - Logo */}
      <div className="flex justify-center flex-1 max-w-full">
        <Link
          href="/"
          className="relative w-full max-w-[130px] md:max-w-[200px] h-[34px] md:h-[52px]"
          onClick={() => {
            posthog.capture("logo_clicked", {
              ...postHogBaseInfo,
              menu_section: "main_menu",
            });
          }}
        >
          <Image
            src="/main-jewel-logo-black.svg"
            alt="Jewel Logo"
            fill
            sizes="(max-width: 768px) 130px, 200px"
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Right - Shopping Cart */}
      <div>
        <OpenCart />
      </div>
    </div>
  );
}
