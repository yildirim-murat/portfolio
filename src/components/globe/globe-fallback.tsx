import { globeLocations } from "@/components/globe/globe-locations";

function toMapPoint(longitude: number, latitude: number) {
  return {
    x: 450 + longitude * 1.84,
    y: 360 - latitude * 3.2,
  };
}

export function GlobeFallback() {
  return (
    <div className="globe-fallback" aria-hidden="true">
      <svg className="globe-map" viewBox="90 0 720 720" role="presentation">
        <defs>
          <pattern id="world-points" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="currentColor" />
          </pattern>
          <clipPath id="land-shapes">
            <path d="M129 174l37-42 52-16 51 18 27 33 53 11 37 26-15 36-36 13-10 29-29 17-14 43-31 15-15 48-34 17-33-35-14-53-29-17-11-45-38-27-16-49z" />
            <path d="M242 414l38 10 30 42-5 44-21 40-12 56-25 49-26-23-5-54-19-40 10-56-11-38z" />
            <path d="M416 170l43-29 50 2 29 18 44-9 60 15 30 31-7 28-38 3-14 28-39 14-21 40-31 5-25-43-23-19-6-37-29-11-24 2-19-23z" />
            <path d="M466 322l44-20 51 12 34 34-7 64-27 54-21 65-37 40-30-24-13-65-29-48-6-57 19-55z" />
            <path d="M648 199l42-26 54 10 33 36-14 39-36 7-13 34-39-12-16-36-25-9z" />
            <path d="M707 313l34-13 40 18 10 34-24 36-33-12-17-32z" />
          </clipPath>
        </defs>
        <circle className="globe-outline" cx="450" cy="360" r="282" />
        <circle className="globe-outline globe-outline-inner" cx="450" cy="360" r="250" />
        <rect x="100" y="70" width="700" height="600" fill="url(#world-points)" clipPath="url(#land-shapes)" />
        {globeLocations.map((location) => {
          const { x, y } = toMapPoint(location.longitude, location.latitude);
          return (
            <circle
              key={location.label}
              className={location.primary ? "globe-node globe-node-primary" : "globe-node"}
              cx={x}
              cy={y}
              r={location.primary ? 5 : 3}
            />
          );
        })}
      </svg>
    </div>
  );
}
