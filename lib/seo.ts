export interface DynamicSeoPreset {
  slug: string;
  title: string;
  ogHeadline: string;
  description: string;
  badge: string;
  status: "online" | "offline";
  fallbackImage: string;
  keywords: string[];
}

export const SITE_CONFIG = {
  name: "Gruxz",
  defaultTitle: "Gruxz — A Community For Gamers by Gamers",
  titleTemplate: "%s | Gruxz",
  defaultHeadline: "A Community For Gamers by Gamers",
  defaultDescription:
    "Meet, network, make new friends and play together on Gruxz. Stream live gameplay, join active voice & text chatrooms, and squad up across top games.",
  defaultBadge: "487+ Live Streams",
  themeColor: "#8f00ff",
  backgroundColor: "#101010",
  locale: "en_US",
  creator: "Digital Mongers Softech",
  creatorUrl: "https://digitalmongers.com",
  twitterHandle: "@gruxzgaming",
  keywords: [
    "Gruxz",
    "gaming community",
    "for gamers by gamers",
    "live game streaming",
    "esports streams",
    "gaming chatrooms",
    "multiplayer lobbies",
    "play record share",
    "Call of Duty lobbies",
    "PUBG Mobile streams",
    "Fortnite community",
    "Grand Theft Auto V streams",
  ],
} as const;

export const GAME_SEO_PRESETS: Record<string, DynamicSeoPreset> = {
  cod: {
    slug: "cod",
    title: "Call of Duty: Black Ops III Lobbies & Live Streams",
    ogHeadline: "Call of Duty: Black Ops III Lobbies",
    description:
      "Squad up in Call of Duty: Black Ops III on Gruxz — watch 28 live streams, join ranked voice chatrooms, and play together.",
    badge: "28 Streaming",
    status: "online",
    fallbackImage: "/images/game-1-cod.png",
    keywords: ["Call of Duty Black Ops III", "COD lobbies", "COD live streams"],
  },
  pubg: {
    slug: "pubg",
    title: "PUBG Mobile Lobbies & Live Streams",
    ogHeadline: "PUBG Mobile Squad Lobbies",
    description:
      "Drop into PlayerUnknown's Battlegrounds Mobile with the Gruxz community — 365 live streams and active squad matchmaking.",
    badge: "365 Streaming",
    status: "online",
    fallbackImage: "/images/game-2-pubg.png",
    keywords: ["PUBG Mobile", "PUBG squad lobbies", "PUBG live streams"],
  },
  fortnite: {
    slug: "fortnite",
    title: "Fortnite Competitive Lobbies & Streams",
    ogHeadline: "Fortnite Community Lobbies",
    description:
      "Build, battle, and queue duos or squads in Fortnite on Gruxz with 12 live community creators streaming now.",
    badge: "12 Streaming",
    status: "online",
    fallbackImage: "/images/game-3-fortnite.png",
    keywords: ["Fortnite lobbies", "Fortnite live streams", "Fortnite duo finder"],
  },
  "among-us": {
    slug: "among-us",
    title: "Among Us Voice Chatrooms & Custom Lobbies",
    ogHeadline: "Among Us Custom Lobbies",
    description:
      "Host private voice-chat lobbies and play Among Us with new friends across the Gruxz gaming community.",
    badge: "Lobbies Open",
    status: "online",
    fallbackImage: "/images/game-4-amongus.png",
    keywords: ["Among Us lobbies", "Among Us voice chat", "party games"],
  },
  rdr2: {
    slug: "rdr2",
    title: "Red Dead Redemption II Posse & Community",
    ogHeadline: "Red Dead Redemption II Posse",
    description:
      "Form your frontier posse, share cinematic clips, and explore Red Dead Redemption II with fellow Gruxz players.",
    badge: "No Streams",
    status: "offline",
    fallbackImage: "/images/game-5-rdr2.png",
    keywords: ["Red Dead Redemption II", "RDR2 posse", "RDR2 community"],
  },
  gtav: {
    slug: "gtav",
    title: "Grand Theft Auto V RP & Heist Lobbies",
    ogHeadline: "Grand Theft Auto V Lobbies",
    description:
      "Join 82 live streamers, heist crews, and roleplay servers in Grand Theft Auto V on Gruxz.",
    badge: "82 Streaming",
    status: "online",
    fallbackImage: "/images/game-6-gtav.png",
    keywords: ["GTA V RP", "Grand Theft Auto V streams", "GTA heist crew"],
  },
};

