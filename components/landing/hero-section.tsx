"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { JoinCommunityDialog } from "@/components/landing/join-community-dialog";
import { SMOOTH_SCROLL_SPRING } from "@/lib/motion";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progress as the hero moves from viewport top ("start start") to exiting top ("end start")
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, SMOOTH_SCROLL_SPRING);

  // Transform scroll position (0 -> 1) into multi-depth parallax, scale, and fade values
  const bgY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "22%"]
  );
  const bgScale = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 1.12]
  );
  const bgOpacity = useTransform(
    smoothProgress,
    [0, 0.85, 1],
    shouldReduceMotion ? [1, 1, 1] : [1, 0.55, 0.2]
  );

  const headingY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -90]
  );
  const headingScale = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1, 0.94]
  );
  const headingOpacity = useTransform(
    smoothProgress,
    [0, 0.68],
    shouldReduceMotion ? [1, 1] : [1, 0]
  );

  const subtextY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -65]
  );
  const subtextOpacity = useTransform(
    smoothProgress,
    [0, 0.58],
    shouldReduceMotion ? [1, 1] : [1, 0]
  );

  const ctaY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -40]
  );
  const ctaOpacity = useTransform(
    smoothProgress,
    [0, 0.52],
    shouldReduceMotion ? [1, 1] : [1, 0]
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-hidden min-h-[580px] sm:min-h-[650px] lg:h-[725px]"
    >
      {/* Hero Background Image with Scroll-Linked Parallax & Zoom (Exact Figma y=-144, h=864 on 1280px desktop) */}
      <motion.div
        style={{
          y: bgY,
          scale: bgScale,
          opacity: bgOpacity,
        }}
        className="pointer-events-none absolute inset-0 lg:inset-x-0 lg:-top-[144px] lg:h-[864px] will-change-transform"
      >
        <Image
          src="/images/hero-bg.png"
          alt="Gamers competing together at LAN battle stations"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Exact Figma rgba(16, 16, 16, 0.7) image fill overlay */}
        <div className="absolute inset-0 bg-[#101010]/70" />
      </motion.div>

      {/* Top Black Liner Gradient (301:34: y=-265, h=447 -> visible 0..182px) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 sm:h-44 lg:-top-[265px] lg:h-[447px] bg-gruxz-fade-top"
      />

      {/* Bottom Black Liner Gradient (301:35: y=217, h=508 -> ends y=725) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 sm:h-72 lg:h-[508px] bg-gruxz-fade-bottom"
      />

      {/* Foreground Content with Staggered Scroll-Transformed Depth */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 pt-32 pb-16 sm:px-8 sm:pt-40 sm:pb-24 lg:px-8 lg:pt-[208px] lg:pb-[146px]">
        <motion.h1
          style={{
            y: headingY,
            scale: headingScale,
            opacity: headingOpacity,
          }}
          className="max-w-[623px] text-center font-heading text-[38px] leading-[1.03] sm:text-5xl md:text-6xl lg:text-[70px] lg:leading-[70px] font-bold uppercase tracking-[-0.04em] text-white will-change-transform"
        >
          A Community{" "}
          <span className="block">For Gamers by Gamers</span>
        </motion.h1>

        <motion.p
          style={{
            y: subtextY,
            opacity: subtextOpacity,
          }}
          className="mt-4 lg:mt-[16px] max-w-[305px] text-center font-sans text-base leading-[1.4] sm:text-lg lg:text-[20px] lg:leading-[27.9px] font-normal tracking-[-0.04em] text-[#dad7d7] will-change-transform"
        >
          Meet, network, make new friends and play together
        </motion.p>

        {/* Hero CTAs (301:159: y=530, gap=26px) */}
        <motion.div
          style={{
            y: ctaY,
            opacity: ctaOpacity,
          }}
          className="mt-8 sm:mt-9 lg:mt-[40px] flex w-full max-w-[330px] flex-col sm:max-w-none sm:w-auto sm:flex-row items-center justify-center gap-4 sm:gap-[26px] will-change-transform"
        >
          <JoinCommunityDialog>
            <Button className="w-full sm:w-[154px] h-[49px] pl-[25px] pr-[19px] justify-between sm:justify-center gap-1.5">
              <span className="font-sans text-[20px] leading-[27.24px] font-semibold">
                Join now
              </span>
              <Image
                src="/icons/arrow-up-right.svg"
                alt=""
                width={28}
                height={28}
                className="block shrink-0"
                loading="eager"
              />
            </Button>
          </JoinCommunityDialog>

          <Button
            variant="outline"
            asChild
            className="w-full sm:w-[150px] h-[49px] px-[19px]"
          >
            <Link
              href="#how-it-works"
              className="font-heading text-[20px] leading-[20px] font-bold tracking-[-0.04em]"
            >
              How it works
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
