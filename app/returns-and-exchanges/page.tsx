import Footer from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Returns & Exchanges",
  description: "Returns and exchanges policy for our jewelry store",
};

const returnPolicy = {
  intro: [
    "While we do our best at Jewel to ensure you have an amazing experience, our team understands that sometimes things can go wrong. We are fully committed to ensuring your satisfaction when you order from our brand.",
    "If you have received a damaged product or you're looking to return or exchange for your order, we're here to help! We offer hassle-free returns or exchanges within 7 days of receiving your order. You can return your product for a full refund to the original payment method, store credit, or a replacement product of equal or lesser value.",
  ],
  contact:
    "To initiate a refund or ask us a question, please send us an email at hello@jewelsupport.com",
  exceptions: [
    "Returned items must have no visible signs of wear or use.",
    "Returned items must be in their original condition and original packaging.",
  ],
  shipping: {
    question: "Do I have to pay for return shipping?",
    answer: "No, never. We cover all return shipping costs.",
  },
  process:
    "Once your returned item arrives to our processing facility, we will inspect the item and exchange for store credit, a product of equal or lesser value, or issue a refund to your original form of payment.",
  timing:
    "Please note that refunds generally take 5-10 business days to process.",
  support:
    "For additional clarification or assistance, please contact hello@jewelsupport.com. We are always happy to help!",
};

export default function ReturnsAndExchanges() {
  return (
    <>
      <div className="mx-auto max-w-3xl py-8 px-[15px] md:px-[50px] bg-white text-black">
        <h1 className="text-5xl font-semibold mb-8 text-center">
          Returns & Exchanges
        </h1>

        {/* Introduction */}
        <div className="mb-8">
          {returnPolicy.intro.map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Contact Information */}
        <p className="text-gray-700 mb-8">{returnPolicy.contact}</p>

        {/* Exceptions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Please note the following notes/exceptions to our return and
            exchange policy:
          </h2>
          <ul className="list-disc pl-6 text-gray-700">
            {returnPolicy.exceptions.map((exception, index) => (
              <li key={index} className="mb-2">
                {exception}
              </li>
            ))}
          </ul>
        </div>

        {/* Return Shipping */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            {returnPolicy.shipping.question}
          </h2>
          <p className="text-gray-700">{returnPolicy.shipping.answer}</p>
        </div>

        {/* Process */}
        <p className="text-gray-700 mb-4">{returnPolicy.process}</p>

        {/* Timing */}
        <p className="text-gray-700 mb-4">{returnPolicy.timing}</p>

        {/* Support */}
        <p className="text-gray-700">{returnPolicy.support}</p>
      </div>
      <Footer />
    </>
  );
}
