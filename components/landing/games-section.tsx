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
import { Card } from "@/components/ui/card";
import { JoinCommunityDialog } from "@/components/landing/join-community-dialog";
import { SMOOTH_SCROLL_SPRING } from "@/lib/motion";

interface GameItem {
  id: string;
  title: string;
  image: string;
  statusText: string;
  dotColor: "online" | "offline";
}

const ROW_1_GAMES: GameItem[] = [
  {
    id: "game-1",
    title: "Call of Duty: Black Ops III",
    image: "/images/game-1-cod.png",
    statusText: "28 Streaming",
    dotColor: "online",
  },
  {
    id: "game-2",
    title: "PlayerUnknown's Battlegrounds Mobile",
    image: "/images/game-2-pubg.png",
    statusText: "365 Streaming",
    dotColor: "online",
  },
  {
    id: "game-3",
    title: "Fortnite",
    image: "/images/game-3-fortnite.png",
    statusText: "12 Streaming",
    dotColor: "online",
  },
];

const ROW_2_GAMES: GameItem[] = [
  {
    id: "game-4",
    title: "Among Us",
    image: "/images/game-4-amongus.png",
    statusText: "No Streams",
    dotColor: "online", // Exact Figma node 301:118 fill is #00ff85
  },
  {
    id: "game-5",
    title: "Red Dead Redemption II",
    image: "/images/game-5-rdr2.png",
    statusText: "No Streams",
    dotColor: "offline", // Exact Figma node 301:117 fill is #ff0000
  },
  {
    id: "game-6",
    title: "Grand Theft Auto V",
    image: "/images/game-6-gtav.png",
    statusText: "82 Streaming",
    dotColor: "online", // Exact Figma node 301:116 fill is #00ff85
  },
];

function GameShowcaseCard({ game }: { game: GameItem }) {
  return (
    <JoinCommunityDialog
      defaultHeading={`${game.title} Lobbies`}
      defaultDescription={`Connect with Gruxz players in ${game.title} (${game.statusText}).`}
    >
      <Card className="group relative aspect-[351/415] w-full lg:w-[351px] lg:h-[415px] lg:aspect-auto shrink-0 rounded-[20px] bg-[#161616] cursor-pointer transition-transform duration-300 hover:-translate-y-1">
        <Image
          src={game.image}
          alt={game.title}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 351px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />

        {/* Frosted Glass Bottom Bar (301:105..301:120: h=72px, bg rgba(255,255,255,0.1), backdrop-blur 20px) */}
        <div className="absolute inset-x-0 bottom-0 flex h-16 sm:h-[72px] items-center justify-between rounded-b-[20px] bg-white/10 backdrop-blur-[20px] pl-[23px] pr-[35px]">
          <span className="font-sans text-lg sm:text-[20px] sm:leading-[27.9px] font-normal tracking-[-0.04em] text-[#dad7d7]">
            {game.statusText}
          </span>
          <span
            aria-label={game.dotColor === "online" ? "Online" : "Offline"}
            className={`h-[11px] w-[11px] shrink-0 rounded-full ${
              game.dotColor === "online" ? "bg-[#00ff85]" : "bg-[#ff0000]"
            }`}
          />
        </div>
      </Card>
    </JoinCommunityDialog>
  );
}

function MobileAnimatedGameCard({ game }: { game: GameItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 95%", "start 60%"],
  });

  const smoothCardProgress = useSpring(scrollYProgress, SMOOTH_SCROLL_SPRING);

  const y = useTransform(
    smoothCardProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [36, 0]
  );
  const scale = useTransform(
    smoothCardProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0.96, 1]
  );
  const opacity = useTransform(
    smoothCardProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0.18, 1]
  );

  return (
    <div ref={cardRef} className="relative">
      <motion.div
        style={{ y, scale, opacity }}
        className="will-change-transform"
      >
        <GameShowcaseCard game={game} />
      </motion.div>
    </div>
  );
}

