"use client";

import { Component, useCallback, useEffect, useRef, useState } from "react";
import type { ComponentType, ErrorInfo, ReactNode } from "react";
import type { GlobeCanvasProps, GlobeInteraction } from "@/components/globe/globe-canvas";
import { GlobeFallback } from "@/components/globe/globe-fallback";

type GlobeBoundaryProps = {
  children: ReactNode;
  onError: (error: Error) => void;
};

type GlobeBoundaryState = { failed: boolean };

class GlobeErrorBoundary extends Component<GlobeBoundaryProps, GlobeBoundaryState> {
  state: GlobeBoundaryState = { failed: false };

  static getDerivedStateFromError(): GlobeBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("The 3D globe failed to initialize.", error, info.componentStack);
    this.props.onError(error);
  }

  render() {
    return this.state.failed ? <GlobeFallback /> : this.props.children;
  }
}

export function GlobeLoader() {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [loadStatus, setLoadStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [attempt, setAttempt] = useState(0);
  const [GlobeCanvasComponent, setGlobeCanvasComponent] = useState<ComponentType<GlobeCanvasProps> | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const interactionRef = useRef<GlobeInteraction | null>(null);
  const dragRef = useRef<{ pointerId: number; x: number; y: number } | null>(null);

  const handleGlobeReady = useCallback(() => {
    setErrorMessage("");
    setLoadStatus("ready");
  }, []);
  const handleGlobeError = useCallback((error: Error) => {
    console.error("The 3D globe is unavailable.", error);
    setErrorMessage(error.message);
    setLoadStatus("error");
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    let cancelled = false;
    import("@/components/globe/globe-canvas")
      .then((module) => {
        if (!cancelled) setGlobeCanvasComponent(() => module.GlobeCanvas);
      })
      .catch((cause: unknown) => {
        if (cancelled) return;
        handleGlobeError(cause instanceof Error ? cause : new Error(String(cause)));
      });
    return () => { cancelled = true; };
  }, [attempt, handleGlobeError, shouldLoad]);

  useEffect(() => {
    if (loadStatus !== "loading") return;
    const timeout = window.setTimeout(() => {
      handleGlobeError(new Error("The 3D scene did not become ready. WebGL may be unavailable."));
    }, 8000);
    return () => window.clearTimeout(timeout);
  }, [loadStatus, attempt, handleGlobeError]);

  const retryGlobe = () => {
    interactionRef.current = null;
    setGlobeCanvasComponent(null);
    setErrorMessage("");
    setShouldLoad(true);
    setAttempt((current) => current + 1);
    setLoadStatus("loading");
  };

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    if (typeof window.IntersectionObserver === "undefined") {
      const timeout = window.setTimeout(() => {
        setShouldLoad(true);
        setLoadStatus("loading");
      }, 0);
      return () => window.clearTimeout(timeout);
    }

    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            setShouldLoad(true);
            setLoadStatus((status) => status === "idle" ? "loading" : status);
          }
        },
        { rootMargin: "0px" },
      );
    } catch (cause) {
      const error = cause instanceof Error ? cause : new Error(String(cause));
      const timeout = window.setTimeout(() => handleGlobeError(error), 0);
      return () => window.clearTimeout(timeout);
    }
    observer.observe(stage);
    return () => observer.disconnect();
  }, [handleGlobeError]);

  return (
    <div
      ref={stageRef}
      className="globe-interaction"
      role="group"
      aria-label={loadStatus === "ready" ? "Interactive point map of the world, centered on Istanbul" : "Point map of the world, centered on Istanbul"}
      aria-describedby="globe-description"
      aria-disabled={loadStatus !== "ready"}
      aria-busy={loadStatus === "loading"}
      tabIndex={loadStatus === "ready" ? 0 : -1}
      onPointerDown={(event) => {
        if (event.button !== 0 || (event.target instanceof Element && event.target.closest("button"))) return;
        dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
        interactionRef.current?.beginDrag();
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const drag = dragRef.current;
        if (!drag || drag.pointerId !== event.pointerId) return;
        interactionRef.current?.drag((event.clientX - drag.x) * 0.004, (event.clientY - drag.y) * 0.0035);
        drag.x = event.clientX;
        drag.y = event.clientY;
      }}
      onPointerUp={(event) => {
        if (dragRef.current?.pointerId !== event.pointerId) return;
        dragRef.current = null;
        interactionRef.current?.endDrag();
      }}
      onPointerCancel={() => {
        dragRef.current = null;
        interactionRef.current?.endDrag();
      }}
      onLostPointerCapture={() => {
        dragRef.current = null;
        interactionRef.current?.endDrag();
      }}
      onKeyDown={(event) => {
        const step = 0.12;
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
        event.preventDefault();
        interactionRef.current?.rotate(
          event.key === "ArrowLeft" ? step : event.key === "ArrowRight" ? -step : 0,
          event.key === "ArrowUp" ? -step : event.key === "ArrowDown" ? step : 0,
        );
      }}
    >
      <span className="sr-only" id="globe-description">
        When interactive mode is ready, drag to turn and tilt the globe, or focus it and use the arrow keys. The bright point marks Istanbul; other points mark global development hubs.
      </span>
      {shouldLoad && loadStatus !== "error" && GlobeCanvasComponent ? (
        <GlobeErrorBoundary key={attempt} onError={handleGlobeError}>
          <GlobeCanvasComponent
            interactionRef={interactionRef}
            isVisible={isVisible}
            onReady={handleGlobeReady}
            onError={handleGlobeError}
          />
        </GlobeErrorBoundary>
      ) : <GlobeFallback />}
      {loadStatus === "error" && (
        <div className="globe-error">
          <p role="status">The 3D globe could not start.</p>
          <p className="globe-error-detail">{errorMessage}</p>
          <button type="button" onClick={retryGlobe}>Retry 3D globe</button>
        </div>
      )}
    </div>
  );
}
