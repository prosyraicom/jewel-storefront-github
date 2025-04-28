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
    const response = await fetch("https://ipapi.co/json/");
    if (!response.ok) {
      throw new Error("Failed to fetch IP data");
    }
    const data = await response.json();

    return {
      ip: data.ip,
      country: data.country_name,
      region: data.region,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      timezone: data.timezone,
    };
  } catch (error) {
    console.error("Error fetching IP data:", error);
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
