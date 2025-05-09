import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

interface StarRatingProps {
  rating: number; // e.g., 4.5
  size?: "sm" | "md" | "lg";
  showRating?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  size = "md",
  showRating = false,
  className = "",
}: StarRatingProps) {
  // Calculate full, half, and empty stars
  const fullStars = Math.floor(rating) || 5;
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <StarSolid
            key={"full-" + i}
            className={`${sizeClasses[size]} text-yellow-400`}
          />
        ))}
        {hasHalfStar && (
          <span className={`relative inline-block ${sizeClasses[size]}`}>
            <StarSolid
              className={`absolute ${sizeClasses[size]} text-yellow-400`}
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
            <StarOutline
              className={`absolute ${sizeClasses[size]} text-yellow-400`}
            />
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOutline
            key={"empty-" + i}
            className={`${sizeClasses[size]} text-yellow-400`}
          />
        ))}
      </div>
      {showRating && (
        <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
