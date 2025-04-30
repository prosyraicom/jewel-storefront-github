import Footer from "@/components/layout/footer";
import { FAQItem } from "components/faq/faq-item";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "General FAQs",
  description: "Frequently asked questions about our jewelry store",
};

const faqs = [
  {
    question: "1. Can I cancel my order after I've made a purchase?",
    answer: [
      "Because of our quick order processing times, we are unable to offer order cancellation or make any changes to your order.",
      "If you would still like a refund, you must wait to receive the product and initiate a standard return. Please refer to our Returns & Exchanges section for additional information on our hassle-free return policy.",
    ],
  },
  {
    question: "2. How do I return or exchange an item?",
    answer:
      "Our hassle-free return policy is effective for 7 days from the time your order is delivered. Please refer to our Returns & Exchanges section for more information on how to initiate the returns process.",
  },
  {
    question: "3. What payment methods do you accept?",
    answer:
      "We accept almost all major payment providers, including PayPal. Please see our product listings for information on specific providers.",
  },
  {
    question: "4. What are your shipping options?",
    answer:
      "Please refer to our Shipping FAQ section for a detailed answer to this question.",
  },
  {
    question: "5. What if the item I ordered arrived broken or damaged?",
    answer:
      "We'll make it up to you. You can request store credit, an exchange of equal or lesser value, or a full refund to your original form of payment. Please contact us at hello@jewelsupport.com. We're happy to help!",
  },
  {
    question: "6. Where do you ship from?",
    answer: [
      "We operate out of Pennsylvania on the East Coast of the United States, but we primarily ship from fulfillment centers around the globe. Currently, our orders ship from fulfillment centers in the United States, Europe, and Asia depending on what is nearest to you and product availability.",
      "If the item you've purchased is out of inventory in your nearest location, we'll send it directly from our production lines adhering to the same delivery times stated in our Shipping FAQs.",
    ],
  },
  {
    question: "7. What can I do about late or missing items?",
    answer: [
      "If your package has not yet arrived as per the timeline indicated on our Shipping FAQ, please contact us at hello@jewelsupport.com.",
      "We are always happy to help!",
    ],
  },
];

export default function GeneralFAQs() {
  return (
    <>
      <div className="mx-auto max-w-3xl py-8 px-[15px] md:px-[50px] bg-white text-black">
        <h1 className="text-5xl font-semibold mb-8 text-center">
          General FAQs
        </h1>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
