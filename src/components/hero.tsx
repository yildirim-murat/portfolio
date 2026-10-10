"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { GlobeFallback } from "@/components/globe/globe-fallback";

const GlobeCanvas = dynamic(
  () => import("@/components/globe/globe-canvas").then((module) => module.GlobeCanvas),
  { ssr: false, loading: () => <GlobeFallback /> },
);

type HeroProps = { name: string };

export default function Hero({ name }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoadGlobe, setShouldLoadGlobe] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadGlobe(true);
          observer.disconnect();
        }
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const frame = frameRef.current;
    if (!hero || !frame) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameRequest = 0;

    const update = () => {
      frameRequest = 0;
      if (reducedMotion.matches) {
        frame.style.removeProperty("--globe-progress");
        return;
      }
      const progress = Math.max(0, Math.min(1, -hero.getBoundingClientRect().top / (window.innerHeight * 0.82)));
      frame.style.setProperty("--globe-progress", progress.toFixed(3));
    };
    const scheduleUpdate = () => {
      if (!frameRequest) frameRequest = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", scheduleUpdate);
    scheduleUpdate();
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", scheduleUpdate);
      if (frameRequest) window.cancelAnimationFrame(frameRequest);
    };
  }, []);

  return (
    <section id="home" className="hero hero-globe" ref={heroRef} aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title" className="hero-name">{name}</h1>
        <p className="hero-role">Software Engineer</p>
        <p className="hero-tagline">Building software for the connected world.</p>
        <a className="hero-explore" href="#about">Explore <span aria-hidden="true">↓</span></a>
      </div>

      <div className="hero-artifact hero-globe-frame" ref={frameRef}>
        {shouldLoadGlobe ? <GlobeCanvas /> : <GlobeFallback />}
      </div>
    </section>
  );
}
