import { useRouter, useSearchParams } from "next/navigation";

export function usePreserveParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const appendPreservedParams = (baseUrl: string) => {
    // Parse the base URL to handle URLs that might already have parameters
    const url = new URL(baseUrl, window.location.origin);

    // Get current params
    const currentParams = new URLSearchParams(searchParams.toString());

    // Get existing params from the base URL
    const existingParams = url.searchParams;

    // Merge params, giving priority to the base URL's params
    currentParams.forEach((value, key) => {
      if (!existingParams.has(key)) {
        url.searchParams.append(key, value);
      }
    });

    return url.toString();
  };

  const preservedNavigate = (path: string) => {
    const preservedUrl = appendPreservedParams(path);
    router.push(preservedUrl);
  };

  return { appendPreservedParams, preservedNavigate };
}
