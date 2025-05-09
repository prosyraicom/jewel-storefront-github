import { StarRating } from "./product-star-rating";

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
  return (
    <div className="max-w-full rounded-lg border border-blue-400 bg-[#ffdceb] p-2 text-black">
      <p className="italic mb-4">{review}</p>
      <div className="flex items-center text-sm text-gray-600 mb-1">
        <span className="font-light italic">{name}</span>
      </div>
      <div className="mt-1">
        <StarRating rating={stars} showRating />
      </div>
    </div>
  );
}
