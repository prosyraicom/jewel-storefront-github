import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";

interface ProductCustomerReviewProps {
  review: string;
  name: string;
  stars: number; // e.g., 4.5
  imageUrl: string;
  title: string;
}

export function ProductCustomerReview({
  review,
  name,
  stars,
  imageUrl,
  title,
}: ProductCustomerReviewProps) {
  // Calculate full, half, and empty stars
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="max-w-full rounded-lg border border-gray-300 bg-gray-100 p-2 text-black">
      <div className="relative mb-3 flex justify-center">
        <img
          src={imageUrl}
          alt={name + " review image"}
          className="w-[320px] h-[220px] object-cover rounded-2xl border border-gray-300 shadow-sm"
        />
        <span className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md">
          {/* Double quote icon in red */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="16" cy="16" r="16" fill="#F43F5E" />
            <path
              d="M11.5 21C11.5 18.2386 13.7386 16 16.5 16V14C12.9101 14 10 16.9101 10 20.5C10 21.3284 10.6716 22 11.5 22C12.3284 22 13 21.3284 13 20.5C13 19.6716 12.3284 19 11.5 19V21ZM20.5 21C20.5 18.2386 22.7386 16 25.5 16V14C21.9101 14 19 16.9101 19 20.5C19 21.3284 19.6716 22 20.5 22C21.3284 22 22 21.3284 22 20.5C22 19.6716 21.3284 19 20.5 19V21Z"
              fill="white"
            />
          </svg>
        </span>
      </div>
      <div className="flex items-center mt-1 mb-1">
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
      <div className="font-bold text-lg mb-1">{title}</div>
      <p className="italic mb-2">{review}</p>
      <span className="font-light italic text-sm block text-right mt-2">
        {name}
      </span>
    </div>
  );
}
