// components/CustomerTestimonial.tsx
import Image from "next/image";

type TestimonialProps = {
  // If isMobile is not passed, component will be responsive based on screen size
  isMobile?: boolean;
};

export default function CustomerTestimonial({ isMobile }: TestimonialProps) {
  return (
    <div className="w-full">
      {/* Desktop Layout (2-column) when not mobile */}
      <div className={`${isMobile ? "hidden" : "hidden md:flex"} items-start`}>
        <div className="w-1/2 pr-4">
          <Image
            src="/shopping.webp"
            alt="VIP Shopping"
            width={600}
            height={400}
            className="w-full rounded-lg"
            priority
          />
        </div>
        <div className="w-1/2 pl-4">
          <div className="text-gray-500 text-sm uppercase tracking-wide">
            WHAT OUR CUSTOMERS ARE SAYING...
          </div>

          <h2 className="mt-2 text-3xl font-bold">
            "Amazing Customer Service!!"
          </h2>

          <p className="mt-4 text-gray-700 text-lg">
            "Right after I placed my order, a customer support rep messaged me.
            She answered all my questions in just a few minutes. I love how nice
            and helpful she was and how she replied to me so fast. I already
            love this company. You've earned my loyalty!!"
          </p>
          <p className="mt-4 text-gray-600">- Jess P. (Pittsburgh, PA)</p>
        </div>
      </div>

      {/* Mobile Layout (stacked) */}
      <div className={`${isMobile ? "block" : "md:hidden"}`}>
        <Image
          src="/shopping.webp"
          alt="VIP Shopping"
          width={600}
          height={400}
          className="w-full rounded-lg"
          priority
        />

        <div className="mt-4">
          <div className="text-gray-500 text-sm uppercase tracking-wide">
            WHAT OUR CUSTOMERS ARE SAYING...
          </div>

          <h2 className="mt-2 text-2xl font-bold">
            "Amazing Customer Service!!"
          </h2>

          <p className="mt-3 text-gray-700">
            "Right after I placed my order, a customer support rep messaged me.
            She answered all my questions in just a few minutes. I love how nice
            and helpful she was and how she replied to me so fast. I already
            love this company. You've earned my loyalty!!"
          </p>
          <p className="mt-3 text-gray-600">- Jess P. (Pittsburgh, PA)</p>
        </div>
      </div>
    </div>
  );
}
