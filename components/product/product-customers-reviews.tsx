"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ProductCustomerReview } from "./product-customer-review";

interface ProductCustomerReviewProps {
  review: string;
  name: string;
  stars: number;
  imageUrl: string;
  title: string;
}

interface ProductCustomersReviewsProps {
  header: string;
  reviews: ProductCustomerReviewProps[];
}

export function ProductCustomersReviews({
  header,
  reviews,
}: ProductCustomersReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">{header}</h2>
        {/* Desktop View - Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {reviews.map((review, idx) => {
            if (!review) return null;
            const {
              review: reviewText = "",
              name = "",
              stars = 0,
              imageUrl = "",
              title = "",
            } = review;
            return (
              <ProductCustomerReview
                key={idx}
                review={reviewText}
                name={name}
                stars={stars}
                imageUrl={imageUrl}
                title={title}
              />
            );
          })}
        </div>
        {/* Mobile View - Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div className="relative">
              {reviews[currentIndex]
                ? (() => {
                    const {
                      review: reviewText = "",
                      name = "",
                      stars = 0,
                      imageUrl = "",
                      title = "",
                    } = reviews[currentIndex];
                    return (
                      <ProductCustomerReview
                        review={reviewText}
                        name={name}
                        stars={stars}
                        imageUrl={imageUrl}
                        title={title}
                      />
                    );
                  })()
                : null}
            </div>
          </div>
          {/* Navigation arrows */}
          <div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 left-0 right-0">
            <button
              onClick={goToPrev}
              className="text-gray-400 hover:text-gray-700 focus:outline-none ml-1"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="text-gray-400 hover:text-gray-700 focus:outline-none mr-1"
              aria-label="Next review"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          {/* Dots indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-gray-800" : "bg-gray-300"
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
