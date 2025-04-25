"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

// Define the testimonial type
type Testimonial = {
  id: string;
  title: string;
  text: string;
  author: string;
  product: string;
};

// Default testimonials that match the images
const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    title: "Sooo beautiful and the best price!",
    text: "I'm a big jewelry wearer and so I have tried many other company's products. I can say without a doubt that the jewlery from this site is the best I have. Quality is very good and they always have the best prices. I have yet to see anything less expensive.",
    author: "Alishia N.",
    product: "100 Languages Necklace",
  },
  {
    id: "2",
    title: "I get compliments ALL the time!",
    text: "This necklace has given me life. You can wear this high on your neck or low. I have had it for a while now and it has been the only necklace I've been able to wear in the shower without it changing color. And I just can't believe how many compliments I'm getting at work!!",
    author: "Maya G.",
    product: "Stethoscope Heart Necklace",
  },
  {
    id: "3",
    title: "Love, love, love.",
    text: "I got these for my boyfriend and I for our anniversary and would definitely recommend, are so so cute and we love them so much!! tightening at first is confusing but once you have the hang of it it's super easy, def recommend :)",
    author: "Leah H.",
    product: "Magnetic Couple Bracelets",
  },
];

// Component props
type TestimonialsCarouselProps = {
  testimonials?: Testimonial[];
};

export default function TestimonialsCarousel({
  testimonials = defaultTestimonials,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile screen
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    checkIfMobile();

    // Add event listener
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Jewel Testimonials
        </h2>

        {/* Desktop View - Grid Layout */}
        <div className="hidden md:grid md:grid-cols-3 md:gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold">{testimonial.title}</h3>
              <p className="mt-3 text-gray-700">"{testimonial.text}"</p>
              <p className="mt-4 text-gray-600">
                - {testimonial.author} ({testimonial.product})
              </p>
            </div>
          ))}
        </div>

        {/* Mobile View - Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden">
            <div className="relative bg-white p-6 rounded-lg">
              <h3 className="text-xl font-bold">
                {testimonials[currentIndex]?.title}
              </h3>
              <p className="mt-3 text-gray-700">
                "{testimonials[currentIndex]?.text}"
              </p>
              <p className="mt-4 text-gray-600">
                - {testimonials[currentIndex]?.author} (
                {testimonials[currentIndex]?.product})
              </p>
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex justify-between absolute top-1/2 transform -translate-y-1/2 left-0 right-0">
            <button
              onClick={goToPrev}
              className="text-gray-400 hover:text-gray-700 focus:outline-none ml-1"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="text-gray-400 hover:text-gray-700 focus:outline-none mr-1"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Dots indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-gray-800" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
