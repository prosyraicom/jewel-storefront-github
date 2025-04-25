"use client";

import OpenCart from "components/cart/open-cart";
import { Sheet, SheetContent, SheetTrigger } from "components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MenuLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const MenuLink = ({ href, children, className = "" }: MenuLinkProps) => {
  const isExternal = href.startsWith("http");
  return (
    <Link
      href={href}
      className={`block px-5 py-[4.5px] text-lg text-[19px] font-light hover:bg-gray-100 ${className}`}
      style={{ letterSpacing: "1.4px" }}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
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
  return (
    <div className="flex items-center justify-between px-[15px] py-[10px] md:px-[50px] py-4 w-full max-w-[1400px] mx-auto">
      {/* Left side - Burger Menu */}
      <Sheet>
        <SheetTrigger className="p-2 -ml-2 transition-colors hover:text-blue-600">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] py-8">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <div className="space-y-1">
              {menu.length > 0 ? (
                menu.map((item) => (
                  <MenuLink key={item.path} href={item.path}>
                    {item.title}
                  </MenuLink>
                ))
              ) : (
                <>
                  <MenuLink href="https://jewelshoppingco.com/products/homepage-membership">
                    Become a Member
                  </MenuLink>
                  <MenuLink href="https://jewelcovip.com/login">
                    VIP Login
                  </MenuLink>
                  <MenuLink href="https://jewelshoppingco.com/pages/general-faq">
                    General FAQ
                  </MenuLink>
                  <MenuLink href="https://jewelshoppingco.com/pages/shipping-faq">
                    Shipping FAQ
                  </MenuLink>
                  <MenuLink href="https://jewelshoppingco.com/pages/returns-exchanges">
                    Returns & Exchanges
                  </MenuLink>
                  <MenuLink href="https://jewelshoppingco.com/pages/accessibility">
                    Accessibility
                  </MenuLink>
                  <MenuLink href="https://jewelshoppingco.com/pages/privacy-policy">
                    Privacy Policy
                  </MenuLink>
                  <MenuLink href="https://jewelshoppingco.com/pages/terms-of-service">
                    Terms of Service
                  </MenuLink>
                  <MenuLink href="https://jewelshoppingco.com/tools/tracking">
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
