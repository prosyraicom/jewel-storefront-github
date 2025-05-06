import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "components/builder"; // You'll need to create this component
import Prose from "components/prose";
import { getPage, getPages } from "lib/shopify";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

// Initialize Builder with your API key
builder.init("37669eee2ec640c594c8f88af4112c59");

export async function generateStaticParams() {
  const pages = await getPages();
  return pages.map((page) => ({
    page: page.handle,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) {
    // Try to get metadata from Builder.io content
    const builderContent = await builder
      .get("page", {
        userAttributes: {
          urlPath: "/" + params.page,
        },
        prerender: false,
      })
      .toPromise();

    if (builderContent) {
      return {
        title: builderContent.data?.title || "Page",
        description: builderContent.data?.description,
      };
    }

    return notFound();
  }

  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || page.bodySummary,
    openGraph: {
      publishedTime: page.createdAt,
      modifiedTime: page.updatedAt,
      type: "article",
    },
  };
}

export default async function Page(props: {
  params: Promise<{ page: string }>;
}) {
  const params = await props.params;

  // First, try to get the page from Shopify
  const shopifyPage = await getPage(params.page);

  // If Shopify page exists, render it
  if (shopifyPage) {
    return (
      <>
        <h1 className="mb-8 text-5xl font-bold">{shopifyPage.title}</h1>
        <Prose className="mb-8" html={shopifyPage.body} />
        <p className="text-sm italic">
          {`This document was last updated on ${new Intl.DateTimeFormat(
            undefined,
            {
              year: "numeric",
              month: "long",
              day: "numeric",
            }
          ).format(new Date(shopifyPage.updatedAt))}.`}
        </p>
      </>
    );
  }

  // If Shopify page doesn't exist, try Builder.io
  const builderContent = await builder
    .get("page", {
      userAttributes: {
        urlPath: "/" + params.page,
      },
      prerender: false,
    })
    .toPromise();

  // If Builder.io content exists, render it
  if (builderContent) {
    return <RenderBuilderContent content={builderContent} />;
  }

  // If neither exists, return 404
  return notFound();
}
