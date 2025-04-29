"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  try {
    // Only log presence/absence of required config
    console.log("PostHog initialization status:", {
      hasKey: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
      hasHost: !!process.env.NEXT_PUBLIC_POSTHOG_HOST,
      environment: process.env.NODE_ENV,
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
        if (process.env.NODE_ENV === "development") {
          console.log("PostHog initialized in development mode");
          posthog.debug();
        }
      },
      bootstrap: {
        distinctID: "debug-session",
        isIdentifiedID: false,
      },
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
      console.log("PostHog status:", isPostHogLoaded ? "Active" : "Inactive");
    } catch (error) {
      console.error("PostHog provider error occurred");
    }
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
