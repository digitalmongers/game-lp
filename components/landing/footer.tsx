"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { SMOOTH_SCROLL_SPRING } from "@/lib/motion";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, SMOOTH_SCROLL_SPRING);

  const contentY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [22, 0]
  );
  const contentOpacity = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0.15, 1]
  );

  return (
    <footer
      ref={footerRef}
      className="relative z-10 w-full overflow-hidden border-t border-black bg-[#101010]"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="mx-auto flex w-full max-w-[1280px] flex-col items-center justify-between gap-4 px-5 py-8 md:flex-row md:flex-wrap md:px-8 lg:h-[110px] lg:flex-nowrap lg:px-[90px] lg:py-0 will-change-transform"
      >
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 sm:gap-[42px]">
          <Button
            variant="link"
            asChild
            className="h-auto p-0 font-heading text-base sm:text-[18px] sm:leading-[25.11px] font-bold tracking-[-0.04em] text-[#9f9f9f] transition-colors hover:text-white hover:no-underline"
          >
            <Link href="#privacy">Privacy Policy</Link>
          </Button>
          <Button
            variant="link"
            asChild
            className="h-auto p-0 font-heading text-base sm:text-[18px] sm:leading-[25.11px] font-bold tracking-[-0.04em] text-[#9f9f9f] transition-colors hover:text-white hover:no-underline"
          >
            <Link href="#terms">Term &amp; Conditions</Link>
          </Button>
        </div>

        <p className="text-center font-heading text-base sm:text-[18px] sm:leading-[25.11px] font-bold tracking-[-0.04em] text-[#9f9f9f]">
          Developed by{" "}
          <Button
            variant="link"
            asChild
            className="h-auto p-0 font-heading text-base sm:text-[18px] sm:leading-[25.11px] font-bold tracking-[-0.04em] text-white transition-colors hover:text-[#ba62ff] hover:no-underline"
          >
            <a
              href="https://digitalmongers.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Digital Mongers Softech
            </a>
          </Button>
        </p>

        <p className="font-heading text-base sm:text-[18px] sm:leading-[25.11px] font-bold tracking-[-0.04em] text-[#9f9f9f]">
          Copyright © <span className="text-white">Grux</span>
        </p>
      </motion.div>
    </footer>
  );
}
