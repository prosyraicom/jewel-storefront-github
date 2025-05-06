// components/builder.tsx
"use client";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import { BuilderContent, builder } from "@builder.io/sdk";
import DefaultErrorPage from "next/error";

interface BuilderPageProps {
  content?: BuilderContent;
}

// Replace with your Public API Key
builder.init("37669eee2ec640c594c8f88af4112c59");

export function RenderBuilderContent({ content }: BuilderPageProps) {
  const isPreviewing = useIsPreviewing();

  if (content || isPreviewing) {
    return <BuilderComponent content={content} model="page" />;
  }

  return <DefaultErrorPage statusCode={404} />;
}
