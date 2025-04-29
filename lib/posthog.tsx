"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  try {
    console.log("PostHog Environment Variables:", {
      key: process.env.NEXT_PUBLIC_POSTHOG_KEY ? "✓ Present" : "✗ Missing",
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ? "✓ Present" : "✗ Missing",
      nodeEnv: process.env.NODE_ENV,
    });

    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      console.error("PostHog key is missing!");
    }
    if (!process.env.NEXT_PUBLIC_POSTHOG_HOST) {
      console.error("PostHog host is missing!");
    }

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "identified_only",
      loaded: (posthog) => {
        console.log("PostHog loaded callback triggered");
        if (process.env.NODE_ENV === "development") {
          console.log("PostHog initialized in development mode");
          posthog.debug();
        } else {
          console.log("PostHog initialized in production mode");
        }
      },
      bootstrap: {
        distinctID: "debug-session",
        isIdentifiedID: false,
      },
    });

    console.log("PostHog initialization completed");
  } catch (error) {
    console.error("Error initializing PostHog:", error);
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
      console.log("PostHog Provider Status:", {
        loaded: isPostHogLoaded ? "✓ Yes" : "✗ No",
        config: posthog.config,
      });
    } catch (error) {
      console.error("Error in PostHog Provider:", error);
    }
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
