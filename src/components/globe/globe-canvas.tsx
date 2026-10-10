"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BufferAttribute, BufferGeometry, Color, Group, MathUtils, MeshBasicMaterial, Quaternion, Vector3 } from "three";
import type { MutableRefObject } from "react";
import { landCoordinates } from "@/components/globe/world-points";
import { GlobeFallback } from "@/components/globe/globe-fallback";
import { globeLocations } from "@/components/globe/globe-locations";

export type GlobeInteraction = {
  beginDrag: () => void;
  drag: (horizontal: number, vertical: number) => void;
  endDrag: () => void;
  rotate: (horizontal: number, vertical: number) => void;
};

export type GlobeCanvasProps = {
  interactionRef: MutableRefObject<GlobeInteraction | null>;
  isVisible: boolean;
  onReady: () => void;
  onError: (error: Error) => void;
};

const radius = 2.2;
const requestFadeInDuration = 0.22;
const requestTravelDuration = 1.25;
const requestSettleDuration = 0.28;
const requestFadeOutDuration = 0.65;
const requestGapDuration = 0.55;
const requestVisibleDuration = requestFadeInDuration + requestTravelDuration + requestSettleDuration + requestFadeOutDuration;
const requestSlotDuration = requestVisibleDuration + requestGapDuration;
const signalTravelDuration = 0.86;
const requestDestinationCount = globeLocations.length - 1;
const requestCycleDuration = requestSlotDuration * requestDestinationCount;

function pulseEnvelope(time: number, start: number, duration: number) {
  const progress = (time - start) / duration;
  if (progress <= 0 || progress >= 1) return 0;
  return Math.sin(Math.PI * progress) ** 2;
}

function smoothStep(value: number) {
  const clamped = MathUtils.clamp(value, 0, 1);
  return clamped * clamped * (3 - 2 * clamped);
}

function toSphere(longitude: number, latitude: number, sphereRadius = radius) {
  const longitudeRadians = (longitude * Math.PI) / 180;
  const latitudeRadians = (latitude * Math.PI) / 180;
  return new Vector3(
    sphereRadius * Math.cos(latitudeRadians) * Math.sin(longitudeRadians),
    sphereRadius * Math.sin(latitudeRadians),
    sphereRadius * Math.cos(latitudeRadians) * Math.cos(longitudeRadians),
  );
}

function LandPoints({ mobile }: { mobile: boolean }) {
  const geometry = useMemo(() => {
    const step = mobile ? 2 : 1;
    const count = Math.ceil(landCoordinates.length / step);
    const positions = new Float32Array(count * 3);
    let targetIndex = 0;

    for (let index = 0; index < landCoordinates.length; index += step) {
      const [longitude, latitude] = landCoordinates[index];
      positions.set(toSphere(longitude, latitude).toArray(), targetIndex * 3);
      targetIndex += 1;
    }

    const next = new BufferGeometry();
    next.setAttribute("position", new BufferAttribute(positions, 3));
    next.computeBoundingSphere();
    return next;
  }, [mobile]);

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#bec9d0" size={0.015} sizeAttenuation transparent opacity={0.86} depthWrite={false} />
    </points>
  );
}

function GlobeOcclusion() {
  return (
    <mesh renderOrder={-1}>
      <sphereGeometry args={[radius - 0.022, 48, 48]} />
      <meshBasicMaterial colorWrite={false} depthWrite />
    </mesh>
  );
}

