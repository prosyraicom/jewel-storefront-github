// components/CustomerService.tsx
import Link from "next/link";

type CustomerServiceProps = {
  emailAddress?: string;
  phoneNumber?: string;
};

export default function CustomerService({
  emailAddress = "hello@jewelsupport.com",
  phoneNumber = "(888) 511-1180",
}: CustomerServiceProps) {
  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Heading with stars */}
        <div className="flex items-center justify-center">
          <span className="text-yellow-400 text-2xl">★</span>
          <h2 className="mx-2 text-xl font-bold text-center">
            JUST-IN: 10-minute customer service!
          </h2>
          <span className="text-yellow-400 text-2xl">★</span>
        </div>

        {/* Response time */}
        <div className="mt-4">
          <p className="text-gray-800">
            Need help? Get a response in{" "}
            <span className="font-bold">UNDER 10 minutes.*</span>
          </p>
        </div>

        {/* Availability */}
        <p className="mt-4 text-gray-700">
          24 hours a day, 7 days a week, 365 days a year.
        </p>

        {/* Call to action */}
        <p className="mt-4 text-gray-700">
          Just send us an email or text and we'll get back to you right away!
        </p>

        {/* Contact information */}
        <div className="mt-4">
          <p className="text-gray-800">
            Email:{" "}
            <Link href={`mailto:${emailAddress}`} className="text-purple-600">
              {emailAddress}
            </Link>
          </p>
          <p className="mt-1 text-gray-800">
            Text:{" "}
            <Link
              href={`tel:${phoneNumber.replace(/[()-\s]/g, "")}`}
              className="text-purple-600"
            >
              {phoneNumber}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
