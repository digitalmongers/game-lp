import type { Metadata, Viewport } from "next";
import { cacheLife } from "next/cache";
import { Josefin_Sans, Open_Sans } from "next/font/google";
import { SITE_CONFIG, resolveDynamicPageSeo, resolveSiteBaseUrl } from "@/lib/seo";
import "./globals.css";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: SITE_CONFIG.themeColor,
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  "use cache";
  cacheLife("hours");

  const baseUrl = resolveSiteBaseUrl();
  const defaultSeo = resolveDynamicPageSeo({}, baseUrl);

  return {
    metadataBase: baseUrl,
    title: {
      default: SITE_CONFIG.defaultTitle,
      template: SITE_CONFIG.titleTemplate,
    },
    description: SITE_CONFIG.defaultDescription,
    applicationName: SITE_CONFIG.name,
    keywords: [...SITE_CONFIG.keywords],
    authors: [{ name: SITE_CONFIG.creator, url: SITE_CONFIG.creatorUrl }],
    creator: SITE_CONFIG.creator,
    publisher: SITE_CONFIG.name,
    category: "gaming",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      url: defaultSeo.canonicalUrl,
      siteName: SITE_CONFIG.name,
      title: SITE_CONFIG.defaultTitle,
      description: SITE_CONFIG.defaultDescription,
      images: [
        {
          url: defaultSeo.ogImageUrl,
          width: 1200,
          height: 630,
          alt: defaultSeo.ogImageAlt,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_CONFIG.twitterHandle,
      creator: SITE_CONFIG.twitterHandle,
      title: SITE_CONFIG.defaultTitle,
      description: SITE_CONFIG.defaultDescription,
      images: [defaultSeo.ogImageUrl],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${josefinSans.variable} ${openSans.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-[#101010] text-white font-sans overflow-x-clip selection:bg-[#8f00ff] selection:text-white">
        {children}
      </body>
    </html>
  );
}
