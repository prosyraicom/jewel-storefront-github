"use client";

import { usePreserveParams } from "lib/hooks/use-preserve-params";
import Link from "next/link";
import { ComponentProps } from "react";

type PreservedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  preserveParams?: boolean; // Allow opting out if needed
};

export function PreservedLink({
  href,
  preserveParams = true,
  ...props
}: PreservedLinkProps) {
  const { appendPreservedParams } = usePreserveParams();

  const finalHref = preserveParams ? appendPreservedParams(href) : href;

  return <Link href={finalHref} {...props} />;
}
