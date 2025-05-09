"use client";

import { StarRating } from "./product-star-rating";

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
}

export function ProductRating({ rating, reviewCount }: ProductRatingProps) {
  return (
    <div className="flex items-center">
      <StarRating rating={rating} size="lg" />
      <span className="ml-2 text-base text-black">
        {rating} stars ({reviewCount} reviews)
      </span>
    </div>
  );
}
