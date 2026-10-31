import { ImageResponse } from "next/og";
import { connection, type NextRequest } from "next/server";
import { SITE_CONFIG } from "@/lib/seo";

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

function clampText(input: string | null, fallback: string, maxLen: number): string {
  const cleaned = input?.trim();
  if (!cleaned) return fallback;
  return cleaned.length > maxLen ? `${cleaned.slice(0, maxLen - 1)}…` : cleaned;
}

export async function GET(request: NextRequest) {
  // Opt into dynamic request-time rendering cleanly under Next.js 16 Cache Components
  await connection();

  const { searchParams } = request.nextUrl;

  const title = clampText(
    searchParams.get("title"),
    SITE_CONFIG.defaultHeadline,
    72
  );
  const subtitle = clampText(
    searchParams.get("subtitle"),
    "Meet, network, make new friends and play together",
    155
  );
  const badge = clampText(
    searchParams.get("badge"),
    SITE_CONFIG.defaultBadge,
    34
  );
  const status = searchParams.get("status") === "offline" ? "offline" : "online";
  const dotColor = status === "online" ? "#00ff85" : "#ff0000";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#101010",
          backgroundImage:
            "radial-gradient(circle at 86% 18%, rgba(143, 0, 255, 0.42) 0%, rgba(186, 98, 255, 0.14) 36%, rgba(16, 16, 16, 0) 68%), radial-gradient(circle at 12% 88%, rgba(143, 0, 255, 0.32) 0%, rgba(16, 16, 16, 0) 58%)",
          padding: "56px 68px",
          color: "#ffffff",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top Accent Gradient Bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            display: "flex",
            backgroundImage:
              "linear-gradient(90deg, #8f00ff 0%, #ba62ff 55%, #ffffff 100%)",
          }}
        />

        {/* Header Row: Gruxz Brand Wordmark + Live Status Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "4px",
                backgroundImage:
                  "linear-gradient(135deg, #8f00ff 0%, #ba62ff 100%)",
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "42px",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: "#ffffff",
              }}
            >
              Gruxz
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 22px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(186, 98, 255, 0.35)",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "999px",
                backgroundColor: dotColor,
                display: "flex",
              }}
            />
            <span
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#dad7d7",
                letterSpacing: "-0.02em",
              }}
            >
              {badge}
            </span>
          </div>
        </div>

        {/* Center Headline & Description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            maxWidth: "980px",
          }}
        >
          <div
            style={{
              fontSize: title.length > 42 ? "62px" : "74px",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "#ffffff",
              display: "flex",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: "27px",
              fontWeight: 400,
              lineHeight: 1.38,
              letterSpacing: "-0.02em",
              color: "#dad7d7",
              maxWidth: "860px",
              display: "flex",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom Feature Strip + CTA */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "26px",
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#ba62ff",
            }}
          >
            <span>Play</span>
            <span style={{ color: "rgba(255,255,255,0.28)" }}>•</span>
            <span>Record</span>
            <span style={{ color: "rgba(255,255,255,0.28)" }}>•</span>
            <span>Share</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 26px",
              backgroundImage:
                "linear-gradient(105deg, #8f00ff 0%, #ba62ff 100%)",
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            <span>Join Gruxz Community</span>
            <span>↗</span>
          </div>
        </div>
      </div>
    ),
    {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}

