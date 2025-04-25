import TestimonialsCarousel from "@/components/home/carousel-testimonial";
import CustomerService from "@/components/home/customer-service";
import VipMembership from "@/components/home/membership";
import CustomerTestimonial from "@/components/home/testimonials";
import Footer from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1400px] px-[15px] md:px-[50px] bg-white text-black">
      {/* This will automatically handle responsive behavior */}
      <div className="py-[36px]  mx-auto">
        <CustomerTestimonial />
        <CustomerService />
        <VipMembership />
        <TestimonialsCarousel />
        <Footer />
      </div>
    </div>
  );
}
