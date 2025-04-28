import TestimonialsCarousel from "@/components/home/carousel-testimonial";
import CustomerService from "@/components/home/customer-service";
import VipMembership from "@/components/home/membership";
import CustomerTestimonial from "@/components/home/testimonials";
import Footer from "@/components/layout/footer";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1400px] px-[15px] md:px-[50px] bg-white text-black">
      {/* This will automatically handle responsive behavior */}
      <div className="py-[36px]  mx-auto">
        <Suspense>
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