function HeartbeatLine({ reducedMotion }: { reducedMotion: boolean }) {
  const geometry = useMemo(() => {
    const segmentCount = 52;
    const positions = new Float32Array(segmentCount * 2 * 3);
    const colors = new Float32Array(segmentCount * 2 * 3);
    const quietColor = new Color("#687780");

    for (let segment = 0; segment < segmentCount; segment += 1) {
      quietColor.toArray(colors, segment * 6);
      quietColor.toArray(colors, segment * 6 + 3);
    }

    const next = new BufferGeometry();
    next.setAttribute("position", new BufferAttribute(positions, 3));
    next.setAttribute("color", new BufferAttribute(colors, 3));
    return next;
  }, []);
  const quiet = useMemo(() => new Color("#687780"), []);
  const signal = useMemo(() => new Color("#e0bd88"), []);
  const positionScratch = useMemo(() => ({
    start: new Vector3(),
    end: new Vector3(),
    from: new Vector3(),
    to: new Vector3(),
  }), []);
  const activeDestination = useRef(-1);
  const materialRef = useRef<import("three").LineBasicMaterial>(null);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }) => {
    const material = materialRef.current;
    if (!material) return;
    if (reducedMotion) {
      material.visible = false;
      return;
    }

    const cycleTime = clock.elapsedTime % requestCycleDuration;
    const slotIndex = Math.floor(cycleTime / requestSlotDuration);
    const slotTime = cycleTime % requestSlotDuration;
    const destinationIndex = slotIndex + 1;
    const isVisible = slotTime < requestVisibleDuration;
    let fade = 0;
    if (slotTime < requestFadeInDuration) {
      fade = smoothStep(slotTime / requestFadeInDuration);
    } else if (slotTime < requestFadeInDuration + requestTravelDuration + requestSettleDuration) {
      fade = 1;
    } else if (isVisible) {
      const fadeOutProgress = (slotTime - requestFadeInDuration - requestTravelDuration - requestSettleDuration) / requestFadeOutDuration;
      fade = 1 - smoothStep(fadeOutProgress);
    }
    material.visible = isVisible && fade > 0;
    material.opacity = fade * 0.48;

    if (activeDestination.current !== destinationIndex) {
      activeDestination.current = destinationIndex;
      const destination = globeLocations[destinationIndex];
      const { start, end, from, to } = positionScratch;
      start.copy(toSphere(globeLocations[0].longitude, globeLocations[0].latitude, 1)).normalize();
      end.copy(toSphere(destination.longitude, destination.latitude, 1)).normalize();
      const positions = geometry.getAttribute("position") as BufferAttribute;
      const values = positions.array as Float32Array;
      const colors = geometry.getAttribute("color") as BufferAttribute;
      const colorValues = colors.array as Float32Array;
      const segments = values.length / 6;

      for (let segment = 0; segment < segments; segment += 1) {
        const fromProgress = segment / segments;
        const toProgress = (segment + 1) / segments;
        from.copy(start).lerp(end, fromProgress).normalize();
        to.copy(start).lerp(end, toProgress).normalize();
        from.multiplyScalar(radius + 0.045 + Math.sin(fromProgress * Math.PI) * 0.085);
        to.multiplyScalar(radius + 0.045 + Math.sin(toProgress * Math.PI) * 0.085);
        from.toArray(values, segment * 6);
        to.toArray(values, segment * 6 + 3);
        quiet.toArray(colorValues, segment * 6);
        quiet.toArray(colorValues, segment * 6 + 3);
      }
      positions.needsUpdate = true;
      colors.needsUpdate = true;
    }

    const signalTime = slotTime - requestFadeInDuration;
    if (!isVisible || signalTime < 0 || signalTime > requestTravelDuration) return;
    const colors = geometry.getAttribute("color") as BufferAttribute;
    const values = colors.array as Float32Array;
    const segments = values.length / 6;

    for (let segment = 0; segment < segments; segment += 1) {
      const progress = (segment + 0.5) / segments;
      const arrival = progress * signalTravelDuration;
      const intensity = Math.max(
        pulseEnvelope(signalTime, arrival, 0.16),
        pulseEnvelope(signalTime, arrival + 0.19, 0.15) * 0.84,
      );
      const mix = 0.16 + intensity * 0.84;
      const offset = segment * 6;
      for (let vertex = 0; vertex < 2; vertex += 1) {
        const colorOffset = offset + vertex * 3;
        values[colorOffset] = quiet.r + (signal.r - quiet.r) * mix;
        values[colorOffset + 1] = quiet.g + (signal.g - quiet.g) * mix;
        values[colorOffset + 2] = quiet.b + (signal.b - quiet.b) * mix;
      }
    }
    colors.needsUpdate = true;
  });

  return (
    <lineSegments geometry={geometry} renderOrder={1} frustumCulled={false}>
      <lineBasicMaterial ref={materialRef} vertexColors transparent opacity={0} depthWrite={false} />
    </lineSegments>
  );
}