const GAME_ALIAS_MAP: Record<string, string> = {
  "game-1": "cod",
  "game-2": "pubg",
  "game-3": "fortnite",
  "game-4": "among-us",
  "game-5": "rdr2",
  "game-6": "gtav",
  gta5: "gtav",
  amongus: "among-us",
};

export const SECTION_SEO_PRESETS: Record<string, DynamicSeoPreset> = {
  "how-it-works": {
    slug: "how-it-works",
    title: "Play, Record & Share — Show Your Talent",
    ogHeadline: "Play • Record • Share Your Talent",
    description:
      "Launch ultra-low-latency streams, record highlight reels, and share your best gaming moments with the Gruxz community.",
    badge: "Creator Studio",
    status: "online",
    fallbackImage: "/images/controller-showcase.png",
    keywords: ["game recording", "start streaming", "gaming clips"],
  },
  compitions: {
    slug: "compitions",
    title: "Community Chatrooms & Tournaments",
    ogHeadline: "Make New Friends & Play Together",
    description:
      "Find teammates by rank, game mode, and region in active Gruxz voice and text chatrooms and community competitions.",
    badge: "Active Chatrooms",
    status: "online",
    fallbackImage: "/images/section3-bg.png",
    keywords: ["gaming chatrooms", "esports tournaments", "find teammates"],
  },
  streams: {
    slug: "streams",
    title: "Watch Top Pick Esports & Creator Streams",
    ogHeadline: "Watch Top Pick Live Streams",
    description:
      "Tune into top pick competitive esports stages and creator broadcasts live in crisp HD on Gruxz.",
    badge: "Live Esports Stage",
    status: "online",
    fallbackImage: "/images/stream-thumbnail.png",
    keywords: ["watch esports streams", "top pick streams", "live gaming"],
  },
  pricing: {
    slug: "pricing",
    title: "Become a Part of the Gruxz Community",
    ogHeadline: "Become a Part of the Community",
    description:
      "Claim your free gamer tag on Gruxz and unlock instant access to community chatrooms, live streams, and multiplayer lobbies.",
    badge: "Free Community Access",
    status: "online",
    fallbackImage: "/images/section6-bg.png",
    keywords: ["join Gruxz", "free gaming community", "gamer membership"],
  },
};

const SECTION_ALIAS_MAP: Record<string, string> = {
  competitions: "compitions",
  chatrooms: "compitions",
  community: "pricing",
  join: "pricing",
};

/**
 * Resolves the canonical origin URL from incoming request headers or deployment environment variables.
 */
export function resolveSiteBaseUrl(
  hostHeader?: string | null,
  protoHeader?: string | null
): URL {
  if (hostHeader) {
    const cleanHost = hostHeader.split(",")[0].trim();
    const isLocal =
      cleanHost.startsWith("localhost") || cleanHost.startsWith("127.0.0.1");
    const proto = protoHeader
      ? protoHeader.split(",")[0].trim()
      : isLocal
        ? "http"
        : "https";
    try {
      return new URL(`${proto}://${cleanHost}`);
    } catch {
      // Fall through to env fallbacks
    }
  }

  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined);

  if (envUrl) {
    try {
      return new URL(envUrl.startsWith("http") ? envUrl : `https://${envUrl}`);
    } catch {
      // Fall through to localhost
    }
  }

  return new URL("http://localhost:3000");
}

function firstParam(value: string | string[] | undefined): string | undefined {
  if (typeof value === "string") return value.trim().toLowerCase();
  if (Array.isArray(value) && value.length > 0) {
    return value[0]?.trim().toLowerCase();
  }
  return undefined;
}

export interface ResolvedPageSeo {
  title: string;
  isDefaultTitle: boolean;
  description: string;
  canonicalUrl: string;
  ogImageUrl: string;
  fallbackImageUrl: string;
  ogImageAlt: string;
  keywords: string[];
  jsonLd: Record<string, unknown>;
}

