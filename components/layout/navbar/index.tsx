import { getMenu } from "lib/shopify";
import NavbarMenu from "./menu";
import MovingBanner from "./moving-banner";
import Timer from "./timer";

const { SITE_NAME } = process.env;

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <>
      {/* Black sticky header with timer */}
      <div
        className="sticky top-0 z-50 bg-black text-white flex justify-center items-center z-10000"
        style={{ width: "100%" }}
      >
        {/* This div matches the dimensions in the oriiginal */}
        <div
          className="px-3 py-2 flex flex justify-center"
          style={{ width: "321.39px", height: "56px" }}
        >
          <div className="text-center" style={{ lineHeight: 1.2 }}>
            <div>
              ⏳ <span className="font-medium">FLASH SALE:</span>
            </div>
            <div>
              <span className="font-medium">
                UP TO <u>90% OFF</u> ENDS IN
              </span>
            </div>
          </div>
          <div className="flex justify-center ml-1">
            <Timer initialHours={0} initialMinutes={16} initialSeconds={46} />
          </div>
        </div>
      </div>

      {/* White header - static text part */}
      <div className="bg-white py-3 md:py-4 border-b text-center">
        <p
          className="text-[13px] md:text-xl px-[15px] md:px-[50px]"
          style={{ letterSpacing: "1.4px", lineHeight: "1.2" }}
        >
          <span className="font-bold">
            90 day money-back guarantee on all orders.
          </span>{" "}
          ✨{" "}
          <span className="italic">
            Love what you buy or get your money back.
          </span>{" "}
          💖
        </p>
      </div>

      {/* Moving banner below the white header */}
      <MovingBanner />

      {/* White header - menu, logo, cart part */}
      <div className="border-b">
        <NavbarMenu menu={menu} />
      </div>
    </>
  );
}
