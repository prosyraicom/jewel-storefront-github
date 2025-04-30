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
  setIsOpen?: (isOpen: boolean) => void;
}

const MenuLink = ({
  href,
  children,
  className = "",
  menuType = "default",
  setIsOpen,
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
    if (setIsOpen) {
      setIsOpen(false);
    }
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
  const [open, setOpen] = useState(false);

  const handleMenuClick = () => {
    posthog.capture("menu_opened", {
      ...postHogBaseInfo,
      menu_state: open ? "closed" : "opened",
    });
  };

  return (
    <div className="flex items-center justify-between px-[15px] py-[10px] md:px-[50px] py-4 w-full max-w-[1400px] mx-auto">
      {/* Left side - Burger Menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          className="p-2 -ml-2 transition-colors hover:text-blue-600"
          onClick={handleMenuClick}
        >
          <Bars3Icon className="h-6" />
          <span className="sr-only">Menu</span>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[350px] py-8">
          <div className="flex flex-col space-y-2">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <div className="space-y-1">
              {menu.length > 0 ? (
                menu.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="block px-5 py-[4.5px] text-lg text-[19px] font-light hover:bg-gray-100"
                    style={{ letterSpacing: "1.4px" }}
                    onClick={() => {
                      posthog.capture("menu_link_clicked", {
                        ...postHogBaseInfo,
                        link_text: item.title,
                        link_url: item.path,
                        is_external: false,
                        menu_type: "navigation",
                        menu_section: "main_menu",
                      });
                      setOpen(false);
                    }}
                  >
                    {item.title}
                  </Link>
                ))
              ) : (
                <>
                  <Link
                    href="https://jewelshoppingco.com/products/homepage-membership"
                    className="block px-5 py-[4.5px] text-lg text-[19px] font-light hover:bg-gray-100"
                    style={{ letterSpacing: "1.4px" }}
                    onClick={() => {
                      posthog.capture("menu_link_clicked", {
                        ...postHogBaseInfo,
                        link_text: "Become a Member",
                        link_url:
                          "https://jewelshoppingco.com/products/homepage-membership",
                        is_external: true,
                        menu_type: "membership",
                        menu_section: "main_menu",
                      });
                      setOpen(false);
                    }}
                  >
                    Become a Member
                  </Link>
                  <Link
                    href="https://jewelcovip.com/login"
                    className="block px-5 py-[4.5px] text-lg text-[19px] font-light hover:bg-gray-100"
                    style={{ letterSpacing: "1.4px" }}
                    onClick={() => {
                      posthog.capture("menu_link_clicked", {
                        ...postHogBaseInfo,
                        link_text: "VIP Login",
                        link_url: "https://jewelcovip.com/login",
                        is_external: true,
                        menu_type: "vip",
                        menu_section: "main_menu",
                      });
                      setOpen(false);
                    }}
                  >
                    VIP Login
                  </Link>
                  <Link
                    href="/general-faqs"
                    className="block px-5 py-[4.5px] text-lg text-[19px] font-light hover:bg-gray-100"
                    style={{ letterSpacing: "1.4px" }}
                    onClick={() => {
                      posthog.capture("menu_link_clicked", {
                        ...postHogBaseInfo,
                        link_text: "General FAQs",
                        link_url: "/general-faqs",
                        is_external: false,
                        menu_type: "faqs",
                        menu_section: "main_menu",
                      });
                      setOpen(false);
                    }}
                  >
                    General FAQs
                  </Link>
                  <Link
                    href="/shipping-faqs"
                    className="block px-5 py-[4.5px] text-lg text-[19px] font-light hover:bg-gray-100"
                    style={{ letterSpacing: "1.4px" }}
                    onClick={() => {
                      posthog.capture("menu_link_clicked", {
                        ...postHogBaseInfo,
                        link_text: "Shipping FAQs",
                        link_url: "/shipping-faqs",
                        is_external: false,
                        menu_type: "shipping faqs",
                        menu_section: "main_menu",
                      });
                      setOpen(false);
                    }}
                  >
                    Shipping FAQs
                  </Link>
                  <Link
                    href="/returns-and-exchanges"
                    className="block px-5 py-[4.5px] text-lg text-[19px] font-light hover:bg-gray-100"
                    style={{ letterSpacing: "1.4px" }}
                    onClick={() => {
                      posthog.capture("menu_link_clicked", {
                        ...postHogBaseInfo,
                        link_text: "Returns & Exchanges",
                        link_url: "/returns-and-exchanges",
                        is_external: false,
                        menu_type: "returns",
                        menu_section: "main_menu",
                      });
                      setOpen(false);
                    }}
                  >
                    Returns & Exchanges
                  </Link>
                  <Link
                    href="/accessibility"
                    className="block px-5 py-[4.5px] text-lg text-[19px] font-light hover:bg-gray-100"
                    style={{ letterSpacing: "1.4px" }}
                    onClick={() => {
                      posthog.capture("menu_link_clicked", {
                        ...postHogBaseInfo,
                        link_text: "Accessibility",
                        link_url: "/accessibility",
                        is_external: false,
                        menu_type: "accessibility",
                        menu_section: "main_menu",
                      });
                      setOpen(false);
                    }}
                  >
                    Accessibility
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="block px-5 py-[4.5px] text-lg text-[19px] font-light hover:bg-gray-100"
                    style={{ letterSpacing: "1.4px" }}
                    onClick={() => {
                      posthog.capture("menu_link_clicked", {
                        ...postHogBaseInfo,
                        link_text: "Privacy Policy",
                        link_url: "/privacy-policy",
                        is_external: false,
                        menu_type: "legal",
                        menu_section: "main_menu",
                      });
                      setOpen(false);
                    }}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-of-service"
                    className="block px-5 py-[4.5px] text-lg text-[19px] font-light hover:bg-gray-100"
                    style={{ letterSpacing: "1.4px" }}
                    onClick={() => {
                      posthog.capture("menu_link_clicked", {
                        ...postHogBaseInfo,
                        link_text: "Terms of Service",
                        link_url: "/terms-of-service",
                        is_external: false,
                        menu_type: "legal",
                        menu_section: "main_menu",
                      });
                      setOpen(false);
                    }}
                  >
                    Terms of Service
                  </Link>
                  <Link
                    href="/track"
                    className="block px-5 py-[4.5px] text-lg text-[19px] font-light hover:bg-gray-100"
                    style={{ letterSpacing: "1.4px" }}
                    onClick={() => {
                      posthog.capture("menu_link_clicked", {
                        ...postHogBaseInfo,
                        link_text: "Track My Order",
                        link_url: "/track",
                        is_external: false,
                        menu_type: "tracking",
                        menu_section: "main_menu",
                      });
                      setOpen(false);
                    }}
                  >
                    Track My Order
                  </Link>
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