/**
 * Computes dynamic page metadata, Open Graph / Twitter Card image URLs, canonical URLs,
 * and Schema.org JSON-LD structured data based on active URL query parameters.
 */
export function resolveDynamicPageSeo(
  rawSearchParams: Record<string, string | string[] | undefined>,
  baseUrl: URL
): ResolvedPageSeo {
  const rawGame = firstParam(rawSearchParams.game);
  const rawSection = firstParam(rawSearchParams.section);
  const rawInvite = firstParam(rawSearchParams.invite);

  const normalizedGameKey = rawGame
    ? (GAME_ALIAS_MAP[rawGame] ?? rawGame)
    : undefined;
  const normalizedSectionKey = rawSection
    ? (SECTION_ALIAS_MAP[rawSection] ?? rawSection)
    : undefined;

  const activePreset =
    (normalizedGameKey ? GAME_SEO_PRESETS[normalizedGameKey] : undefined) ??
    (normalizedSectionKey
      ? SECTION_SEO_PRESETS[normalizedSectionKey]
      : undefined);

  const canonicalPath = normalizedGameKey && GAME_SEO_PRESETS[normalizedGameKey]
    ? `/?game=${GAME_SEO_PRESETS[normalizedGameKey].slug}`
    : normalizedSectionKey && SECTION_SEO_PRESETS[normalizedSectionKey]
      ? `/?section=${SECTION_SEO_PRESETS[normalizedSectionKey].slug}`
      : "/";

  const canonicalUrl = new URL(canonicalPath, baseUrl).toString();

  const headline =
    activePreset?.ogHeadline ??
    (rawInvite
      ? `You're Invited to Squad Up on Gruxz`
      : SITE_CONFIG.defaultHeadline);

  const description = activePreset?.description ?? SITE_CONFIG.defaultDescription;
  const badge =
    activePreset?.badge ??
    (rawInvite ? `Squad Invite • @${rawInvite.slice(0, 20)}` : SITE_CONFIG.defaultBadge);
  const status = activePreset?.status ?? "online";

  const ogParams = new URLSearchParams({
    title: headline,
    subtitle: description,
    badge,
    status,
  });

  const ogImageUrl = new URL(`/api/og?${ogParams.toString()}`, baseUrl).toString();
  const fallbackImageUrl = new URL(
    activePreset?.fallbackImage ?? "/images/hero-bg.png",
    baseUrl
  ).toString();

  const keywords = activePreset
    ? [...SITE_CONFIG.keywords, ...activePreset.keywords]
    : [...SITE_CONFIG.keywords];

  const fullTitle = activePreset
    ? `${activePreset.title} | ${SITE_CONFIG.name}`
    : rawInvite
      ? `Squad Up with @${rawInvite.slice(0, 20)} | ${SITE_CONFIG.name}`
      : SITE_CONFIG.defaultTitle;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${ new URL("/", baseUrl).toString() }#website`,
        url: new URL("/", baseUrl).toString(),
        name: SITE_CONFIG.name,
        description: SITE_CONFIG.defaultDescription,
        inLanguage: "en-US",
        publisher: {
          "@id": `${ new URL("/", baseUrl).toString() }#organization`,
        },
      },
      {
        "@type": "Organization",
        "@id": `${ new URL("/", baseUrl).toString() }#organization`,
        name: SITE_CONFIG.name,
        url: new URL("/", baseUrl).toString(),
        logo: new URL("/api/og", baseUrl).toString(),
      },
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: fullTitle,
        description,
        isPartOf: {
          "@id": `${ new URL("/", baseUrl).toString() }#website`,
        },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: ogImageUrl,
          width: 1200,
          height: 630,
        },
      },
    ],
  };

  return {
    title: activePreset
      ? activePreset.title
      : rawInvite
        ? `Squad Up with @${rawInvite.slice(0, 20)}`
        : SITE_CONFIG.defaultTitle,
    isDefaultTitle: !activePreset && !rawInvite,
    description,
    canonicalUrl,
    ogImageUrl,
    fallbackImageUrl,
    ogImageAlt: `${headline} — ${SITE_CONFIG.name}`,
    keywords,
    jsonLd,
  };
}

