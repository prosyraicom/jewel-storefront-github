import Footer from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order",
  description: "Track the status of your Jewel order",
};

export default function TrackOrder() {
  return (
    <>
      <div className="mx-auto max-w-3xl py-8 px-[15px] md:px-[50px] bg-white text-black">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-semibold mb-8 text-center">
            Track Your Order
          </h1>

          <form className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="tracking-number"
                className="block text-sm font-medium text-gray-700 text-center"
              >
                Tracking Number
              </label>
              <input
                type="text"
                id="tracking-number"
                name="tracking-number"
                className="block w-full rounded-md border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-black focus:ring-black"
                placeholder=""
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-md bg-[#23ae3b] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#2b924a] focus:outline-none focus:ring-2 focus:ring-[#31A24C]"
            >
              Track
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