export function GamesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const allGames = [...ROW_1_GAMES, ...ROW_2_GAMES];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, SMOOTH_SCROLL_SPRING);

  const glowY = useTransform(
    smoothProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [80, -80]
  );
  const glowScale = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    shouldReduceMotion ? [1, 1, 1] : [0.85, 1.08, 0.9]
  );

  const headingY = useTransform(
    smoothProgress,
    [0.04, 0.28, 0.78, 0.98],
    shouldReduceMotion ? [0, 0, 0, 0] : [60, 0, 0, -45]
  );
  const headingOpacity = useTransform(
    smoothProgress,
    [0.04, 0.24, 0.82, 0.98],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.25]
  );

  // Opposing horizontal scroll-linked glide for the 2 staggered desktop rows, settling cleanly at x=0
  const row1X = useTransform(
    smoothProgress,
    [0.08, 0.38, 0.68, 0.98],
    shouldReduceMotion ? [0, 0, 0, 0] : [90, 0, 0, -70]
  );
  const row1Opacity = useTransform(
    smoothProgress,
    [0.06, 0.28, 0.84, 0.98],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.3]
  );

  const row2X = useTransform(
    smoothProgress,
    [0.16, 0.46, 0.74, 0.98],
    shouldReduceMotion ? [0, 0, 0, 0] : [-90, 0, 0, 70]
  );
  const row2Opacity = useTransform(
    smoothProgress,
    [0.14, 0.36, 0.86, 0.98],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.3]
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pt-16 pb-16 sm:pt-24 sm:pb-24 lg:pt-[177px] lg:pb-[116px]"
    >
      {/* Violate Ellipse 2 (301:74: x=27, y=2814 -> 339px below section heading, 325x325, gradient #8f00ff->#ba62ff, blur) */}
      <motion.div
        aria-hidden="true"
        style={{ y: glowY, scale: glowScale }}
        className="pointer-events-none absolute -left-16 top-72 h-[280px] w-[280px] lg:left-[calc(50%-613px)] lg:top-[516px] lg:h-[325px] lg:w-[325px] rounded-full bg-gradient-to-br from-[#8f00ff] to-[#ba62ff] opacity-55 blur-[130px] lg:blur-[160px] will-change-transform"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1280px]">
        <div className="px-5 sm:px-8">
          <motion.h2
            style={{ y: headingY, opacity: headingOpacity }}
            className="mx-auto max-w-[850px] text-center font-heading text-4xl leading-[1.02] sm:text-5xl md:text-6xl lg:text-[80px] lg:leading-[80px] font-bold uppercase tracking-[-0.04em] text-white will-change-transform"
          >
            Try your hands on
          </motion.h2>
        </div>

        {/* Mobile & Tablet Fluid Grid (< lg) */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 px-5 sm:px-8 lg:hidden">
          {allGames.map((game) => (
            <MobileAnimatedGameCard key={game.id} game={game} />
          ))}
        </div>

        {/* Exact Figma Staggered 2-Row Bleeding Layout on Desktop (lg+) */}
        <div className="hidden lg:mt-[78px] lg:flex lg:flex-col lg:gap-[40px]">
          {/* Row 1: x=287, x=678, x=1069 (40px gap) */}
          <motion.div
            style={{ x: row1X, opacity: row1Opacity }}
            className="flex items-start gap-[40px] lg:pl-[140px] xl:pl-[287px] will-change-transform"
          >
            {ROW_1_GAMES.map((game) => (
              <GameShowcaseCard key={game.id} game={game} />
            ))}
          </motion.div>

          {/* Row 2: x=-102, x=289, x=680 (40px gap) */}
          <motion.div
            style={{ x: row2X, opacity: row2Opacity }}
            className="flex items-start gap-[40px] lg:-ml-[160px] xl:-ml-[102px] will-change-transform"
          >
            {ROW_2_GAMES.map((game) => (
              <GameShowcaseCard key={game.id} game={game} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
