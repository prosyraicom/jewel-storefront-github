import { headers } from "next/headers";

export interface IPGeolocationData {
  ip: string;
  country: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  timezone: string;
}

export async function getIPGeolocationData(): Promise<IPGeolocationData> {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for") ?? "";
    const vercelCountry = headersList.get("x-vercel-ip-country") ?? "";
    const vercelCity = headersList.get("x-vercel-ip-city") ?? "";
    const vercelLatitude = headersList.get("x-vercel-ip-latitude") ?? "";
    const vercelLongitude = headersList.get("x-vercel-ip-longitude") ?? "";

    const ip = forwardedFor ? forwardedFor.split(",")[0] : "127.0.0.1";

    console.log("[Client IP API]", {
      vercelCountry,
      vercelCity,
      vercelLatitude,
      vercelLongitude,
      ip,
    });

    return {
      ip,
      country: vercelCountry || "unknown",
      region: "unknown", // Vercel doesn't provide region
      city: vercelCity || "unknown",
      latitude: vercelLatitude ? parseFloat(vercelLatitude) : 0,
      longitude: vercelLongitude ? parseFloat(vercelLongitude) : 0,
      timezone: "UTC", // Vercel doesn't provide timezone
    };
  } catch (error) {
    console.error("Error getting IP data:", error);
    return {
      ip: "unknown",
      country: "unknown",
      region: "unknown",
      city: "unknown",
      latitude: 0,
      longitude: 0,
      timezone: "UTC",
    };
  }
}

export const isBlacklistedCountry = (countryCode: string): boolean => {
  const blacklistedCountries: string[] = [];
  return blacklistedCountries.includes(countryCode);
};