function GlobeMarkers({ reducedMotion }: { reducedMotion: boolean }) {
  const markerRefs = useRef<(Group | null)[]>([]);
  const ringRefs = useRef<(Group | null)[]>([]);
  const ringMaterials = useRef<(MeshBasicMaterial | null)[]>([]);
  const ringOrientations = useMemo(
    () => globeLocations.map(({ longitude, latitude }) => {
      const normal = toSphere(longitude, latitude, 1).normalize();
      return new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), normal);
    }),
    [],
  );

  useFrame(({ clock }) => {
    const cycleTime = clock.elapsedTime % requestCycleDuration;
    const slotIndex = Math.floor(cycleTime / requestSlotDuration);
    const slotTime = cycleTime % requestSlotDuration;
    const destinationIndex = slotIndex + 1;
    globeLocations.forEach((_, index) => {
      const marker = markerRefs.current[index];
      const ring = ringRefs.current[index];
      const ringMaterial = ringMaterials.current[index];
      if (!marker || !ring || !ringMaterial) return;

      if (reducedMotion) {
        marker.scale.setScalar(1);
        ring.scale.setScalar(1.1);
        ringMaterial.opacity = index === 0 ? 0.045 : 0.075;
        return;
      }

      const arrivalTime = requestFadeInDuration + requestTravelDuration;
      const beatPhase = index === 0 && slotTime < 0.72
        ? slotTime
        : index === destinationIndex && slotTime >= arrivalTime
          ? slotTime - arrivalTime
          : -1;
      if (beatPhase < 0) {
        marker.scale.setScalar(1);
        ring.scale.setScalar(1.1);
        ringMaterial.opacity = 0;
        return;
      }

      const firstBeat = pulseEnvelope(beatPhase, 0, 0.18);
      const secondBeat = pulseEnvelope(beatPhase, 0.19, 0.17) * 0.86;
      marker.scale.setScalar(1 + Math.max(firstBeat, secondBeat) * (index === 0 ? 0.095 : 0.12));

      const firstRipple = beatPhase < 0.52 ? beatPhase / 0.52 : -1;
      const secondRipple = beatPhase >= 0.19 && beatPhase < 0.71 ? (beatPhase - 0.19) / 0.52 : -1;
      const ripple = firstRipple >= 0 && (secondRipple < 0 || firstRipple < secondRipple)
        ? firstRipple
        : secondRipple;
      if (ripple < 0) {
        marker.scale.setScalar(1);
        ring.scale.setScalar(1.1);
        ringMaterial.opacity = 0;
      } else {
        ringMaterial.opacity = (1 - smoothStep(ripple)) * (index === 0 ? 0.24 : 0.3);
        ring.scale.setScalar(1.1 + smoothStep(ripple) * 1.8);
      }
    });
  });

  return (
    <group>
      {globeLocations.map((destination, index) => (
        <group
          key={destination.label}
          ref={(node) => { markerRefs.current[index] = node; }}
          position={toSphere(destination.longitude, destination.latitude, radius + 0.014)}
          quaternion={ringOrientations[index]}
        >
          {destination.primary && (
            <mesh>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshBasicMaterial color="#e5c995" transparent opacity={0.14} depthWrite={false} />
            </mesh>
          )}
          <mesh>
            <sphereGeometry args={[destination.primary ? 0.027 : 0.016, 10, 10]} />
            <meshBasicMaterial color={destination.primary ? "#f0d7a4" : "#bdd9e6"} />
          </mesh>
          <group ref={(node) => { ringRefs.current[index] = node; }} position={[0, 0, 0.012]} scale={1.1}>
            <mesh>
            <ringGeometry args={[0.032, 0.036, 28]} />
            <meshBasicMaterial
              ref={(material) => { ringMaterials.current[index] = material; }}
              color={destination.primary ? "#e0bd88" : "#9fc6d8"}
              transparent
              opacity={0.075}
              depthWrite={false}
              side={2}
            />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

function GlobeScene({
  interactionRef,
  reducedMotion,
  onReady,
}: {
  interactionRef: GlobeCanvasProps["interactionRef"];
  reducedMotion: boolean;
  onReady: GlobeCanvasProps["onReady"];
}) {
  const group = useRef<Group>(null);
  const dragging = useRef(false);
  const inputRegistered = useRef(false);
  const firstFrameRendered = useRef(false);
  const reportedReady = useRef(false);
  const orientation = useRef({ horizontal: -0.42, vertical: -0.08 });
  const { size, invalidate } = useThree();
  const mobile = size.width < 560;
  const reportReady = useCallback(() => {
    if (!inputRegistered.current || !firstFrameRendered.current || reportedReady.current) return;
    reportedReady.current = true;
    onReady();
  }, [onReady]);

  useEffect(() => {
    interactionRef.current = {
      beginDrag: () => {
        if (group.current) {
          orientation.current.horizontal = group.current.rotation.y;
          orientation.current.vertical = group.current.rotation.x;
        }
        dragging.current = true;
      },
      drag: (horizontal, vertical) => {
        orientation.current.horizontal += horizontal;
        orientation.current.vertical = MathUtils.clamp(orientation.current.vertical + vertical, -0.48, 0.48);
        if (group.current) {
          group.current.rotation.y = orientation.current.horizontal;
          group.current.rotation.x = orientation.current.vertical;
        }
        invalidate();
      },
      endDrag: () => { dragging.current = false; },
      rotate: (horizontal, vertical) => {
        orientation.current.horizontal += horizontal;
        orientation.current.vertical = MathUtils.clamp(orientation.current.vertical + vertical, -0.48, 0.48);
        if (group.current) {
          group.current.rotation.y = orientation.current.horizontal;
          group.current.rotation.x = orientation.current.vertical;
        }
        invalidate();
      },
    };
    inputRegistered.current = true;
    reportReady();
    return () => {
      inputRegistered.current = false;
      interactionRef.current = null;
    };
  }, [interactionRef, invalidate, reportReady]);

  useFrame((state, delta) => {
    if (!group.current) return;
    firstFrameRendered.current = true;
    reportReady();
    if (reducedMotion || dragging.current) return;
    orientation.current.horizontal += delta * 0.07;
    const targetHorizontal = orientation.current.horizontal + state.pointer.x * 0.065;
    const targetVertical = MathUtils.clamp(orientation.current.vertical + state.pointer.y * 0.035, -0.54, 0.54);
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, targetHorizontal, 4, delta);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, targetVertical, 4, delta);
  });

  return (
    <group ref={group} rotation={[-0.08, -0.42, 0]}>
      <GlobeOcclusion />
      <LandPoints mobile={mobile} />
      <HeartbeatLine reducedMotion={reducedMotion} />
      <GlobeMarkers reducedMotion={reducedMotion} />
    </group>
  );
}

export function GlobeCanvas({ interactionRef, isVisible, onReady, onError }: GlobeCanvasProps) {
  const [contextLost, setContextLost] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (contextLost) return <GlobeFallback />;

  return (
    <Canvas
      className="globe-canvas"
      aria-hidden="true"
      role="presentation"
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 8], fov: 40, near: 0.1, far: 40 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      frameloop={reducedMotion || !isVisible ? "demand" : "always"}
      fallback={<GlobeFallback />}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", (event) => {
          event.preventDefault();
          setContextLost(true);
          onError(new Error("The WebGL context was lost."));
        }, { once: true });
      }}
    >
      <GlobeScene interactionRef={interactionRef} reducedMotion={reducedMotion} onReady={onReady} />
    </Canvas>
  );
}
