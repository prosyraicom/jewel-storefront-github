import OpengraphImage from "components/opengraph-image";
import { getPage, getPages } from "lib/shopify";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({
    page: page.handle,
  }));
}

export default async function Image({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
