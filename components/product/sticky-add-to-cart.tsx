"use client";

import { Product } from "lib/shopify/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useProduct } from "./product-context";
import { ProductRating } from "./product-rating";

interface StickyAddToCartProps {
  product: Product;
  addToCartRef: React.RefObject<HTMLDivElement | null>;
}

export function StickyAddToCart({
  product,
  addToCartRef,
}: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAboveViewport, setIsAboveViewport] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useProduct();

  // Mock compareAtPrice for demonstration purposes (same as ProductInfo)
  const compareAtPrice = {
    amount: (
      parseFloat(product.priceRange.maxVariantPrice.amount) * 1.2
    ).toString(),
    currencyCode: product.priceRange.maxVariantPrice.currencyCode,
  };

  // Get the currently selected variant image
  const selectedVariantImage = product.images[0] || { url: "", altText: "" };

  // Set up intersection observer to detect when the original add to cart button is out of view
  useEffect(() => {
    if (!addToCartRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          // When the original button is not visible, show the sticky one
          setIsVisible(!entries[0].isIntersecting);

          // Check if the button is above the viewport
          if (!entries[0].isIntersecting) {
            const buttonRect = addToCartRef.current?.getBoundingClientRect();
            setIsAboveViewport(buttonRect ? buttonRect.bottom < 0 : false);
          } else {
            setIsAboveViewport(false);
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(addToCartRef.current);
    return () => {
      observer.disconnect();
    };
  }, [addToCartRef]);

  // Control sheet open state based on visibility and position
  useEffect(() => {
    if (isVisible && isAboveViewport) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isVisible, isAboveViewport]);

  // Sticky add to cart view - improved to match the design
  return (
    <div
      className={`fixed bottom-0 left-0 z-50 w-full border-t border-gray-200 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!isOpen}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Product Image */}
          <div className="relative h-12 w-12 overflow-hidden rounded-md">
            <Image
              src={selectedVariantImage.url}
              alt={selectedVariantImage.altText || product.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Title and Rating and Price scaled down */}
          <div className="flex flex-col">
            <h3 className="text-md font-medium line-clamp-2">
              {product.title}
            </h3>
            <div className="flex items-center">
              <div className="flex items-center">
                <ProductRating />
              </div>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-green-600 text-base">
                $
                {parseFloat(product.priceRange.maxVariantPrice.amount).toFixed(
                  2
                )}
              </span>
              {compareAtPrice && (
                <span className="ml-2 text-xs line-through text-gray-500">
                  ${parseFloat(compareAtPrice.amount).toFixed(2)}
                </span>
              )}
              {compareAtPrice && (
                <div className="ml-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded text-[10px] font-bold">
                  {Math.round(
                    (1 -
                      parseFloat(product.priceRange.maxVariantPrice.amount) /
                        parseFloat(compareAtPrice.amount)) *
                      100
                  )}
                  % OFF ENDS 12AM
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Variant Selector */}
          <div className="w-36">
            <select className="w-full py-2 px-3 text-sm border border-gray-300 rounded-md bg-white">
              <option>Rose Gold & Black</option>
            </select>
          </div>

          {/* Add to Cart Button */}
          <button className="py-2 px-4 bg-green-500 text-white text-sm rounded-md hover:bg-green-600 transition whitespace-nowrap">
            ${parseFloat(product.priceRange.maxVariantPrice.amount).toFixed(2)}{" "}
            • Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
