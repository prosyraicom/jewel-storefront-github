import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

interface ProductInfoReviewProps {
  review: string;
  name: string;
  stars: number; // e.g., 4.5
}

export function ProductInfoReview({
  review,
  name,
  stars,
}: ProductInfoReviewProps) {
  // Calculate full, half, and empty stars
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="max-w-full rounded-lg border border-blue-400 bg-[#ffdceb] p-2 text-black">
      <p className="italic mb-4">{review}</p>
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <span className="font-light italic">{name}</span>
      </div>
      <div className="flex items-center mt-1">
        {[...Array(fullStars)].map((_, i) => (
          <StarSolid key={"full-" + i} className="h-5 w-5 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <span className="relative inline-block h-5 w-5">
            <StarSolid
              className="absolute h-5 w-5 text-yellow-400"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
            <StarOutline className="absolute h-5 w-5 text-yellow-400" />
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOutline key={"empty-" + i} className="h-5 w-5 text-yellow-400" />
        ))}
      </div>
    </div>
  );
}
