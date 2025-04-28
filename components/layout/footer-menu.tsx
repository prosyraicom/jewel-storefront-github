"use client";

import clsx from "clsx";
import { usePostHog } from "components/posthog-context";
import { Menu } from "lib/shopify/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import posthog from "posthog-js";
import { useEffect, useState } from "react";

export function FooterMenuItem({ item }: { item: Menu }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === item.path);
  const { postHogBaseInfo } = usePostHog();

  useEffect(() => {
    setActive(pathname === item.path);
  }, [pathname, item.path]);

  const handleClick = () => {
    posthog.capture("footer_link_clicked", {
      ...postHogBaseInfo,
      link_text: item.title,
      link_url: item.path,
      is_active: active,
      menu_section: "footer_menu",
      menu_type: getMenuType(item.path),
    });
  };

  // Helper function to determine menu type based on URL
  const getMenuType = (path: string): string => {
    if (path.includes("/products/")) return "product";
    if (path.includes("/collections/")) return "collection";
    if (path.includes("/pages/")) return "page";
    if (path.includes("/search")) return "search";
    if (path.includes("/cart")) return "cart";
    if (path.includes("/account")) return "account";
    return "other";
  };

  return (
    <li>
      <Link
        href={item.path}
        className={clsx(
          "block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm dark:hover:text-neutral-300",
          {
            "text-black dark:text-neutral-300": active,
          }
        )}
        onClick={handleClick}
      >
        {item.title}
      </Link>
    </li>
  );
}

export default function FooterMenu({ menu }: { menu: Menu[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul>
        {menu.map((item: Menu) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
