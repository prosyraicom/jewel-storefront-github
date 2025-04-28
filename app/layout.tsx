import { CartProvider } from "components/cart/cart-context";
import { Navbar } from "components/layout/navbar";
import { PostHogContextProvider } from "components/posthog-context";
import { WelcomeToast } from "components/welcome-toast";
import { PostHogProviderClient } from "lib/posthog";
import { getPublicData } from "lib/posthog-base-info";
import { getCart } from "lib/shopify";
import { baseUrl } from "lib/utils";
import { Jost } from "next/font/google";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const { SITE_NAME } = process.env;

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cart = getCart();

  // Get public data for PostHog
  const publicData = await getPublicData();

  const postHogBaseInfo = {
    distinctId: `anonymous_${Math.random().toString(36).substring(2, 15)}`,
    currentPath: typeof window !== "undefined" ? window.location.pathname : "/",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    screenResolution:
      typeof window !== "undefined"
        ? `${window.screen.width}x${window.screen.height}`
        : "0x0",
    language: typeof navigator !== "undefined" ? navigator.language : "en",
    timezone: publicData.timezone || "UTC",
    deviceType:
      typeof navigator !== "undefined" &&
      /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
        ? "mobile"
        : "desktop",
    browser: "Unknown",
    os: "Unknown",
    ip: publicData.ip || "unknown",
    country: publicData.country || "unknown",
    region: publicData.region || "unknown",
    city: publicData.city || "unknown",
    latitude: publicData.latitude || 0,
    longitude: publicData.longitude || 0,
    cartItems: [], // Will be populated by cart context
  };

  return (
    <html lang="en" className={`${jost.className}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      {/* <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white"> */}
      <body className="bg-white text-black selection:bg-teal-300">
        <PostHogProviderClient>
          <PostHogContextProvider postHogBaseInfo={postHogBaseInfo}>
            <CartProvider cartPromise={cart}>
              <Navbar />
              <main>
                {children}
                <Toaster closeButton />
                <WelcomeToast />
              </main>
            </CartProvider>
          </PostHogContextProvider>
        </PostHogProviderClient>
      </body>
    </html>
  );
}
