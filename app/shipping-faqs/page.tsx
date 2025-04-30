import Footer from "@/components/layout/footer";
import { FAQItem } from "components/faq/faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping FAQs",
  description: "Shipping and delivery information for our jewelry store",
};

const shippingFaqs = [
  {
    question: "1. What are your shipping and processing times?",
    answer: [
      "Most packages take between 1 to 2 weeks to arrive.",
      "We work hard to provide our customers with the most transparent, convenient, and pleasant experience possible. We do our best to ensure that we ship orders as quickly as possible.",
      "Please note that orders are not processed or shipped out on weekends and will instead be processed on the following Monday.",
      "Note: orders are only shipped after they are processed. After being placed, orders take 1-3 business days to process. After the order is processed, the product is shipped out, and a tracking number is sent.",
    ],
  },
  {
    question:
      "2. Where can I find my tracking number? What if my tracking number isn't working?",
    answer: [
      "When your items are shipped out, you should receive an automatic notification from our system via email providing you with a tracking number.",
      "If you haven't received a tracking number or if it does not work, please contact us at hello@jewelsupport.com. We are always happy to help!",
    ],
  },
];

const shippingNotice = {
  title: "[EXPEDITED SHIPPING UPDATE]",
  content: "All US orders have been expedited with 2 to 4 days USPS shipping.",
};

const shippingDelayNotice = {
  title: "A Note on Unexpected Delays",
  content: [
    "In some instances, delivery may take longer than the standard shipping times mentioned above. External factors not under our control, such as holidays, may cause shipping delays.",
    "Please contact us if your package is taking too long to arrive and we will work with you to resolve the situation. You can reach us at hello@jewelsupport.com.",
    "We are happy to help! 🤍",
  ],
};

export default function ShippingFAQs() {
  return (
    <>
      <div className="mx-auto max-w-3xl py-8 px-[15px] md:px-[50px] bg-white text-black">
        <h1 className="text-5xl font-semibold mb-8 text-center">
          Shipping FAQs
        </h1>

        {/* Shipping Notice */}
        <div className="mb-8 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">{shippingNotice.title}</h2>
          <p className="text-gray-700">{shippingNotice.content}</p>
        </div>

        <div className="space-y-8">
          {shippingFaqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}

          {/* Shipping Delay Notice */}
          <div className="mt-8 rounded-l">
            <h2 className="text-xl font-semibold mb-2">
              {shippingDelayNotice.title}
            </h2>
            {shippingDelayNotice.content.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mt-2 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
