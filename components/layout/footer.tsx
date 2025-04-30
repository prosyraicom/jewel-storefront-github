import { getMenu } from "lib/shopify";
import PaymentIcons from "./payment-icons";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const skeleton =
    "w-full h-6 animate-pulse rounded-sm bg-neutral-200 dark:bg-neutral-700";
  const menu = await getMenu("next-js-frontend-footer-menu");

  return (
    <footer className="footer color-background-1 border-t border-neutral-200 mt-10 gradient section-padding animate-section">
      <div className="footer__content-top page-width  mx-auto max-w-[1400px] py-10 px-[15px] md:px-[50px]">
        <div className="footer__blocks-wrapper grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="footer-block">
            <div className="footer-block__details-content footer-block-image center">
              <div
                className="footer-block__image-wrapper"
                style={{ maxWidth: "min(100%, 550px)" }}
              >
                <img
                  src="/jewel_secure.webp"
                  alt="Jewel Logo"
                  loading="lazy"
                  width="1080"
                  height="283"
                />
              </div>
            </div>
          </div>

          {/* Need Help Section */}
          <div className="footer-block md:col-span-2">
            <h2 className="footer-block__heading text-xl font-medium mb-4">
              Need help?
            </h2>
            <div className="footer-block__details-content rte">
              <p className="mb-2">
                Get a response in <strong>UNDER 10 minutes.</strong>*
              </p>
              <p className="mb-2">
                24 hours a day, 7 days a week, 365 days a year.
              </p>
              <p className="mb-4">
                Just send us an email or text and we'll get back to you right
                away!
              </p>
              <p className="mb-2">
                Email:{" "}
                <a
                  href="mailto:hello@jewelsupport.com"
                  className="text-purple-600 hover:underline"
                >
                  <strong>hello@jewelsupport.com</strong>
                </a>
              </p>
              <p className="mb-4">
                Text:{" "}
                <a
                  href="sms:+18885111180"
                  className="text-purple-600 hover:underline"
                >
                  <strong>(888) 511-1180</strong>
                </a>
              </p>
              <p className="text-xs italic">
                *This is our average response time for most customers. Our
                response times may sometimes increase due to unexpected surges
                in volume.
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-block">
            <h2 className="footer-block__heading text-xl font-medium mb-4">
              Quick Links
            </h2>
            <ul className="footer-block__details-content list-unstyled">
              <li className="mb-2">
                <a
                  href="https://jewelshoppingco.com/products/homepage-membership"
                  className="hover:text-neutral-700"
                >
                  Become A Member
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://jewelcovip.com/login"
                  className="hover:text-neutral-700"
                >
                  VIP Login
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://jewelshoppingco.com/pages/general-faq"
                  className="hover:text-neutral-700"
                >
                  General FAQ
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://jewelshoppingco.com/pages/shipping-faq"
                  className="hover:text-neutral-700"
                >
                  Shipping FAQ
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://jewelshoppingco.com/pages/returns-exchanges"
                  className="hover:text-neutral-700"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://jewelshoppingco.com/pages/accessibility"
                  className="hover:text-neutral-700"
                >
                  Accessibility
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://jewelshoppingco.com/pages/privacy-policy"
                  className="hover:text-neutral-700"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://jewelshoppingco.com/pages/terms-of-service"
                  className="hover:text-neutral-700"
                >
                  Terms of Service
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://jewelshoppingco.com/tools/tracking"
                  className="hover:text-neutral-700"
                >
                  Track My Order
                </a>
              </li>
            </ul>
          </div>

          {/* Company Description */}
          <div className="footer-block md:col-span-4">
            <div className="footer-block__details-content rte text-center">
              <h6 className="text-lg font-medium">
                High-quality products. Fast shipping. Unbeatable prices.
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Copyright */}
      <div className="footer__content-bottom border-t border-neutral-200 mt-8 pt-8">
        <div className="footer__content-bottom-wrapper page-width">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="footer__payment">
              <span className="sr-only">Payment methods</span>
              <PaymentIcons />
            </div>
            <div className="footer__copyright text-sm">
              <small className="copyright__content">
                © {copyrightDate} Jewel - All rights reserved.
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
