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

export function CommunityCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Bottom-of-page section settles cleanly as its bottom reaches the viewport bottom ("end end")
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, SMOOTH_SCROLL_SPRING);

  const bgY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["-12%", "4%"]
  );
  const bgScale = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [1.14, 1.02]
  );
  const bgOpacity = useTransform(
    smoothProgress,
    [0, 0.65],
    shouldReduceMotion ? [1, 1] : [0.4, 1]
  );

  const headingY = useTransform(
    smoothProgress,
    [0.12, 0.72],
    shouldReduceMotion ? [0, 0] : [65, 0]
  );
  const headingScale = useTransform(
    smoothProgress,
    [0.12, 0.72],
    shouldReduceMotion ? [1, 1] : [0.93, 1]
  );
  const headingOpacity = useTransform(
    smoothProgress,
    [0.1, 0.62],
    shouldReduceMotion ? [1, 1] : [0, 1]
  );

  const ctaY = useTransform(
    smoothProgress,
    [0.22, 0.8],
    shouldReduceMotion ? [0, 0] : [45, 0]
  );
  const ctaOpacity = useTransform(
    smoothProgress,
    [0.2, 0.72],
    shouldReduceMotion ? [1, 1] : [0, 1]
  );

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative w-full overflow-hidden min-h-[480px] sm:min-h-[620px] lg:h-[866px] lg:mb-[27px]"
    >
      {/* Background Arcade Machines Image (301:123: 1280x866) */}
      <motion.div
        style={{ y: bgY, scale: bgScale, opacity: bgOpacity }}
        className="pointer-events-none absolute inset-0 will-change-transform"
      >
        <Image
          src="/images/section6-bg.png"
          alt="Neon arcade machines inside gaming lounge"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Top Black Liner Gradient Overlay (301:124: h=796px) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 sm:h-80 lg:h-[796px] bg-gruxz-fade-top"
      />

      {/* Bottom Black Liner Gradient Overlay (301:125: h=630px) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 sm:h-80 lg:h-[630px] bg-gruxz-fade-bottom"
      />

      {/* Foreground Content (Heading at y=4590 -> 339px from top of 866px section) */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1280px] flex-col items-center px-5 py-28 sm:px-8 sm:py-36 lg:pt-[339px] lg:pb-[262px]">
        <motion.h2
          style={{
            y: headingY,
            scale: headingScale,
            opacity: headingOpacity,
          }}
          className="max-w-[880px] text-center font-heading text-4xl leading-[1.02] sm:text-5xl md:text-6xl lg:text-[80px] lg:leading-[80px] font-bold uppercase tracking-[-0.04em] text-white will-change-transform"
        >
          Become a part of the community
        </motion.h2>

        <motion.div
          style={{ y: ctaY, opacity: ctaOpacity }}
          className="mt-8 sm:mt-11 lg:mt-[60px] will-change-transform"
        >
          <JoinCommunityDialog>
            <Button
              size="compact"
              className="h-[45px] min-w-[125px] px-[21px] py-[9px]"
            >
              Join now
            </Button>
          </JoinCommunityDialog>
        </motion.div>
      </div>
    </section>
  );
}
