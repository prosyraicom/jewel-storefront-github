"use client";

import Prose from "components/prose";

interface ProductContentProps {
  descriptionHtml: string | null;
}

export function ProductContent({ descriptionHtml }: ProductContentProps) {
  if (!descriptionHtml) return null;

  return (
    <div className="mt-8 product-description">
      <div className="text-black">
        <Prose className="text-lg leading-relaxed" html={descriptionHtml} />
      </div>
    </div>
  );
}
