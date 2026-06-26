export interface EVColor {
  name: string;
  hex: string;
  imageUrl: string;
}

export interface EVSpecGroup {
  category: string;
  items: {
    label: string;
    value: string;
  }[];
}

export interface EVHighlight {
  title: string;
  value: string;
  description: string;
  icon: string; // Lucide icon name or helper string
}

export interface SmartFeatureItem {
  title: string;
  description: string;
  benefit: string;
  icon: string;
}

export interface SmartFeatures {
  check: string[];
  command: string[];
  connect: string[];
  drive: SmartFeatureItem[];
}

export interface ShowcaseItem {
  title: string;
  description: string;
  imageUrl: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "battery" | "charging" | "warranty" | "ownership" | "general" | "adas" | "service";
}

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  type: "Sedan" | "SUV" | "Crossover" | "Roadster" | "Shooting Brake";
  tagline: string;
  priceOTR: number; // in IDR/Millions or absolute USD. Let's use IDR formatted with elegant rupiah string for authentic Indonesian dealership feel (since the prefilled WhatsApp messages are in Indonesian like "Halo Kak, Saya tertarik dengan [Nama Mobil]...", let's state prices in "Milyar Rupiah" or "Juta Rupiah"), or a clean conversion that reads beautifully. E.g., Rp 1.150.000.000 OTR.
  priceLabel: string; // e.g. "Rp 1.150.000.000"
  range: number; // in km (e.g. 580)
  batteryCapacity: string; // e.g., "82.5 kWh"
  fastChargingTime: string; // e.g., "26 Mins (10-80%)"
  power: string; // e.g., "530 HP"
  acceleration: string; // e.g., "3.8 Sec (0-100)"
  warranty: string; // e.g., "8 Years / 160.000 km"
  topSpeed: string; // e.g., "240 km/h"
  colors: EVColor[];
  gallery: {
    front: string;
    rear: string;
    side: string;
    interior: string;
    dashboard: string;
    seat: string;
    cargo: string;
    charging: string;
  };
  highlights: EVHighlight[];
  smartFeatures: SmartFeatures;
  specifications: EVSpecGroup[];
  interiorShowcase: ShowcaseItem[];
  exteriorShowcase: ShowcaseItem[];
}

export interface TestDriveSubmission {
  name: string;
  phone: string;
  city: string;
  vehicleId: string;
  date: string;
  time: string;
  notes: string;
}
