"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

export function WayfinderEyes() {
  const pupilsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const pupils = pupilsRef.current;
    const mascot = pupils?.closest<HTMLElement>(".wayfinder-bot");
    const scope = mascot?.closest("main");
    if (!pupils || !mascot || !scope) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let bounds = mascot.getBoundingClientRect();
    let pointerX: number | null = null;
    let pointerY: number | null = null;
    let refreshBounds = false;
    let attached = false;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const paint = () => {
      frame = 0;
      if (refreshBounds) {
        bounds = mascot.getBoundingClientRect();
        refreshBounds = false;
      }

      if (pointerX !== null && pointerY !== null && !reducedMotion.matches) {
        const dx = pointerX - (bounds.left + bounds.width / 2);
        const dy = pointerY - (bounds.top + bounds.height / 2);
        const distance = Math.hypot(dx, dy);
        const proximity = clamp(1 - distance / 340, 0, 1);
        targetX = clamp(dx / 110, -1, 1) * 5.5 * proximity;
        targetY = clamp(dy / 90, -1, 1) * 4.5 * proximity;
      } else {
        targetX = 0;
        targetY = 0;
      }

      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;
      pupils.style.setProperty("--gaze-x", `${currentX.toFixed(2)}px`);
      pupils.style.setProperty("--gaze-y", `${currentY.toFixed(2)}px`);

      if (Math.abs(targetX - currentX) > 0.08 || Math.abs(targetY - currentY) > 0.08) {
        frame = window.requestAnimationFrame(paint);
      }
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };

    const reset = () => {
      pointerX = null;
      pointerY = null;
      targetX = 0;
      targetY = 0;
      if (Math.abs(currentX) > 0.08 || Math.abs(currentY) > 0.08 || frame) schedule();
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reducedMotion.matches) {
        reset();
        return;
      }

      pointerX = event.clientX;
      pointerY = event.clientY;
      const dx = pointerX - (bounds.left + bounds.width / 2);
      const dy = pointerY - (bounds.top + bounds.height / 2);
      if (Math.hypot(dx, dy) < 340 || Math.abs(currentX) > 0.08 || Math.abs(currentY) > 0.08) schedule();
    };

    const handleViewportChange = () => {
      if (pointerX === null || pointerY === null) return;
      refreshBounds = true;
      schedule();
    };

    const handleMotionPreference = () => {
      if (!reducedMotion.matches) return;
      pointerX = null;
      pointerY = null;
      targetX = 0;
      targetY = 0;
      currentX = 0;
      currentY = 0;
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      pupils.style.setProperty("--gaze-x", "0px");
      pupils.style.setProperty("--gaze-y", "0px");
    };

    const attach = () => {
      if (attached) return;
      attached = true;
      bounds = mascot.getBoundingClientRect();
      scope.addEventListener("pointermove", handlePointerMove, { passive: true });
      scope.addEventListener("pointerleave", reset);
      window.addEventListener("scroll", handleViewportChange, { passive: true });
      window.addEventListener("resize", handleViewportChange, { passive: true });
    };

    const detach = () => {
      if (!attached) return;
      attached = false;
      scope.removeEventListener("pointermove", handlePointerMove);
      scope.removeEventListener("pointerleave", reset);
      window.removeEventListener("scroll", handleViewportChange);
      window.removeEventListener("resize", handleViewportChange);
      reset();
    };

    reducedMotion.addEventListener("change", handleMotionPreference);

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) attach();
        else detach();
      });
      observer.observe(mascot);
    } else {
      attach();
    }

    return () => {
      observer?.disconnect();
      detach();
      reducedMotion.removeEventListener("change", handleMotionPreference);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <g ref={pupilsRef} className="wayfinder-bot__pupils">
      <ellipse cx="68" cy="81" rx="5.5" ry="6" fill="#293347" />
      <ellipse cx="112" cy="81" rx="5.5" ry="6" fill="#293347" />
      <circle cx="66" cy="78.5" r="1.7" fill="#FFFFFF" />
      <circle cx="110" cy="78.5" r="1.7" fill="#FFFFFF" />
    </g>
  );
}
