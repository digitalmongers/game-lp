"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { JoinCommunityDialog } from "@/components/landing/join-community-dialog";
import { SMOOTH_SCROLL_SPRING } from "@/lib/motion";

const NAV_ITEMS = [
  { label: "Home", href: "#home", active: true },
  { label: "Streams", href: "#streams", active: false },
  { label: "Compitions", href: "#compitions", active: false },
  { label: "Pricing", href: "#pricing", active: false },
] as const;

export function Header() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY, scrollYProgress } = useScroll();

  const smoothScrollY = useSpring(scrollY, SMOOTH_SCROLL_SPRING);
  const smoothPageProgress = useSpring(scrollYProgress, SMOOTH_SCROLL_SPRING);

  // Transform scroll pixels (0 -> 140px) into glassmorphic header surface & compact border
  const headerBg = useTransform(
    smoothScrollY,
    [0, 140],
    ["rgba(16, 16, 16, 0)", "rgba(16, 16, 16, 0.84)"]
  );
  const headerBorderColor = useTransform(
    smoothScrollY,
    [0, 140],
    ["rgba(143, 0, 255, 0)", "rgba(143, 0, 255, 0.24)"]
  );
  const headerBackdrop = useTransform(
    smoothScrollY,
    [0, 140],
    ["blur(0px)", "blur(14px)"]
  );
  const headerY = useTransform(
    smoothScrollY,
    [0, 140],
    shouldReduceMotion ? [0, 0] : [0, -4]
  );

  return (
    <motion.header
      style={{
        backgroundColor: headerBg,
        borderBottomColor: headerBorderColor,
        backdropFilter: headerBackdrop,
        WebkitBackdropFilter: headerBackdrop,
        y: headerY,
      }}
      className="fixed inset-x-0 top-0 z-40 w-full border-b border-transparent will-change-transform"
    >
      {/* Continuous Page Scroll Progress Bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: smoothPageProgress }}
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left bg-gruxz-cta"
      />

      <div className="relative mx-auto flex w-full max-w-[1280px] items-center justify-between px-5 py-5 sm:px-8 sm:py-7 lg:h-[108px] lg:px-[89px] lg:py-[39px]">
        {/* Gruxz Gradient Wordmark Logo */}
        <Link
          href="#home"
          className="font-heading text-[26px] leading-[26px] sm:text-[30px] sm:leading-[30px] font-bold text-gruxz-logo transition-opacity hover:opacity-90"
        >
          Gruxz
        </Link>

        {/* Desktop Centered Navigation (Exact x=438..842 in 1280px frame) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex lg:items-center lg:gap-[48px] lg:absolute lg:left-1/2 lg:-translate-x-1/2"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`font-heading text-[18px] leading-[18px] font-bold tracking-[-0.04em] transition-colors ${
                item.active
                  ? "text-white"
                  : "text-[#9f9f9f] hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Staggered Hamburger Button + Mobile/Quick Slide-Out Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open navigation menu"
              className="inline-flex min-h-11 min-w-11 items-center justify-end cursor-pointer transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f00ff]"
            >
              <Image
                src="/icons/hamburger-menu.svg"
                alt=""
                width={20}
                height={12}
                className="block shrink-0"
                loading="lazy"
              />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="border-b border-white/10 pb-5">
              <SheetTitle className="font-heading text-[30px] leading-[30px] font-bold text-gruxz-logo w-fit">
                Gruxz
              </SheetTitle>
              <SheetDescription>
                A community for gamers by gamers
              </SheetDescription>
            </SheetHeader>

            <nav
              aria-label="Mobile Navigation"
              className="mt-8 flex flex-col gap-2"
            >
              {NAV_ITEMS.map((item) => (
                <SheetClose asChild key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex min-h-12 items-center px-3 font-heading text-xl font-bold tracking-[-0.04em] transition-colors ${
                      item.active
                        ? "text-white bg-white/[0.06] border-l-2 border-[#8f00ff]"
                        : "text-[#9f9f9f] hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            <div className="mt-auto border-t border-white/10 pt-6 flex flex-col gap-3">
              <JoinCommunityDialog>
                <Button className="w-full min-h-12 gap-2">
                  <span>Join now</span>
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
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
