import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import { headers } from "next/headers";
import { connection } from "next/server";
import { Header } from "@/components/landing/header";
import { HeroSection } from "@/components/landing/hero-section";
import { TalentSection } from "@/components/landing/talent-section";
import { FriendsBannerSection } from "@/components/landing/friends-banner-section";
import { GamesSection } from "@/components/landing/games-section";
import { StreamsSection } from "@/components/landing/streams-section";
import { CommunityCtaSection } from "@/components/landing/community-cta-section";
import { Footer } from "@/components/landing/footer";
import {
  SITE_CONFIG,
  resolveDynamicPageSeo,
  resolveSiteBaseUrl,
} from "@/lib/seo";

type HomeSearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function generateMetadata(
  { searchParams }: { searchParams: HomeSearchParams },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const [resolvedParams, reqHeaders, parentMetadata] = await Promise.all([
    searchParams,
    headers(),
    parent,
  ]);

  const baseUrl = resolveSiteBaseUrl(
    reqHeaders.get("x-forwarded-host") ?? reqHeaders.get("host"),
    reqHeaders.get("x-forwarded-proto")
  );
  const seo = resolveDynamicPageSeo(resolvedParams, baseUrl);
  const socialTitle = seo.isDefaultTitle
    ? SITE_CONFIG.defaultTitle
    : `${seo.title} | ${SITE_CONFIG.name}`;

  const inheritedOgImages = parentMetadata.openGraph?.images ?? [];

  return {
    title: seo.isDefaultTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: seo.canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      siteName: SITE_CONFIG.name,
      url: seo.canonicalUrl,
      title: socialTitle,
      description: seo.description,
      images: [
        {
          url: seo.ogImageUrl,
          width: 1200,
          height: 630,
          alt: seo.ogImageAlt,
          type: "image/png",
        },
        {
          url: seo.fallbackImageUrl,
          width: 1280,
          height: 720,
          alt: seo.ogImageAlt,
        },
        ...inheritedOgImages,
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: socialTitle,
      description: seo.description,
      images: [seo.ogImageUrl],
    },
  };
}

async function DynamicStructuredData({
  searchParams,
}: {
  searchParams: HomeSearchParams;
}) {
  await connection();
  const [resolvedParams, reqHeaders] = await Promise.all([
    searchParams,
    headers(),
  ]);
  const baseUrl = resolveSiteBaseUrl(
    reqHeaders.get("x-forwarded-host") ?? reqHeaders.get("host"),
    reqHeaders.get("x-forwarded-proto")
  );
  const seo = resolveDynamicPageSeo(resolvedParams, baseUrl);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(seo.jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export default function HomePage({
  searchParams,
}: {
  searchParams: HomeSearchParams;
}) {
  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#101010] text-white">
      <Header />
      <main>
        <HeroSection />
        <TalentSection />
        <FriendsBannerSection />
        <GamesSection />
        <StreamsSection />
        <CommunityCtaSection />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <DynamicStructuredData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
