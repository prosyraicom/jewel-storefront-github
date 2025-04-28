"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function usePreserveParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const appendPreservedParams = (baseUrl: string) => {
    try {
      // Parse the base URL to handle URLs that might already have parameters
      const url = new URL(baseUrl, window.location.origin);

      // Get current params
      const currentParams = new URLSearchParams(searchParams?.toString() || "");

      // Get existing params from the base URL
      const existingParams = url.searchParams;

      // Merge params, giving priority to the base URL's params
      currentParams.forEach((value, key) => {
        if (!existingParams.has(key)) {
          url.searchParams.append(key, value);
        }
      });

      return url.toString();
    } catch (error) {
      // If there's any error in parsing or handling params, return the original URL
      console.warn("Error preserving params:", error);
      return baseUrl;
    }
  };

  const preservedNavigate = (path: string) => {
    const preservedUrl = appendPreservedParams(path);
    router.push(preservedUrl);
  };

  return { appendPreservedParams, preservedNavigate };
}
