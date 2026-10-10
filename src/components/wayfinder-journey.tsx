"use client";

import { type ReactNode, useEffect, useRef } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

type WayfinderJourneyProps = {
  children: ReactNode;
  mascot: ReactNode;
};

export function WayfinderJourney({ children, mascot }: WayfinderJourneyProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const travelerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const traveler = travelerRef.current;
    const about = stage?.querySelector<HTMLElement>(".about-screen");
    const aiModel = stage?.querySelector<HTMLElement>(".ai-model-screen");
    const publicSolutions = stage?.querySelector<HTMLElement>(".dashboard-screen");
    const mobileApp = stage?.querySelector<HTMLElement>(".mobile-app-screen");
    const bot = traveler?.querySelector<HTMLElement>(".wayfinder-bot");
    if (!stage || !traveler || !about || !aiModel || !publicSolutions || !mobileApp || !bot) return;

    const sections = [about, aiModel, publicSolutions, mobileApp];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let listening = false;

    const update = () => {
      frame = 0;
      const stageRect = stage.getBoundingClientRect();
      const sectionRects = sections.map((section) => section.getBoundingClientRect());
      const sectionStyles = sections.map((section) => window.getComputedStyle(section));
      const botRect = bot.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const topInset = Math.max(28, Math.min(viewportHeight * 0.05, 62));
      const mobileTopInset = Math.max(100, Math.min(132, viewportHeight * 0.15));
      const bottomInset = sectionStyles.map((style) =>
        Math.max(16, Number.parseFloat(style.getPropertyValue("--wayfinder-safe-bottom")) || 0),
      );
      const paddingLeft = sectionStyles.map((style) => Number.parseFloat(style.paddingLeft) || 0);
      const paddingRight = sectionStyles.map((style) => Number.parseFloat(style.paddingRight) || 0);
      const sectionTops = sectionRects.map((rect) => window.scrollY + rect.top);
      const anchors = [
        {
          x: sectionRects[0].right - stageRect.left - paddingRight[0] - botRect.width,
          y: sectionRects[0].top - stageRect.top + topInset,
        },
        {
          x: sectionRects[1].left - stageRect.left + paddingLeft[1],
          y: sectionRects[1].bottom - stageRect.top - botRect.height - bottomInset[1],
        },
        {
          x: sectionRects[2].right - stageRect.left - paddingRight[2] - botRect.width,
          y: sectionRects[2].bottom - stageRect.top - botRect.height - bottomInset[2],
        },
        {
          x: sectionRects[3].left - stageRect.left + paddingLeft[3],
          y: sectionRects[3].top - stageRect.top + mobileTopInset,
        },
      ];

      let segment = 0;
      while (segment < anchors.length - 2 && window.scrollY >= sectionTops[segment + 1]) {
        segment += 1;
      }

      const sectionProgress = clamp(
        (window.scrollY - sectionTops[segment]) /
          Math.max(1, sectionTops[segment + 1] - sectionTops[segment]),
        0,
        1,
      );
      const progress = reducedMotion.matches
        ? 0
        : sectionProgress * sectionProgress * (3 - 2 * sectionProgress);
      const start = anchors[segment];
      const end = anchors[segment + 1];
      const x = start.x + (end.x - start.x) * progress;
      const y = start.y + (end.y - start.y) * progress;

      traveler.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      traveler.style.visibility = "visible";
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const attach = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      schedule();
    };

    const detach = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const visibilityObserver = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) attach();
          else detach();
        })
      : null;
    visibilityObserver?.observe(stage);

    const resizeObserver = "ResizeObserver" in window
      ? new ResizeObserver(() => {
          if (listening) schedule();
        })
      : null;
    resizeObserver?.observe(stage);
    sections.forEach((section) => resizeObserver?.observe(section));
    resizeObserver?.observe(bot);

    const handleMotionChange = () => schedule();
    reducedMotion.addEventListener("change", handleMotionChange);
    if (!visibilityObserver) attach();
    else schedule();

    return () => {
      detach();
      visibilityObserver?.disconnect();
      resizeObserver?.disconnect();
      reducedMotion.removeEventListener("change", handleMotionChange);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="wayfinder-stage" ref={stageRef}>
      {children}
      <div className="wayfinder-traveler" ref={travelerRef} aria-hidden="true">
        {mascot}
      </div>
    </div>
  );
}
