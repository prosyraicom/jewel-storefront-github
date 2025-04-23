"use client";

import OpenCart from "components/cart/open-cart";
import LogoSquare from "components/logo-square";
import { Sheet, SheetContent, SheetTrigger } from "components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

interface MenuLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const MenuLink = ({ href, children, className = "" }: MenuLinkProps) => (
  <Link
    href={href}
    className={`block py-3 text-lg hover:text-blue-600 transition-colors ${className}`}
  >
    {children}
  </Link>
);

export default function NavbarMenu({
  menu = [],
}: {
  menu?: { title: string; path: string }[];
}) {
  return (
    <div className="flex items-center justify-between px-[15px] md:px-[50px] py-4 w-full max-w-[1400px] mx-auto">
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
                  <MenuLink href="#">Become a Member</MenuLink>
                  <MenuLink href="#">VIP Login</MenuLink>
                  <MenuLink href="#">General FAQ</MenuLink>
                  <MenuLink href="#">Shipping FAQ</MenuLink>
                  <MenuLink href="#">Returns and Exchanges</MenuLink>
                  <MenuLink href="#">Accssibility</MenuLink>
                  <MenuLink href="#">Privacy Policy</MenuLink>
                  <MenuLink href="#">Terms of Service</MenuLink>
                  <MenuLink href="#">Track My Order</MenuLink>
                </>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Middle - Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/" className="flex items-center">
          <LogoSquare />
          <span className="ml-2 text-xl font-bold uppercase">JEWEL</span>
        </Link>
      </div>

      {/* Right - Shopping Cart */}
      <div>
        <OpenCart />
      </div>
    </div>
  );
}
