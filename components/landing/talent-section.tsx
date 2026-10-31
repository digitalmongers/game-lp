"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { JoinCommunityDialog } from "@/components/landing/join-community-dialog";
import { SMOOTH_SCROLL_SPRING } from "@/lib/motion";

const FEATURE_BADGES = [
  {
    id: "play",
    label: "Play",
    icon: "/icons/icon-play-game.svg",
    desktopTop: "lg:top-[280px]",
  },
  {
    id: "record",
    label: "Record",
    icon: "/icons/icon-record.svg",
    desktopTop: "lg:top-[384px]",
  },
  {
    id: "share",
    label: "Share",
    icon: "/icons/icon-share.svg",
    desktopTop: "lg:top-[488px]",
  },
] as const;

export function TalentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track section continuously from entering bottom of viewport ("start end") to exiting top ("end start")
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, SMOOTH_SCROLL_SPRING);

  // Ambient glow slow drift
  const glowY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [90, -90]
  );
  const glowScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1, 1, 1] : [0.85, 1.06, 0.9]
  );

  // PLAY RECORD SHARE top-right heading parallax & settle into exact Figma slot
  const playHeadingY = useTransform(
    smoothProgress,
    [0, 0.34, 0.68, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [75, 0, 0, -55]
  );
  const playHeadingOpacity = useTransform(
    smoothProgress,
    [0.04, 0.26, 0.78, 0.98],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.2]
  );

  // Center controller showcase artwork parallax & scale
  const controllerY = useTransform(
    smoothProgress,
    [0, 0.38, 0.7, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [55, 0, 0, -40]
  );
  const controllerScale = useTransform(
    smoothProgress,
    [0.05, 0.38, 0.74, 1],
    shouldReduceMotion ? [1, 1, 1, 1] : [0.92, 1, 1, 0.96]
  );
  const controllerOpacity = useTransform(
    smoothProgress,
    [0.05, 0.28, 0.82, 0.98],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.25]
  );

  // Staggered 3 radial-gradient floating badges
  const badge0Y = useTransform(
    smoothProgress,
    [0.1, 0.4, 0.72, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [45, 0, 0, -35]
  );
  const badge1Y = useTransform(
    smoothProgress,
    [0.15, 0.44, 0.74, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [55, 0, 0, -30]
  );
  const badge2Y = useTransform(
    smoothProgress,
    [0.2, 0.48, 0.76, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [65, 0, 0, -25]
  );
  const badgesScale = useTransform(
    smoothProgress,
    [0.12, 0.44, 0.78, 1],
    shouldReduceMotion ? [1, 1, 1, 1] : [0.8, 1, 1, 0.92]
  );
  const badgesOpacity = useTransform(
    smoothProgress,
    [0.1, 0.36, 0.84, 0.98],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.25]
  );
  const badgeYList = [badge0Y, badge1Y, badge2Y];

  // Bottom-left SHOW YOUR TALENT + body copy + Start Streaming CTA
  const talentHeadingY = useTransform(
    smoothProgress,
    [0.16, 0.46, 0.74, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [70, 0, 0, -50]
  );
  const talentCopyY = useTransform(
    smoothProgress,
    [0.22, 0.52, 0.78, 1],
    shouldReduceMotion ? [0, 0, 0, 0] : [50, 0, 0, -35]
  );
  const talentOpacity = useTransform(
    smoothProgress,
    [0.16, 0.42, 0.84, 0.98],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.25]
  );

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative z-20 w-full py-14 sm:py-20 lg:pt-[35px] lg:pb-[99px]"
    >
      {/* Ambient Violet Ellipse 1 (301:36: x=394, y=783, w=1239, h=891, rgba(186,98,255,0.1), blur 176px) */}
      <motion.div
        aria-hidden="true"
        style={{ y: glowY, scale: glowScale }}
        className="pointer-events-none absolute left-1/4 top-6 h-[420px] w-[520px] sm:h-[640px] sm:w-[880px] lg:left-[calc(50%-246px)] lg:top-[58px] lg:h-[891px] lg:w-[1239px] rounded-full bg-[#ba62ff]/[0.09] blur-[120px] lg:blur-[176px] will-change-transform"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-0">
        {/*
          Mobile-first stacked layout (< lg) -> Exact 863x749 Figma overlapping composition on lg+/xl+
          In 1280px Figma frame, Group 302:4 starts at x=242, y=760, w=863, h=749.
        */}
        <div className="flex flex-col gap-10 lg:block lg:relative lg:w-[863px] lg:h-[749px] lg:mx-auto xl:ml-[242px] xl:mr-auto">
          {/* PLAY RECORD SHARE Heading (301:51: x=768 -> rel left 526px, top 0, w=337px) */}
          <motion.h2
            style={{ y: playHeadingY, opacity: playHeadingOpacity }}
            className="order-1 self-end text-right sm:text-left lg:order-none lg:absolute lg:left-[526px] lg:top-0 lg:w-[337px] lg:z-20 font-heading text-4xl leading-[0.98] sm:text-6xl md:text-7xl lg:text-[80px] lg:leading-[80px] font-bold uppercase tracking-[-0.04em] text-white will-change-transform"
          >
            <span className="block">Play</span>
            <span className="block">record</span>
            <span className="block">share</span>
          </motion.h2>

          {/* Controller Showcase Image + Floating Action Badges */}
          <div className="order-2 relative mx-auto w-full max-w-[543px] lg:order-none lg:mx-0 lg:static">
            <motion.div
              style={{
                y: controllerY,
                scale: controllerScale,
                opacity: controllerOpacity,
              }}
              className="relative aspect-[543/493] w-full lg:absolute lg:left-[127px] lg:top-[42px] lg:w-[543px] lg:h-[493px] will-change-transform"
            >
              <Image
                src="/images/controller-showcase.png"
                alt="Wireless gaming controller on vibrant violet backdrop"
                fill
                sizes="(max-width: 640px) 92vw, 543px"
                className="object-cover"
              />
            </motion.div>

            {/* 3 Radial-Gradient Circular Badges (74x74px on desktop, centered right on image edge x=633..707) */}
            <div className="mt-4 flex items-center justify-end gap-4 sm:mt-0 sm:absolute sm:-right-5 sm:bottom-6 sm:flex-col sm:gap-5 lg:static lg:m-0">
              {FEATURE_BADGES.map((badge, idx) => (
                <motion.div
                  key={badge.id}
                  title={badge.label}
                  style={{
                    y: badgeYList[idx],
                    scale: badgesScale,
                    opacity: badgesOpacity,
                  }}
                  className={`flex h-14 w-14 sm:h-16 sm:w-16 lg:h-[74px] lg:w-[74px] items-center justify-center rounded-full bg-gruxz-badge-radial lg:absolute lg:left-[633px] ${badge.desktopTop} lg:z-20 transition-shadow duration-200 hover:brightness-110 will-change-transform`}
                >
                  <Image
                    src={badge.icon}
                    alt={badge.label}
                    width={40}
                    height={40}
                    className="block h-7 w-7 sm:h-8 sm:w-8 lg:h-[40px] lg:w-[40px] shrink-0"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* SHOW YOUR TALENT Block (302:3: rel left 0, top 369px) */}
          <div className="order-3 flex flex-col items-start lg:order-none lg:static">
            <motion.h2
              style={{ y: talentHeadingY, opacity: talentOpacity }}
              className="-mt-6 sm:-mt-10 lg:mt-0 relative z-20 lg:absolute lg:left-0 lg:top-[369px] lg:w-[339px] font-heading text-4xl leading-[0.98] sm:text-6xl md:text-7xl lg:text-[80px] lg:leading-[80px] font-bold uppercase tracking-[-0.04em] text-white will-change-transform"
            >
              <span className="block">Show</span>
              <span className="block">your</span>
              <span className="block">talent</span>
            </motion.h2>

            <motion.p
              style={{ y: talentCopyY, opacity: talentOpacity }}
              className="mt-5 lg:mt-0 max-w-[373px] lg:absolute lg:left-[15px] lg:top-[617px] lg:w-[373px] font-sans text-base leading-[1.45] sm:text-lg lg:text-[20px] lg:leading-[27.9px] font-normal tracking-[-0.04em] text-[#dad7d7] will-change-transform"
            >
              Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec
              rutrum congue leo eget malesuada. Vivamus magna justo.
            </motion.p>

            <motion.div
              style={{ y: talentCopyY, opacity: talentOpacity }}
              className="mt-5 lg:mt-0 lg:absolute lg:left-[15px] lg:top-[721px] will-change-transform"
            >
              <JoinCommunityDialog
                defaultHeading="Start Streaming on Gruxz"
                defaultDescription="Set up your ultra-low-latency creator channel and broadcast your best plays to the community."
              >
                <button
                  type="button"
                  className="group inline-flex min-h-11 lg:min-h-0 items-center gap-[9px] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f00ff]"
                >
                  <span className="font-heading text-lg sm:text-[20px] sm:leading-[27.9px] font-bold tracking-[-0.04em] text-white transition-colors group-hover:text-[#ba62ff]">
                    Start Streaming
                  </span>
                  <Image
                    src="/icons/cta-arrow-right.svg"
                    alt=""
                    width={30}
                    height={15}
                    className="block shrink-0 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </button>
              </JoinCommunityDialog>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
