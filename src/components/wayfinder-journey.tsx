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
    const dashboard = stage?.querySelector<HTMLElement>(".dashboard-screen");
    const aiModel = stage?.querySelector<HTMLElement>(".ai-model-screen");
    const mobileApp = stage?.querySelector<HTMLElement>(".mobile-app-screen");
    const bot = traveler?.querySelector<HTMLElement>(".wayfinder-bot");
    if (!stage || !traveler || !about || !dashboard || !aiModel || !mobileApp || !bot) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let listening = false;

    const update = () => {
      frame = 0;
      const stageRect = stage.getBoundingClientRect();
      const aboutRect = about.getBoundingClientRect();
      const dashboardRect = dashboard.getBoundingClientRect();
      const aiModelRect = aiModel.getBoundingClientRect();
      const mobileAppRect = mobileApp.getBoundingClientRect();
      const botRect = bot.getBoundingClientRect();
      const aboutStyle = window.getComputedStyle(about);
      const dashboardStyle = window.getComputedStyle(dashboard);
      const aiModelStyle = window.getComputedStyle(aiModel);
      const mobileAppStyle = window.getComputedStyle(mobileApp);
      const height = window.innerHeight;
      const topInset = Math.max(28, Math.min(height * 0.05, 62));
      const aboutDocumentTop = window.scrollY + aboutRect.top;
      const dashboardDocumentTop = window.scrollY + dashboardRect.top;
      const aiModelDocumentTop = window.scrollY + aiModelRect.top;
      const mobileAppDocumentTop = window.scrollY + mobileAppRect.top;
      const dashboardBottomInset = Math.max(
        16,
        Number.parseFloat(dashboardStyle.getPropertyValue("--wayfinder-safe-bottom")) || 0,
      );
      const aiModelBottomInset = Math.max(
        16,
        Number.parseFloat(aiModelStyle.getPropertyValue("--wayfinder-safe-bottom")) || 0,
      );
      const mobileTopInset = Math.max(100, Math.min(132, height * 0.15));
      const anchors = [
        {
          x: aboutRect.right - stageRect.left - Number.parseFloat(aboutStyle.paddingRight) - botRect.width,
          y: aboutRect.top - stageRect.top + topInset,
        },
        {
          x: dashboardRect.left - stageRect.left + Number.parseFloat(dashboardStyle.paddingLeft),
          y: dashboardRect.bottom - stageRect.top - botRect.height - dashboardBottomInset,
        },
        {
          x: aiModelRect.right - stageRect.left - Number.parseFloat(aiModelStyle.paddingRight) - botRect.width,
          y: aiModelRect.bottom - stageRect.top - botRect.height - aiModelBottomInset,
        },
        {
          x: mobileAppRect.left - stageRect.left + Number.parseFloat(mobileAppStyle.paddingLeft),
          y: mobileAppRect.top - stageRect.top + mobileTopInset,
        },
      ];
      const sectionTops = [aboutDocumentTop, dashboardDocumentTop, aiModelDocumentTop, mobileAppDocumentTop];
      const segment = window.scrollY < dashboardDocumentTop
        ? 0
        : window.scrollY < aiModelDocumentTop
          ? 1
          : 2;
      const startTop = sectionTops[segment];
      const endTop = sectionTops[segment + 1];
      const sectionProgress = clamp(
        (window.scrollY - startTop) / Math.max(1, endTop - startTop),
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
    resizeObserver?.observe(about);
    resizeObserver?.observe(dashboard);
    resizeObserver?.observe(aiModel);
    resizeObserver?.observe(mobileApp);
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
