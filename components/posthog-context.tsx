"use client";

import { PostHogBaseInfo } from "@/lib/posthog-base-info";
import { createContext, ReactNode, useContext } from "react";

interface PostHogContextType {
  postHogBaseInfo: PostHogBaseInfo | null;
}

const PostHogContext = createContext<PostHogContextType>({
  postHogBaseInfo: null,
});

export function usePostHog() {
  return useContext(PostHogContext);
}

export function PostHogContextProvider({
  children,
  postHogBaseInfo,
}: {
  children: ReactNode;
  postHogBaseInfo: PostHogBaseInfo | null;
}) {
  return (
    <PostHogContext.Provider value={{ postHogBaseInfo }}>
      {children}
    </PostHogContext.Provider>
  );
}
