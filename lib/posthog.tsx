"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

// Function to generate a UUID v4
function generateUUID() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Helper to determine the actual environment
function getEnvironment() {
  // Check if we're in a Vercel preview deployment
  if (
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "preview" ||
    // Check if the URL contains vercel preview domain
    (typeof window !== "undefined" &&
      window.location.hostname.includes("vercel.app"))
  ) {
    return "preview";
  }

  if (process.env.NODE_ENV === "development") {
    return "development";
  }

  return process.env.NODE_ENV || "production";
}

if (typeof window !== "undefined") {
  try {
    const environment = getEnvironment();

    // Only log presence/absence of required config
    console.log("PostHog initialization status:", {
      hasKey: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
      hasHost: !!process.env.NEXT_PUBLIC_POSTHOG_HOST,
      environment,
    });

    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      !process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      console.error(
        "PostHog initialization failed: Missing required configuration"
      );
    }

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "identified_only",
      loaded: (posthog) => {
        // Enable debug mode in development or preview
        if (environment !== "production") {
          console.log(`PostHog initialized in ${environment} mode`);
          posthog.debug();
        }
      },
      bootstrap: {
        distinctID: generateUUID(),
        isIdentifiedID: false,
      },
    });

    // Register global properties
    posthog.register({
      environment: environment,
      app: "storefront",
      app_version: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
      deployment: process.env.NEXT_PUBLIC_VERCEL_ENV || "unknown",
    });
  } catch (error) {
    console.error("PostHog initialization error occurred");
  }
}

export function PostHogProviderClient({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined") {
    try {
      const isPostHogLoaded = posthog.__loaded;
      const environment = getEnvironment();
      console.log(
        `PostHog status (${environment}):`,
        isPostHogLoaded ? "Active" : "Inactive"
      );
    } catch (error) {
      console.error("PostHog provider error occurred");
    }
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
