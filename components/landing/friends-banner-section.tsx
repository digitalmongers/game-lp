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
import { Button } from "@/components/ui/button";
import { JoinCommunityDialog } from "@/components/landing/join-community-dialog";
import { SMOOTH_SCROLL_SPRING } from "@/lib/motion";

export function FriendsBannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, SMOOTH_SCROLL_SPRING);

  const bgY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["-10%", "12%"]
  );
  const bgScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1, 1, 1] : [1.12, 1.04, 1.12]
  );
  const bgOpacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.78, 1],
    shouldReduceMotion ? [1, 1, 1, 1] : [0.45, 1, 1, 0.45]
  );

  const headingY = useTransform(
    smoothProgress,
    [0.08, 0.36, 0.68, 0.96],
    shouldReduceMotion ? [0, 0, 0, 0] : [65, 0, 0, -55]
  );
  const headingScale = useTransform(
    smoothProgress,
    [0.08, 0.36, 0.68, 0.96],
    shouldReduceMotion ? [1, 1, 1, 1] : [0.94, 1, 1, 0.96]
  );
  const headingOpacity = useTransform(
    smoothProgress,
    [0.08, 0.3, 0.74, 0.96],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.2]
  );

  const ctaY = useTransform(
    smoothProgress,
    [0.16, 0.42, 0.72, 0.96],
    shouldReduceMotion ? [0, 0, 0, 0] : [48, 0, 0, -35]
  );
  const ctaOpacity = useTransform(
    smoothProgress,
    [0.16, 0.36, 0.76, 0.96],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.2]
  );

  return (
    <section
      ref={sectionRef}
      id="compitions"
      className="relative w-full overflow-hidden min-h-[440px] sm:min-h-[540px] lg:h-[690px]"
    >
      {/* Background Image with Scroll Parallax (301:69: y=1630 -> top 22px, h=668) */}
      <motion.div
        style={{ y: bgY, scale: bgScale, opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 lg:top-[22px] will-change-transform"
      >
        <Image
          src="/images/section3-bg.png"
          alt="Retro gaming consoles and mechanical keyboards"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Top Black Liner Gradient (301:71: h=530) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-48 sm:h-64 lg:h-[530px] bg-gruxz-fade-top"
      />

      {/* Bottom Black Liner Gradient (301:70: h=614) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-52 sm:h-72 lg:h-[614px] bg-gruxz-fade-bottom"
      />

      {/* Centered Content (Heading at y=1823 -> 215px from top of 690px section) */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 py-24 sm:px-8 sm:py-32 lg:pt-[215px] lg:pb-[132px]">
        <motion.h2
          style={{
            y: headingY,
            scale: headingScale,
            opacity: headingOpacity,
          }}
          className="max-w-[749px] text-center font-heading text-4xl leading-[1.02] sm:text-5xl md:text-6xl lg:text-[80px] lg:leading-[80px] font-bold uppercase tracking-[-0.04em] text-white will-change-transform"
        >
          Make New friends and play with them
        </motion.h2>

        <motion.div
          style={{ y: ctaY, opacity: ctaOpacity }}
          className="mt-8 sm:mt-11 lg:mt-[60px] will-change-transform"
        >
          <JoinCommunityDialog
            defaultHeading="Join Gruxz Chatrooms"
            defaultDescription="Find teammates by rank, game mode, and region in active voice and text lobbies."
          >
            <Button
              size="compact"
              className="h-[45px] min-w-[187px] px-[19px] py-[9px]"
            >
              Join Chatrooms
            </Button>
          </JoinCommunityDialog>
        </motion.div>
      </div>
    </section>
  );
}
