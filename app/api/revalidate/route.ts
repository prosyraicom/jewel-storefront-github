import { revalidate } from "lib/shopify";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-static";

export async function POST(req: NextRequest): Promise<NextResponse> {
  return revalidate(req);
}
