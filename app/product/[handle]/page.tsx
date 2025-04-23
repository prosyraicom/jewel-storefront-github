import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Footer from "components/layout/footer";
import { Gallery } from "components/product/gallery";
import { ProductProvider } from "components/product/product-context";
import { ProductGuarantee } from "components/product/product-guarantee";
import { ProductInfo } from "components/product/product-info";
import { HIDDEN_PRODUCT_TAG } from "lib/constants";
import { getProduct, getProducts } from "lib/shopify";
import { Image } from "lib/shopify/types";
import { Suspense } from "react";

export async function generateStaticParams() {
  const products = await getProducts({});
  return products.map((product) => ({
    handle: product.handle,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  return (
    <ProductProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-[1400px] px-[15px] md:px-[50px] bg-white text-black">
        {/* Main product section with image and details */}
        <div className="py-[36px] flex flex-col md:flex-row md:gap-4">
          {/* Left side - Product images */}
          <div className="w-full md:w-7/12">
            <Suspense
              fallback={
                <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
              }
            >
              <Gallery
                images={product.images.slice(0, 5).map((image: Image) => ({
                  src: image.url,
                  altText: image.altText,
                }))}
              />
            </Suspense>
          </div>

          {/* Right side - Product info */}
          <div className="w-full md:w-5/12 mt-8 md:mt-0">
            <Suspense fallback={null}>
              <ProductInfo product={product} />
            </Suspense>
          </div>
        </div>

        {/* Product Guarantee Section */}
        <ProductGuarantee />
      </div>
      <Footer />
    </ProductProvider>
  );
}
