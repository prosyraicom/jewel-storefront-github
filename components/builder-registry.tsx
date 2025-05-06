// components/builder-registry.tsx
"use client";
import { Builder } from "@builder.io/react";
import { Carousel } from "./carousel";
import { GridTileImage } from "./grid/tile";
import Label from "./label";
import Footer from "./layout/footer";
import FooterMenu from "./layout/footer-menu";
import PaymentIcons from "./layout/payment-icons";
import LoadingDots from "./loading-dots";
import LogoSquare from "./logo-square";
import { BuyNowButton } from "./product/buy-now-button";
import { EstimatedShipping } from "./product/estimated-shipping";
import { Gallery } from "./product/gallery";
import { ProductFeatures } from "./product/product-features";
import { ProductGuarantee } from "./product/product-guarantee";
import { ProductInfo } from "./product/product-info";
import { ProductPrice } from "./product/product-price";
import { ProductRating } from "./product/product-rating";
import { ProductTitle } from "./product/product-title";
import ProductVideoFeature from "./product/ProductVideoFeature";
import { WelcomeToast } from "./welcome-toast";

// Register Carousel Component
Builder.registerComponent(Carousel, {
  name: "Product Carousel",
  inputs: [
    {
      name: "collection",
      type: "string",
      defaultValue: "hidden-homepage-carousel",
    },
  ],
});

// Register GridTileImage Component
Builder.registerComponent(GridTileImage, {
  name: "Grid Tile Image",
  inputs: [
    {
      name: "alt",
      type: "string",
      required: true,
    },
    {
      name: "src",
      type: "string",
      required: true,
    },
    {
      name: "label",
      type: "object",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "amount",
          type: "string",
        },
        {
          name: "currencyCode",
          type: "string",
        },
      ],
    },
    {
      name: "fill",
      type: "boolean",
      defaultValue: true,
    },
    {
      name: "sizes",
      type: "string",
      defaultValue: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
    },
  ],
});

// Register Label Component
Builder.registerComponent(Label, {
  name: "Label",
  inputs: [
    {
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "amount",
      type: "string",
      required: true,
    },
    {
      name: "currencyCode",
      type: "string",
      required: true,
    },
  ],
});

// Register LoadingDots Component
Builder.registerComponent(LoadingDots, {
  name: "Loading Dots",
  inputs: [
    {
      name: "className",
      type: "string",
      defaultValue: "",
    },
  ],
});

// Register LogoSquare Component
Builder.registerComponent(LogoSquare, {
  name: "Logo Square",
  inputs: [
    {
      name: "size",
      type: "number",
      defaultValue: 32,
    },
  ],
});

// Register WelcomeToast Component
Builder.registerComponent(WelcomeToast, {
  name: "Welcome Toast",
  inputs: [
    {
      name: "title",
      type: "string",
      defaultValue: "Welcome to our store!",
    },
    {
      name: "message",
      type: "string",
      defaultValue: "Check out our latest products.",
    },
  ],
});

// Register ProductTitle Component
Builder.registerComponent(ProductTitle, {
  name: "Product Title",
  inputs: [
    {
      name: "title",
      type: "string",
      required: true,
    },
  ],
});

// Register ProductPrice Component
Builder.registerComponent(ProductPrice, {
  name: "Product Price",
  inputs: [
    {
      name: "price",
      type: "object",
      required: true,
      subFields: [
        {
          name: "amount",
          type: "string",
          required: true,
        },
        {
          name: "currencyCode",
          type: "string",
          required: true,
        },
      ],
    },
    {
      name: "compareAtPrice",
      type: "object",
      subFields: [
        {
          name: "amount",
          type: "string",
        },
        {
          name: "currencyCode",
          type: "string",
        },
      ],
    },
  ],
});

// Register ProductRating Component
Builder.registerComponent(ProductRating, {
  name: "Product Rating",
  inputs: [
    {
      name: "rating",
      type: "number",
      required: true,
    },
    {
      name: "reviewCount",
      type: "number",
      required: true,
    },
  ],
});

// Register ProductInfo Component
Builder.registerComponent(ProductInfo, {
  name: "Product Info",
  inputs: [
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "features",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
      ],
    },
  ],
});

// Register ProductGuarantee Component
Builder.registerComponent(ProductGuarantee, {
  name: "Product Guarantee",
  inputs: [
    {
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "description",
      type: "string",
      required: true,
    },
  ],
});

// Register ProductFeatures Component
Builder.registerComponent(ProductFeatures, {
  name: "Product Features",
  inputs: [
    {
      name: "features",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "icon",
          type: "string",
        },
      ],
    },
  ],
});

// Register Gallery Component
Builder.registerComponent(Gallery, {
  name: "Product Gallery",
  inputs: [
    {
      name: "images",
      type: "list",
      subFields: [
        {
          name: "url",
          type: "string",
          required: true,
        },
        {
          name: "alt",
          type: "string",
        },
      ],
    },
  ],
});

// Register BuyNowButton Component
Builder.registerComponent(BuyNowButton, {
  name: "Buy Now Button",
  inputs: [
    {
      name: "variantId",
      type: "string",
      required: true,
    },
    {
      name: "price",
      type: "string",
      required: true,
    },
  ],
});

// Register EstimatedShipping Component
Builder.registerComponent(EstimatedShipping, {
  name: "Estimated Shipping",
  inputs: [
    {
      name: "deliveryDate",
      type: "string",
      required: true,
    },
  ],
});

// Register ProductVideoFeature Component
Builder.registerComponent(ProductVideoFeature, {
  name: "Product Video Feature",
  inputs: [
    {
      name: "videoUrl",
      type: "string",
      required: true,
    },
    {
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "description",
      type: "string",
    },
  ],
});

// Register Footer Component
Builder.registerComponent(Footer, {
  name: "Footer",
  inputs: [
    {
      name: "menu",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "items",
          type: "list",
          subFields: [
            {
              name: "title",
              type: "string",
            },
            {
              name: "url",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
});

// Register FooterMenu Component
Builder.registerComponent(FooterMenu, {
  name: "Footer Menu",
  inputs: [
    {
      name: "title",
      type: "string",
      required: true,
    },
    {
      name: "items",
      type: "list",
      subFields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "url",
          type: "string",
        },
      ],
    },
  ],
});

// Register PaymentIcons Component
Builder.registerComponent(PaymentIcons, {
  name: "Payment Icons",
  inputs: [
    {
      name: "icons",
      type: "list",
      subFields: [
        {
          name: "name",
          type: "string",
        },
        {
          name: "icon",
          type: "string",
        },
      ],
    },
  ],
});
