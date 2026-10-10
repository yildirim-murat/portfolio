"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { BufferAttribute, BufferGeometry, Group, MathUtils, Vector3 } from "three";
import type { MutableRefObject } from "react";
import { landCoordinates } from "@/components/globe/world-points";
import { GlobeFallback } from "@/components/globe/globe-fallback";

const radius = 2.2;
const destinations = [
  { longitude: 28.97, latitude: 41.01, label: "Istanbul", primary: true },
  { longitude: -0.13, latitude: 51.51, label: "London" },
  { longitude: 13.4, latitude: 52.52, label: "Berlin" },
  { longitude: -122.42, latitude: 37.77, label: "San Francisco" },
  { longitude: 139.69, latitude: 35.68, label: "Tokyo" },
];

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
  const positions = useMemo(() => {
    const sampleEvery = mobile ? 2 : 1;
    const coordinates = landCoordinates.filter((_, index) => index % sampleEvery === 0);
    const values = new Float32Array(coordinates.length * 3);
    coordinates.forEach(([longitude, latitude], index) => {
      values.set(toSphere(longitude, latitude, radius).toArray(), index * 3);
    });
    return values;
  }, [mobile]);
  const geometry = useMemo(() => {
    const next = new BufferGeometry();
    next.setAttribute("position", new BufferAttribute(positions, 3));
    return next;
  }, [positions]);

  return (
    <points geometry={geometry}>
      <pointsMaterial color="#c0cdbb" size={0.012} sizeAttenuation transparent opacity={0.86} depthWrite={false} />
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

function NetworkLines() {
  const geometry = useMemo(() => {
    const vectors: number[] = [];
    const origin = toSphere(destinations[0].longitude, destinations[0].latitude, 1).normalize();
    for (const destination of destinations.slice(1)) {
      const target = toSphere(destination.longitude, destination.latitude, 1).normalize();
      const angle = origin.angleTo(target);
      const steps = 52;
      let previous: Vector3 | undefined;
      for (let step = 0; step <= steps; step += 1) {
        const t = step / steps;
        const point = origin.clone().multiplyScalar(Math.sin((1 - t) * angle) / Math.sin(angle))
          .add(target.clone().multiplyScalar(Math.sin(t * angle) / Math.sin(angle)));
        point.normalize().multiplyScalar(radius + Math.sin(Math.PI * t) * 0.13);
        if (previous) vectors.push(...previous.toArray(), ...point.toArray());
        previous = point;
      }
    }
    const next = new BufferGeometry();
    next.setAttribute("position", new BufferAttribute(new Float32Array(vectors), 3));
    return next;
  }, []);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#869985" transparent opacity={0.47} depthWrite={false} />
    </lineSegments>
  );
}

function GlobeMarkers() {
  return (
    <group>
      {destinations.map((destination) => {
        const position = toSphere(destination.longitude, destination.latitude, radius + 0.015);
        return (
          <group key={destination.label} position={position}>
            {destination.primary && <mesh><sphereGeometry args={[0.064, 12, 12]} /><meshBasicMaterial color="#c7e8b0" transparent opacity={0.14} depthWrite={false} /></mesh>}
            <mesh><sphereGeometry args={[destination.primary ? 0.025 : 0.015, 10, 10]} /><meshBasicMaterial color={destination.primary ? "#d9f6bf" : "#bdcfb7"} /></mesh>
          </group>
        );
      })}
    </group>
  );
}

type GlobeInteraction = {
  beginDrag: () => void;
  drag: (horizontal: number, vertical: number) => void;
  endDrag: () => void;
  rotate: (horizontal: number, vertical: number) => void;
};

