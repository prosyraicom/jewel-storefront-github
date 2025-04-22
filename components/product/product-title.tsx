"use client";

interface ProductTitleProps {
  title: string;
}

export function ProductTitle({ title }: ProductTitleProps) {
  return <h1 className="text-3xl font-bold mb-2 text-black">{title}</h1>;
}
