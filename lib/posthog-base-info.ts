import posthog from "posthog-js";

export interface PostHogBaseInfo {
  // Public metrics
  distinctId: string;
  currentPath: string;
  referrer: string;
  userAgent: string;
  screenResolution: string;
  language: string;
  timezone: string;
  deviceType: string;
  browser: string;
  os: string;

  // IP and Location data
  ip: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;

  // Cart data
  cartItems: Array<{
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }>;

  // Navigation state
  currentMenuPosition?: string;
  scrollPosition?: number;
  viewportHeight?: number;
  viewportWidth?: number;

  // Performance metrics
  pageLoadTime?: number;
  timeOnPage?: number;
}

export function capturePostHogBaseInfo(info: PostHogBaseInfo) {
  if (typeof window !== "undefined") {
    // Identify the user with public data
    posthog.identify(info.distinctId, {
      device_type: info.deviceType,
      browser: info.browser,
      os: info.os,
      language: info.language,
      timezone: info.timezone,
      screen_resolution: info.screenResolution,
      country: info.country,
      region: info.region,
      city: info.city,
      ip: info.ip,
    });

    // Capture a base info event with all public data
    posthog.capture("page_view", {
      ...info,
      // Add any additional properties you want to track
      cart_item_count: info.cartItems.length,
      cart_total: info.cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    });
  }
}

// Helper function to get public data
export async function getPublicData(): Promise<Partial<PostHogBaseInfo>> {
  if (typeof window === "undefined") return {};

  const { getIPGeolocationData } = await import("./ip-geolocation");
  const ipData = await getIPGeolocationData();

  return {
    currentPath: window.location.pathname,
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    language: navigator.language,
    timezone: ipData.timezone,
    deviceType: /Mobile|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      ? "mobile"
      : "desktop",
    browser: getBrowser(),
    os: getOS(),
    viewportHeight: window.innerHeight,
    viewportWidth: window.innerWidth,
    ip: ipData.ip,
    country: ipData.country,
    region: ipData.region,
    city: ipData.city,
    latitude: ipData.latitude,
    longitude: ipData.longitude,
  };
}

function getBrowser(): string {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Chrome")) return "Chrome";
  if (userAgent.includes("Firefox")) return "Firefox";
  if (userAgent.includes("Safari")) return "Safari";
  if (userAgent.includes("Edge")) return "Edge";
  if (userAgent.includes("MSIE") || userAgent.includes("Trident/"))
    return "Internet Explorer";
  return "Unknown";
}

function getOS(): string {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Windows")) return "Windows";
  if (userAgent.includes("Mac")) return "MacOS";
  if (userAgent.includes("Linux")) return "Linux";
  if (userAgent.includes("Android")) return "Android";
  if (
    userAgent.includes("iOS") ||
    userAgent.includes("iPhone") ||
    userAgent.includes("iPad")
  )
    return "iOS";
  return "Unknown";
}
