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
import { StreamPlayerDialog } from "@/components/landing/join-community-dialog";
import { SMOOTH_SCROLL_SPRING } from "@/lib/motion";

export function StreamsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, SMOOTH_SCROLL_SPRING);

  const glowY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [75, -75]
  );
  const glowScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1, 1, 1] : [0.88, 1.06, 0.92]
  );

  // Differential depth parallax between foreground overlapping heading & stream video player
  const headingY = useTransform(
    smoothProgress,
    [0.06, 0.36, 0.72, 0.96],
    shouldReduceMotion ? [0, 0, 0, 0] : [65, 0, 0, -55]
  );
  const headingOpacity = useTransform(
    smoothProgress,
    [0.06, 0.3, 0.8, 0.96],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.2]
  );

  const playerY = useTransform(
    smoothProgress,
    [0.1, 0.42, 0.74, 0.98],
    shouldReduceMotion ? [0, 0, 0, 0] : [85, 0, 0, -35]
  );
  const playerScale = useTransform(
    smoothProgress,
    [0.1, 0.42, 0.76, 0.98],
    shouldReduceMotion ? [1, 1, 1, 1] : [0.92, 1, 1, 0.96]
  );
  const playerOpacity = useTransform(
    smoothProgress,
    [0.1, 0.36, 0.84, 0.98],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.25]
  );

  const playButtonScale = useTransform(
    smoothProgress,
    [0.18, 0.45, 0.85],
    shouldReduceMotion ? [1, 1, 1] : [0.84, 1, 1.04]
  );

  return (
    <section
      ref={sectionRef}
      id="streams"
      className="relative z-20 w-full py-14 sm:py-20 lg:pt-[116px] lg:pb-[21px]"
    >
      {/* Violate Ellipse 3 (301:126: x=920, y=3989, w=325, h=325, gradient #8f00ff->#ba62ff, blur) */}
      <motion.div
        aria-hidden="true"
        style={{ y: glowY, scale: glowScale }}
        className="pointer-events-none absolute -right-12 bottom-0 h-[260px] w-[260px] lg:left-[calc(50%+280px)] lg:top-[254px] lg:h-[325px] lg:w-[325px] rounded-full bg-gradient-to-br from-[#8f00ff] to-[#ba62ff] opacity-55 blur-[130px] lg:blur-[160px] will-change-transform"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-0">
        {/*
          In 1280px Figma frame:
          Group 302:18 starts at x=257, y=3735, w=785, h=495.
          Heading (301:129) is at x=257, y=3735, w=615, h=160.
          Thumbnail (301:128) is at x=323 (+66px), y=3795 (+60px -> 100px overlap), w=719, h=413.
        */}
        <div className="mx-auto w-full max-w-[785px] xl:ml-[257px] xl:mr-auto">
          <motion.h2
            style={{ y: headingY, opacity: headingOpacity }}
            className="relative z-20 max-w-[615px] font-heading text-4xl leading-[0.98] sm:text-6xl md:text-7xl lg:text-[80px] lg:leading-[80px] font-bold uppercase tracking-[-0.04em] text-white will-change-transform"
          >
            Watch top pick streams
          </motion.h2>

          {/* Video Player Thumbnail Wrapper */}
          <motion.div
            style={{
              y: playerY,
              scale: playerScale,
              opacity: playerOpacity,
            }}
            className="relative -mt-3 sm:-mt-8 lg:-mt-[100px] lg:ml-[66px] w-full lg:w-[719px] will-change-transform"
          >
            {/* Ambient Violet Shadow Behind Video (301:127: 742x435 #ba62ff blurred) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 rounded-xl bg-[#ba62ff]/20 blur-[90px]"
            />

            <div className="relative aspect-[719/413] w-full lg:h-[413px] lg:aspect-auto overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
              <Image
                src="/images/stream-thumbnail.png"
                alt="Top pick esports stream player competing on stage"
                fill
                sizes="(max-width: 768px) 92vw, 719px"
                className="object-cover object-center"
              />
              {/* Exact Figma rgba(0, 0, 0, 0.5) overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Center Play Button (302:17: 108x78px, rounded-[10px], linear-gradient #8f00ff->#ba62ff) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  style={{ scale: playButtonScale }}
                  className="will-change-transform"
                >
                  <StreamPlayerDialog>
                    <Button
                      variant="play"
                      aria-label="Play top pick stream"
                      className="h-14 w-20 sm:h-[78px] sm:w-[108px] px-0 py-0 rounded-[10px] shadow-[0_8px_30px_rgba(143,0,255,0.45)]"
                    >
                      <Image
                        src="/icons/video-play.svg"
                        alt=""
                        width={46}
                        height={46}
                        className="block h-9 w-9 sm:h-[46px] sm:w-[46px] shrink-0"
                      />
                    </Button>
                  </StreamPlayerDialog>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
