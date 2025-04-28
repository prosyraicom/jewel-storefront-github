"use client";

// components/VipMembership.tsx
import { PreservedLink } from "components/common/preserved-link";
import { usePostHog } from "components/posthog-context";
import Image from "next/image";
import posthog from "posthog-js";

type VipMembershipProps = {
  price?: string;
  membershipLink?: string;
};

export default function VipMembership({
  price = "$29.95/month",
  membershipLink = "https://jewelshoppingco.com/products/homepage-membership",
}: VipMembershipProps) {
  const { postHogBaseInfo } = usePostHog();

  const handleMembershipClick = () => {
    posthog.capture("membership_link_clicked", {
      ...postHogBaseInfo,
      membership_price: price,
      membership_link: membershipLink,
    });
  };

  return (
    <div className="w-full bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="md:flex md:items-center md:space-x-12">
          {/* Membership Image - Left side */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="max-w-md">
              <Image
                src="/membership.webp"
                alt="Jewel VIP Membership Plans"
                width={600}
                height={600}
                className="w-full rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Membership Details - Right side */}
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <div className="uppercase text-gray-600 text-sm font-medium">
              EXCLUSIVE OFFER
            </div>

            <h2 className="text-3xl font-bold mt-2">Jewel VIP Membership</h2>

            <p className="mt-4 text-gray-800">
              For <span className="font-bold">{price}</span>, get access to our
              VIP features and discounts.
            </p>

            <div className="mt-6">
              <PreservedLink
                href={membershipLink}
                className="inline-block px-6 py-3 bg-[#23ae3b] text-white font-bold rounded-md hover:bg-[#c49a6c] transition"
                onClick={handleMembershipClick}
              >
                START MY MEMBERSHIP
              </PreservedLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
