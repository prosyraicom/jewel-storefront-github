"use client";

import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

interface ProductRatingProps {
  rating?: number;
  reviewCount?: number;
}

export function ProductRating({
  rating = 4.5,
  reviewCount = 42,
}: ProductRatingProps) {
  // Convert rating to integer stars and partial star
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div className="flex items-center mb-4">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <StarIcon key={i} className="h-6 w-6" />;
          } else if (i === fullStars && hasHalfStar) {
            return <StarIcon key={i} className="h-6 w-6" />;
          } else {
            return <StarOutlineIcon key={i} className="h-6 w-6" />;
          }
        })}
      </div>
      <span className="ml-2 text-base text-black">
        {rating} stars ({reviewCount} reviews)
      </span>
    </div>
  );
}
