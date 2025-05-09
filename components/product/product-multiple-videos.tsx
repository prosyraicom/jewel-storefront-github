"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ProductMultipleVideosProps {
  title: string;
  videos: string[]; // List of video URLs
}

export function ProductMultipleVideos({
  title,
  videos,
}: ProductMultipleVideosProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        {/* Desktop View - Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {videos.map((videoUrl, idx) => (
            <div key={idx} className="flex justify-center">
              <video
                src={videoUrl}
                className="rounded-xl w-full aspect-[9/16] object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
              />
            </div>
          ))}
        </div>
        {/* Mobile View - Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div className="relative">
              <video
                src={videos[currentIndex]}
                className="rounded-xl w-full aspect-[9/16] object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
              />
            </div>
          </div>
          {/* Navigation arrows */}
          <div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 left-0 right-0">
            <button
              onClick={goToPrev}
              className="text-gray-400 hover:text-gray-700 focus:outline-none ml-1"
              aria-label="Previous video"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="text-gray-400 hover:text-gray-700 focus:outline-none mr-1"
              aria-label="Next video"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          {/* Dots indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-gray-800" : "bg-gray-300"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
