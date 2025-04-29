import TestimonialsCarousel from "@/components/home/carousel-testimonial";
import CustomerService from "@/components/home/customer-service";
import VipMembership from "@/components/home/membership";
import CustomerTestimonial from "@/components/home/testimonials";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";

// Loading fallback component
function HomeLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-[200px] bg-gray-200 rounded-lg mb-8" />
      <div className="h-[300px] bg-gray-200 rounded-lg mb-8" />
      <div className="h-[400px] bg-gray-200 rounded-lg mb-8" />
      <div className="h-[200px] bg-gray-200 rounded-lg" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="mx-auto max-w-[1400px] px-[15px] md:px-[50px] bg-white text-black">
      {/* This will automatically handle responsive behavior */}
      <div className="py-[36px]  mx-auto">
        <Suspense fallback={<HomeLoading />}>
          <CustomerTestimonial />
          <CustomerService />
          <VipMembership />
          <TestimonialsCarousel />
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}
