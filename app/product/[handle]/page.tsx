import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductCustomersReviews } from "@/components/product/product-customers-reviews";
import ProductImageFeature from "@/components/product/product-image-feature";
import { ProductMultipleVideos } from "@/components/product/product-multiple-videos";
import ProductVideoFeature from "@/components/product/product-video-feature";
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

  // Sample reviews for ProductCustomersReviews
  const sampleReviews = [
    {
      review:
        "I surprised my husband with this Men's Attraction Perfume, and it has been a game-changer! The scent is perfectly balanced—strong but not overpowering. Every time he wears it, I find myself drawn to him even more.",
      name: "Alicia S.",
      stars: 5,
      imageUrl: "https://www.placecats.com/400/400?image=1",
      title: "loving it!",
    },
    {
      review:
        "At first, I was unsure about trying a new fragrance, but this one blew me away. Every time I wear it, I can literally feel heads turning. People compliment me on my scent all the time, and it makes me feel incredibly attractive!",
      name: "John B.",
      stars: 5,
      imageUrl: "https://www.placecats.com/400/400?image=2",
      title: "it really works!",
    },
    {
      review:
        "I first spotted this Men's Attraction Perfume in my husband's closet. The scent is so captivating and sexy that I couldn't resist buying him more! Every time he wears it, I find myself wanting to be closer to him. It has an addictive quality that just makes me feel alive. If you want to add some spice to your relationship, this perfume is a must-have!",
      name: "Emily R.",
      stars: 5,
      imageUrl: "https://www.placecats.com/400/400?image=3",
      title: "must-have!",
    },
  ];

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

        <ProductImageFeature
          title="Feeling drained and unfocused?"
          description="Unleash your full potential with Shilajit—the potent, natural powerhouse that revives your energy, boosts your stamina, and sharpens your mental clarity. Packed with essential minerals and nutrients, Shilajit delivers a sustained, unstoppable flow of vitality to keep you at your peak, all day long. Don't just get through the day—thrive with Shilajit!"
          imageSrc="https://www.placecats.com/600/400"
          imagePosition="right"
        />

        <ProductImageFeature
          title="Stunning Product Image"
          description="Unleash your full potential with Shilajit—the potent, natural powerhouse that revives your energy, boosts your stamina, and sharpens your mental clarity. Packed with essential minerals and nutrients, Shilajit delivers a sustained, unstoppable flow of vitality to keep you at your peak, all day long. Don't just get through the day—thrive with Shilajit!"
          imageSrc="https://www.placecats.com/600/400"
          imagePosition="left"
        />

        {/* Product Video Feature Example */}
        <ProductVideoFeature
          title="Embrace irresistible Charm!"
          description="Enjoy a captivating scent that boosts your confidence and makes you unforgettable."
          videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
          videoPosition="right"
        />

        {/* Product Video Feature Example */}
        <ProductVideoFeature
          title="Embrace irresistible Charm!"
          description="Enjoy a captivating scent that boosts your confidence and makes you unforgettable."
          videoSrc="https://www.w3schools.com/html/mov_bbb.mp4"
          videoPosition="left"
        />
        <ProductMultipleVideos
          title="Feel the energy – Join 25,000+ people who love Shilajit Sticks!"
          videos={[
            "https://www.w3schools.com/html/mov_bbb.mp4",
            "https://www.w3schools.com/html/mov_bbb.mp4",
            "https://www.w3schools.com/html/mov_bbb.mp4",
          ]}
        />
        <ProductCustomersReviews
          header={"Customer Reviews"}
          reviews={sampleReviews}
        />
        {/* Product Guarantee Section */}
        <ProductGuarantee />
      </div>
      <Footer />
    </ProductProvider>
  );
}
