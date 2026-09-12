export const hazards = [
  "Floods",
  "Cyclones",
  "Droughts",
  "Earthquakes",
  "Forest fires",
  "Landslides",
  "Lightning",
] as const;

export type HazardType = (typeof hazards)[number];

export type ZoneRisk = "High" | "Medium" | "Low";

export interface ZoneData {
  id: string;
  name: string;
  basis: string;
  riskLevel: ZoneRisk;
  lat: number;
  lng: number;
}

export const mockZones: Record<HazardType, ZoneData[]> = {
  Floods: [
    { id: "f1", name: "Kaziranga National Park", basis: "Brahmaputra overflow + heavy rains", riskLevel: "High", lat: 26.5775, lng: 93.1711 },
    { id: "f2", name: "Majuli Island", basis: "Continuous rainfall in upper catchment", riskLevel: "High", lat: 26.9535, lng: 94.2505 },
    { id: "f3", name: "Mumbai (Low lying areas)", basis: "Urban drainage congestion", riskLevel: "Medium", lat: 19.0760, lng: 72.8777 },
    { id: "f4", name: "Kosi River Basin (Bihar)", basis: "Elevated river levels", riskLevel: "Medium", lat: 25.4358, lng: 86.9546 },
    { id: "f5", name: "Chennai Coast", basis: "Monsoon surge", riskLevel: "Low", lat: 13.0827, lng: 80.2707 },
  ],
  Cyclones: [
    { id: "c1", name: "Odisha Coast", basis: "Depression forming in Bay of Bengal", riskLevel: "High", lat: 19.8135, lng: 85.8312 },
    { id: "c2", name: "Sunderbans", basis: "Storm surge warnings", riskLevel: "High", lat: 21.9497, lng: 89.1833 },
    { id: "c3", name: "Andhra Coast", basis: "Squally winds 40-50 kmph", riskLevel: "Medium", lat: 15.9129, lng: 79.7400 },
  ],
  Droughts: [
    { id: "d1", name: "Marathwada", basis: "Deficit rainfall (-40%)", riskLevel: "High", lat: 19.1437, lng: 76.5244 },
    { id: "d2", name: "Bundelkhand", basis: "Depleted groundwater levels", riskLevel: "Medium", lat: 25.3216, lng: 79.5760 },
  ],
  Earthquakes: [
    { id: "e1", name: "Delhi NCR", basis: "Seismic Zone IV - Mild tremors recorded", riskLevel: "Medium", lat: 28.7041, lng: 77.1025 },
    { id: "e2", name: "Himalayan Belt (Uttarakhand)", basis: "Seismic Zone V", riskLevel: "High", lat: 30.0668, lng: 79.0193 },
  ],
  "Forest fires": [
    { id: "ff1", name: "Similipal Tiger Reserve", basis: "Dry conditions + rising temp", riskLevel: "High", lat: 21.9405, lng: 86.2704 },
    { id: "ff2", name: "Bandipur National Park", basis: "Seasonal dryness", riskLevel: "Medium", lat: 11.6663, lng: 76.6284 },
  ],
  Landslides: [
    { id: "l1", name: "Wayanad", basis: "Steep slopes + heavy rains", riskLevel: "High", lat: 11.6854, lng: 76.1320 },
    { id: "l2", name: "Shimla Highways", basis: "Recent roadworks + rain", riskLevel: "Medium", lat: 31.1048, lng: 77.1734 },
  ],
  Lightning: [
    { id: "li1", name: "Jharkhand (Chhotanagpur)", basis: "Thunderstorm warnings", riskLevel: "High", lat: 23.6102, lng: 85.2799 },
  ]
};

export interface Alert {
  id: string;
  type: HazardType;
  zoneId: string;
  severity: "severe" | "warning" | "watch";
  message: string;
  timestamp: string;
}

export const mockAlerts: Alert[] = [
  { id: "a1", type: "Floods", zoneId: "f1", severity: "severe", message: "River levels crossed danger mark. Evacuation required.", timestamp: "10 mins ago" },
  { id: "a2", type: "Cyclones", zoneId: "c1", severity: "warning", message: "Depression intensifying. Fishermen advised not to venture.", timestamp: "45 mins ago" },
  { id: "a3", type: "Landslides", zoneId: "l1", severity: "severe", message: "Major landslide reported. Road blocked.", timestamp: "1 hr ago" },
];
