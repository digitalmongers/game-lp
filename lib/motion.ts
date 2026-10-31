import type { SpringOptions } from "motion/react";

/**
 * Shared spring physics for scroll-linked `useScroll` -> `useSpring` -> `useTransform`
 * pipelines across all landing sections. Smooths discrete mouse-wheel ticks while
 * staying responsive with zero sluggishness.
 */
export const SMOOTH_SCROLL_SPRING: SpringOptions = {
  stiffness: 100,
  damping: 28,
  mass: 0.4,
  restDelta: 0.001,
};

