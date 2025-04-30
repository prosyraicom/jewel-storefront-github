import Footer from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Our commitment to digital accessibility and equal website access",
};

const accessibilityContent = {
  intro:
    "Jewel is committed to providing digital accessibility and equal website access for people with disabilities.",
  commitment:
    "By consulting relevant accessibility standards, we are constantly improving our user experience and strive to provide an all-inclusive atmosphere.",
  contact:
    "If you have any questions, comments, concerns, or difficulty using our site, please contact hello@jewelsupport.com and we would be more than happy to help.",
};

export default function Accessibility() {
  return (
    <>
      <div className="mx-auto max-w-3xl py-8 px-[15px] md:px-[50px] bg-white text-black">
        <h1 className="text-5xl font-semibold mb-8 text-center">
          Accessibility
        </h1>

        <div className="space-y-6">
          {/* Introduction */}
          <p className="text-gray-700">{accessibilityContent.intro}</p>

          {/* Commitment Statement */}
          <p className="text-gray-700">{accessibilityContent.commitment}</p>

          {/* Contact Information */}
          <p className="text-gray-700">{accessibilityContent.contact}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
