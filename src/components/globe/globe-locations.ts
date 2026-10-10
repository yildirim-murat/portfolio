export type GlobeLocation = {
  longitude: number;
  latitude: number;
  label: string;
  primary?: boolean;
};

export const globeLocations: GlobeLocation[] = [
  { longitude: 28.97, latitude: 41.01, label: "Istanbul", primary: true },
  { longitude: -0.13, latitude: 51.51, label: "London" },
  { longitude: 13.4, latitude: 52.52, label: "Berlin" },
  { longitude: -122.42, latitude: 37.77, label: "San Francisco" },
  { longitude: 139.69, latitude: 35.68, label: "Tokyo" },
  { longitude: 3.3792, latitude: 6.5244, label: "Lagos" },
  { longitude: 36.8219, latitude: -1.2921, label: "Nairobi" },
  { longitude: 18.4241, latitude: -33.9249, label: "Cape Town" },
  { longitude: 46.6753, latitude: 24.7136, label: "Riyadh" },
  { longitude: 116.4074, latitude: 39.9042, label: "Beijing" },
  { longitude: 121.4737, latitude: 31.2304, label: "Shanghai" },
  { longitude: -74.006, latitude: 40.7128, label: "New York" },
  { longitude: -99.1332, latitude: 19.4326, label: "Mexico City" },
  { longitude: -46.6333, latitude: -23.5505, label: "São Paulo" },
];