function GlobeScene({ reducedMotion, interactionRef }: { reducedMotion: boolean; interactionRef: MutableRefObject<GlobeInteraction | null> }) {
  const group = useRef<Group>(null);
  const { size, invalidate } = useThree();
  const mobile = size.width < 560;
  const orientation = useRef({ horizontal: -0.42, vertical: -0.08 });
  const dragging = useRef(false);

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
        orientation.current.vertical = MathUtils.clamp(orientation.current.vertical + vertical, -0.52, 0.52);
        if (group.current) {
          group.current.rotation.y = orientation.current.horizontal;
          group.current.rotation.x = orientation.current.vertical;
        }
        invalidate();
      },
      endDrag: () => { dragging.current = false; },
      rotate: (horizontal, vertical) => {
        orientation.current.horizontal += horizontal;
        orientation.current.vertical = MathUtils.clamp(orientation.current.vertical + vertical, -0.52, 0.52);
        if (group.current) {
          group.current.rotation.y = orientation.current.horizontal;
          group.current.rotation.x = orientation.current.vertical;
        }
        invalidate();
      },
    };
    return () => { interactionRef.current = null; };
  }, [interactionRef, invalidate]);

  useFrame((state, delta) => {
    if (!group.current || reducedMotion || dragging.current) return;
    orientation.current.horizontal += delta * 0.018;
    const targetHorizontal = orientation.current.horizontal + state.pointer.x * 0.09;
    const targetVertical = MathUtils.clamp(orientation.current.vertical + state.pointer.y * 0.045, -0.58, 0.58);
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, targetHorizontal, 5, delta);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, targetVertical, 5, delta);
  });

  return (
    <group ref={group} rotation={[-0.08, -0.42, -0.04]}>
      <GlobeOcclusion />
      <LandPoints mobile={mobile} />
      <NetworkLines />
      <GlobeMarkers />
    </group>
  );
}

export function GlobeCanvas() {
  const [lost, setLost] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const interactionRef = useRef<GlobeInteraction | null>(null);
  const dragState = useRef<{ pointerId: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (lost) return <GlobeFallback />;

  return (
    <div
      className="globe-interaction"
      role="group"
      aria-label="Interactive point map of the world, centered on Istanbul"
      onPointerDown={(event) => {
        if (event.button !== 0 || (event.target instanceof HTMLElement && event.target.closest("button"))) return;
        dragState.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY };
        interactionRef.current?.beginDrag();
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        const drag = dragState.current;
        if (!drag || drag.pointerId !== event.pointerId) return;
        interactionRef.current?.drag((event.clientX - drag.x) * 0.004, (event.clientY - drag.y) * 0.0035);
        drag.x = event.clientX;
        drag.y = event.clientY;
      }}
      onPointerUp={(event) => {
        if (dragState.current?.pointerId === event.pointerId) {
          dragState.current = null;
          interactionRef.current?.endDrag();
        }
      }}
      onPointerCancel={() => {
        dragState.current = null;
        interactionRef.current?.endDrag();
      }}
      onKeyDown={(event) => {
        const movement = 0.12;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "ArrowUp" || event.key === "ArrowDown") {
          event.preventDefault();
          interactionRef.current?.rotate(
            event.key === "ArrowLeft" ? movement : event.key === "ArrowRight" ? -movement : 0,
            event.key === "ArrowUp" ? -movement : event.key === "ArrowDown" ? movement : 0,
          );
        }
      }}
      tabIndex={0}
      aria-describedby="globe-description"
    >
      <span className="sr-only" id="globe-description">Drag in either direction to rotate the globe, or use the arrow keys when the map is focused. The highlighted point marks Istanbul, with routes to London, Berlin, San Francisco, and Tokyo.</span>
      <Canvas
        aria-hidden="true"
        role="presentation"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 36 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
        frameloop={reducedMotion ? "demand" : "always"}
        onCreated={({ gl }) => {
          const canvas = gl.domElement;
          const handleContextLost = (event: Event) => {
            event.preventDefault();
            setLost(true);
          };
          canvas.addEventListener("webglcontextlost", handleContextLost, { once: true });
        }}
        fallback={<GlobeFallback />}
      >
        <GlobeScene reducedMotion={reducedMotion} interactionRef={interactionRef} />
      </Canvas>
      <div className="globe-controls" aria-label="Rotate the globe">
        <button type="button" aria-label="Rotate globe left" onClick={() => interactionRef.current?.rotate(0.18, 0)}>←</button>
        <button type="button" aria-label="Rotate globe right" onClick={() => interactionRef.current?.rotate(-0.18, 0)}>→</button>
        <button type="button" aria-label="Tilt globe up" onClick={() => interactionRef.current?.rotate(0, -0.16)}>↑</button>
        <button type="button" aria-label="Tilt globe down" onClick={() => interactionRef.current?.rotate(0, 0.16)}>↓</button>
      </div>
    </div>
  );
}
