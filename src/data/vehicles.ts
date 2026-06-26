import { Vehicle, EVColor, EVHighlight, SmartFeatures, EVSpecGroup, ShowcaseItem } from "../types";

// Reusable structured data interface for internal schema
export interface RawVehicleData {
  id: string;
  name: string;
  brand: string;
  type: "Sedan" | "SUV" | "Crossover" | "Roadster" | "Shooting Brake";
  tagline: string;
  description: string;
  priceOTR: number;
  priceLabel: string;
  
  performance: {
    batteryCapacity: string;
    maxPower: string;
    maxTorque: string;
    range: number; // in km
    fastChargingTime: string; // e.g. "24–26 Minutes"
    driveType: string; // e.g. "Rear Wheel Drive (RWD)"
    motorType?: string; // e.g. "Permanent Magnet Synchronous Motor"
    kersRegen?: string; // e.g. "KERS Regenerative Braking (3 Levels)"
    acceleration: string;
    topSpeed: string;
    warranty: string;
  };

  dimensions: {
    length: number; // mm
    width: number; // mm
    height: number; // mm
    wheelbase: number; // mm
    groundClearance?: number; // mm
  };

  featuredTechnologies: string[];
  safetyFeatures: string[];
  variants?: string[];
  iSmartConnectivity?: string[];

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

  interiorShowcase: ShowcaseItem[];
  exteriorShowcase: ShowcaseItem[];
}

// Global dictionary for ADAS and Safety Features descriptions
const ADAS_DICTIONARY: Record<string, { description: string; benefit: string; icon: string }> = {
  "Adaptive Cruise Control (ACC)": {
    description: "Mengunci kecepatan jelajah sekaligus mengkalkulasi radar jarak aman guna melakukan pengereman dan re-akselerasi mandiri sesuai arus lalu lintas di depan.",
    benefit: "Menghapuskan rasa lelah berkendara jauh di jalan tol bebas hambatan sepenuhnya.",
    icon: "GitMerge"
  },
  "Autonomous Emergency Braking (AEB)": {
    description: "Mengaktifkan pengereman hidrolik penuh secara otomatis seketika jika pengemudi terlambat merespon sinyal benturan atau deteksi pejalan kaki di hadapannya.",
    benefit: "Melindungi keselamatan penumpang secara maksimal meskipun dalam krisis panik total.",
    icon: "CheckCircle"
  },
  "Blind Spot Detection (BSD)": {
    description: "Sensor radar aktif mendeteksi ruang buta di belakang samping mobil dan menyalakan lampu peringatan oranye terang pada ujung kaca spion.",
    benefit: "Memudahkan perpindahan lajur atau menyalip di jalan tol dengan aman tanpa khawatir blindspot.",
    icon: "Eye"
  },
  "Lane Keeping Assist (LKA)": {
    description: "Membantu mengoreksi kemudi secara halus agar mobil tetap berada tepat di tengah lajur jalan raya secara otonom.",
    benefit: "Mencegah kecelakaan fatal akibat kelelahan yang menyebabkan mobil melenceng keluar lajur.",
    icon: "TrendingUp"
  },
  "Traffic Jam Assist (TJA)": {
    description: "Asisten aktif kecepatan rendah yang menyelaraskan setir serta kecepatan otomatis untuk merayap santai mengikuti kepadatan lalu lintas.",
    benefit: "Mengubah kemacetan berat menjadi pengalaman berkendara santai dan bebas stres.",
    icon: "Activity"
  },
  "Rear Cross Traffic Alert (RCTA)": {
    description: "Mendeteksi pergerakan kendaraan lain di area buta belakang saat mobil berjalan mundur keluar dari area parkir sempit.",
    benefit: "Menyelamatkan bagian belakang bumper mobil dari potensi tabrakan tak terduga.",
    icon: "Compass"
  },
  "Intelligent High Beam Control (IHC)": {
    description: "Mematikan lampu jauh secara otomatis seketika saat mendeteksi pendar lampu dari kendaraan berlawanan arah.",
    benefit: "Memberikan pencahayaan malam maksimal tanpa membutakan pandangan pengendara lain.",
    icon: "Users"
  },
  "Lane Change Assist (LCA)": {
    description: "Membantu mengontrol pergerakan setir dan mendeteksi lajur kosong saat pengemudi mengaktifkan lampu sein untuk berpindah lajur.",
    benefit: "Perpindahan lajur kecepatan tinggi yang presisi dan aman di jalan tol.",
    icon: "Sliders"
  },
  "Emergency Lane Keeping (ELK)": {
    description: "Sistem intervensi darurat otonom yang kuat untuk mengembalikan mobil ke lajur jalan jika mendeteksi risiko slip keluar jalan.",
    benefit: "Keamanan ekstra berlapis dalam kondisi cuaca buruk atau jalan licin.",
    icon: "ShieldAlert"
  },
  "Door Open Warning (DOW)": {
    description: "Sistem alarm aktif yang memperingatkan penumpang jika ada kendaraan atau pengendara sepeda mendekat dari belakang saat pintu hendak dibuka.",
    benefit: "Mencegah benturan pintu yang tidak sengaja dengan pengguna jalan lain.",
    icon: "Wind"
  },
  "360° HD Surround View Camera": {
    description: "Menghadirkan visualisasi perspektif mata burung (bird's-eye view) secara real-time dari kamera surround berdefinisi tinggi di sekeliling bodi mobil.",
    benefit: "Kemudahan memarkir mobil di ruang sempit dan menghindari hambatan rendah dengan presisi sempurna.",
    icon: "Maximize2"
  },
  "7 Airbags": {
    description: "Perlindungan kantung udara berlapis-lapis yang melingkupi baris depan, tirai samping, serta perlindungan lutut pengemudi.",
    benefit: "Proteksi keselamatan pasif tingkat tertinggi saat terjadi benturan keras.",
    icon: "ShieldCheck"
  },
  "6 Airbags": {
    description: "Kantung udara komprehensif untuk pengemudi, penumpang depan, serta curtain airbags di sepanjang jendela samping.",
    benefit: "Mereduksi energi benturan samping dan depan demi keselamatan seluruh keluarga.",
    icon: "ShieldCheck"
  }
};

export const rawVehiclesData: RawVehicleData[] = [
  {
    id: "mg-s5-ev",
    name: "MG S5 EV",
    brand: "MG",
    type: "SUV",
    tagline: "The Smart Family-First Advanced Electric SUV",
    description: "MG S5 EV hadir sebagai SUV listrik modern dengan desain sporty, teknologi canggih, dan performa bertenaga. Mengusung sistem penggerak Rear Wheel Drive (RWD), MG S5 EV menawarkan pengalaman berkendara yang lebih responsif dan stabil.",
    priceOTR: 333900000,
    priceLabel: "Rp 333.900.000 - Rp 355.900.000 OTR",
    performance: {
      batteryCapacity: "49 kWh",
      maxPower: "170 PS",
      maxTorque: "250 Nm",
      range: 410, // NEDC
      fastChargingTime: "10-80% dalam ±35 menit",
      driveType: "Rear Wheel Drive (RWD)",
      acceleration: "7.5 Sec (0-100)",
      topSpeed: "170 km/h",
      warranty: "8 Years / 160.000 km"
    },
    dimensions: {
      length: 4476,
      width: 1849,
      height: 1621,
      wheelbase: 2730
    },
    featuredTechnologies: [
      "MG Pilot (ADAS)",
      "360° Camera",
      "Panoramic Sunroof",
      "Wireless Charger",
      "Vehicle-to-Load (V2L)",
      "i-SMART Connected Car System",
      "One Pedal Driving System",
      "12.8\" Touchscreen Infotainment",
      "Wireless Apple CarPlay",
      "Wireless Android Auto",
      "Power Tailgate with Kick Sensor"
    ],
    safetyFeatures: [
      "7 Airbags",
      "360° HD Surround View Camera",
      "Adaptive Cruise Control (ACC)",
      "Autonomous Emergency Braking (AEB)",
      "Blind Spot Detection (BSD)",
      "Lane Keeping Assist (LKA)",
      "Traffic Jam Assist (TJA)"
    ],
    variants: [
      "Ignite",
      "Magnify"
    ],
    colors: [
      {
        name: "York White",
        hex: "#F1F5F9",
        imageUrl: "/src/assets/images/mgs5v_white_1782142482554.jpg"
      },
      {
        name: "Pearl Black",
        hex: "#111827",
        imageUrl: "/src/assets/images/mgs5v_black_1782142496949.jpg"
      },
      {
        name: "Andes Grey",
        hex: "#6B7280",
        imageUrl: "/src/assets/images/mgs5_andes_grey_1782462921432.jpg"
      },
      {
        name: "Flare Red",
        hex: "#EF4444",
        imageUrl: "/src/assets/images/mgs5v_red_1782142467416.jpg"
      }
    ],
    gallery: {
      front: "/src/assets/images/mgs5v_red_1782142467416.jpg",
      rear: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1200",
      side: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&q=80&w=1200",
      interior: "https://images.unsplash.com/photo-1619590059239-cf3a200e13c8?auto=format&fit=crop&q=80&w=1200",
      dashboard: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200",
      seat: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200",
      cargo: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200",
      charging: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?auto=format&fit=crop&q=80&w=1200"
    },
    interiorShowcase: [
      {
        title: "Dynamic 12.8\" Touchscreen Infotainment",
        description: "Menghadirkan layar hiburan sentral berukuran 12.8 inci dengan respons cepat, konektivitas Apple CarPlay & Android Auto nirkabel.",
        imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200"
      },
      {
        title: "Premium Family Space & Sunroof",
        description: "Kabin lapang dirancang untuk kenyamanan keluarga maksimal, diperindah dengan Panoramic Sunroof besar tipe Magnify Max.",
        imageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    exteriorShowcase: [
      {
        title: "Sporty Aerodynamic Silhouette",
        description: "Garis bodi yang tegas dan sporty menyatu dengan fungsionalitas SUV listrik keluarga modern berkelas tinggi.",
        imageUrl: "/src/assets/images/mgs5v_red_1782142467416.jpg"
      }
    ]
  },
  {
    id: "mg-zs-ev",
    name: "MG ZS EV",
    brand: "MG",
    type: "SUV",
    tagline: "The Adventure-Ready Premium Electric SUV",
    description: "MG ZS EV merupakan SUV listrik modern yang menggabungkan desain stylish, teknologi pintar, dan efisiensi berkendara.",
    priceOTR: 319000000,
    priceLabel: "Rp 319.000.000 OTR",
    performance: {
      batteryCapacity: "50.3 kWh",
      maxPower: "177 PS",
      maxTorque: "280 Nm",
      range: 403, // NEDC
      fastChargingTime: "30-80% dalam ±30 menit",
      driveType: "Front Wheel Drive (FWD)",
      motorType: "Permanent Magnet Synchronous Motor",
      kersRegen: "KERS Regenerative Braking (3 Levels)",
      acceleration: "8.0 Sec (0-100)",
      topSpeed: "175 km/h",
      warranty: "8 Years / 160.000 km"
    },
    dimensions: {
      length: 4323,
      width: 1809,
      height: 1649,
      wheelbase: 2585,
      groundClearance: 161
    },
    featuredTechnologies: [
      "MG Pilot (ADAS)",
      "Sunroof Panoramic",
      "360° Camera",
      "Wireless Charger",
      "i-SMART Connectivity",
      "6 Airbags",
      "10.1\" Touchscreen Infotainment",
      "Vehicle-to-Load (V2L)",
      "Smart Entry System",
      "7\" Digital Instrument Cluster",
      "Electric Folding Door Mirror",
      "PM 2.5 Air Filter"
    ],
    safetyFeatures: [
      "6 Airbags",
      "360° HD Surround View Camera",
      "Adaptive Cruise Control (ACC)",
      "Autonomous Emergency Braking (AEB)",
      "Lane Keeping Assist (LKA)",
      "Blind Spot Detection (BSD)",
      "Rear Cross Traffic Alert (RCTA)",
      "Traffic Jam Assist (TJA)",
      "Intelligent High Beam Control (IHC)"
    ],
    iSmartConnectivity: [
      "Vehicle Status Monitoring",
      "Digital Key Technology",
      "Find My Car",
      "Charging Management",
      "Smart Navigation",
      "Voice Command",
      "Smart Call & i-Call"
    ],
    colors: [
      {
        name: "St. Moritz Blue",
        hex: "#1E40AF",
        imageUrl: "/src/assets/images/mgzsev_blue_1782142531631.jpg"
      },
      {
        name: "Flare Red",
        hex: "#DC2626",
        imageUrl: "/src/assets/images/mgzsev_red_1782142557245.jpg"
      },
      {
        name: "York White",
        hex: "#F8FAFC",
        imageUrl: "/src/assets/images/mgzs_york_white_1782462939640.jpg"
      },
      {
        name: "Blade Silver",
        hex: "#94A3B8",
        imageUrl: "/src/assets/images/mgzsev_silver_1782142545037.jpg"
      },
      {
        name: "Black Pearl",
        hex: "#0F172A",
        imageUrl: "/src/assets/images/mgzsev_black_1782142571688.jpg"
      }
    ],
    gallery: {
      front: "/src/assets/images/mgzsev_blue_1782142531631.jpg",
      rear: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200",
      side: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200",
      interior: "https://images.unsplash.com/photo-1619590059239-cf3a200e13c8?auto=format&fit=crop&q=80&w=1200",
      dashboard: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200",
      seat: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200",
      cargo: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200",
      charging: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?auto=format&fit=crop&q=80&w=1200"
    },
    interiorShowcase: [
      {
        title: "Intelligent Cyber Cockpit",
        description: "Setir sport berbalut kulit dengan jahitan merah kontras yang tegas, dipadukan teknologi MID digital modern.",
        imageUrl: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200"
      },
      {
        title: "PM 2.5 Fresh Air Filter System",
        description: "Filter udara mutakhir PM 2.5 menyaring debu mikro berbahaya secara aktif demi kesehatan sistem pernapasan keluarga.",
        imageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    exteriorShowcase: [
      {
        title: "Diamond-pattern Front Grille",
        description: "Fascia depan tertutup aerodinamis yang menampilkan pola bintik mutiara berlian mewah, tempat port charging tersembunyi.",
        imageUrl: "/src/assets/images/mgzsev_blue_1782142531631.jpg"
      }
    ]
  },
  {
    id: "mg4-ev",
    name: "MG 4 EV",
    brand: "MG",
    type: "Crossover",
    tagline: "The Hyper-Futuristic Cyber Hatchback with Pure RWD",
    description: "MG 4 EV adalah hatchback listrik modern yang menggabungkan desain sporty, handling dinamis, dan teknologi pintar. Dibangun di atas platform kendaraan listrik khusus dengan sistem Rear Wheel Drive (RWD).",
    priceOTR: 289000000,
    priceLabel: "Rp 289.000.000 OTR",
    performance: {
      batteryCapacity: "51 kWh (Magnify) / 64 kWh (Magnify Max)",
      maxPower: "170 PS (125 kW)",
      maxTorque: "250 Nm",
      range: 425, // NEDC
      fastChargingTime: "10-80% dalam ±35 menit (51 kWh) atau ±26 menit (64 kWh)",
      driveType: "Rear Wheel Drive (RWD)",
      motorType: "Permanent Magnet Synchronous Motor",
      kersRegen: "KERS Regenerative Braking (3 Levels)",
      acceleration: "7.7 Sec (0-100)",
      topSpeed: "160 km/h",
      warranty: "8 Years / 160.000 km"
    },
    dimensions: {
      length: 4287,
      width: 1836,
      height: 1516,
      wheelbase: 2705
    },
    featuredTechnologies: [
      "MG Pilot (ADAS)",
      "360° Camera",
      "Wireless Charger",
      "Vehicle-to-Load (V2L)",
      "Apple CarPlay & Android Auto",
      "i-SMART Connected Car System",
      "17\" Alloy Wheels",
      "LED Headlamp",
      "LED DRL",
      "Electric Folding Door Mirror",
      "10.25\" Touchscreen Infotainment",
      "7\" Digital Instrument Cluster",
      "Intelligent Smart Access",
      "Voice Command",
      "PM 2.5 Air Filter"
    ],
    safetyFeatures: [
      "6 Airbags",
      "360° HD Surround View Camera",
      "Adaptive Cruise Control (ACC)",
      "Autonomous Emergency Braking (AEB)",
      "Lane Keeping Assist (LKA)",
      "Blind Spot Detection (BSD)",
      "Rear Cross Traffic Alert (RCTA)",
      "Lane Change Assist (LCA)",
      "Emergency Lane Keeping (ELK)",
      "Door Open Warning (DOW)"
    ],
    iSmartConnectivity: [
      "Remote Vehicle Control",
      "Vehicle Diagnostics",
      "Vehicle Location Tracking",
      "Digital Key Technology",
      "Smart Navigation",
      "Smart Call & i-Call",
      "Online Music Information",
      "Weather Information"
    ],
    colors: [
      {
        name: "Brighton Blue",
        hex: "#1E40AF",
        imageUrl: "/src/assets/images/mg4ev_showroom_blue_1782463835967.jpg"
      },
      {
        name: "York White",
        hex: "#F1F5F9",
        imageUrl: "/src/assets/images/mg4ev_showroom_white_1782463850722.jpg"
      },
      {
        name: "Pearl Black",
        hex: "#0F172A",
        imageUrl: "/src/assets/images/mg4ev_showroom_black_1782463865736.jpg"
      },
      {
        name: "Andes Grey",
        hex: "#475569",
        imageUrl: "/src/assets/images/mg4ev_showroom_grey_1782463878742.jpg"
      },
      {
        name: "Flare Red",
        hex: "#DC2626",
        imageUrl: "/src/assets/images/mg4ev_showroom_red_1782463891305.jpg"
      },
      {
        name: "Fizzy Orange",
        hex: "#EA580C",
        imageUrl: "/src/assets/images/mg4ev_showroom_orange_1782463817314.jpg"
      },
      {
        name: "Medal Silver",
        hex: "#94A3B8",
        imageUrl: "/src/assets/images/mg4ev_showroom_silver_1782463904754.jpg"
      }
    ],
    gallery: {
      front: "/src/assets/images/mg4ev_showroom_orange_1782463817314.jpg",
      rear: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=1200",
      side: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=1200",
      interior: "https://images.unsplash.com/photo-1619590059239-cf3a200e13c8?auto=format&fit=crop&q=80&w=1200",
      dashboard: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
      seat: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200",
      cargo: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200",
      charging: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?auto=format&fit=crop&q=80&w=1200"
    },
    interiorShowcase: [
      {
        title: "Cyber-Minimal Cabin Layout",
        description: "Setir sport berpotongan ganda bersilang modern, dengan dashboard terapung menyajikan aura cyberpunk mengemudi sejati.",
        imageUrl: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=1200"
      },
      {
        title: "Floating Center Console with Wireless Charger",
        description: "Konsol tengah terapung yang futuristik dan minimalis, menyederhanakan ruang kemudi dan memberikan akses mudah ke pengisi daya nirkabel.",
        imageUrl: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200"
      }
    ],
    exteriorShowcase: [
      {
        title: "Split Rear Wing Spoiler",
        description: "Sayap aerofoil bagian belakang terbelah menjadi dua bilah sejajar elegan yang mengarahkan angin mulus bebas hambatan.",
        imageUrl: "/src/assets/images/mg4ev_showroom_orange_1782463817314.jpg"
      }
    ]
  }
];

// Helper to dynamically build EVSpecGroup specifications for each vehicle
function generateSpecifications(v: RawVehicleData): EVSpecGroup[] {
  const specs: EVSpecGroup[] = [];

  // 1. Dimensions (Dimensi)
  const dimensiItems = [
    { label: "Panjang", value: `${v.dimensions.length} mm` },
    { label: "Lebar", value: `${v.dimensions.width} mm` },
    { label: "Tinggi", value: `${v.dimensions.height} mm` },
    { label: "Wheelbase", value: `${v.dimensions.wheelbase} mm` },
  ];
  if (v.dimensions.groundClearance) {
    dimensiItems.push({ label: "Ground Clearance", value: `${v.dimensions.groundClearance} mm` });
  }
  specs.push({
    category: "Dimensi",
    items: dimensiItems,
  });

  // 2. Performance (Performa)
  const performaItems = [
    { label: "Sistem Penggerak", value: v.performance.driveType },
    { label: "Tenaga Maksimum", value: v.performance.maxPower },
    { label: "Torsi Maksimum", value: v.performance.maxTorque },
    { label: "Kecepatan Maksimum", value: v.performance.topSpeed },
    { label: "Akselerasi (0-100 km/h)", value: v.performance.acceleration },
  ];
  if (v.performance.motorType) {
    performaItems.push({ label: "Tipe Motor", value: v.performance.motorType });
  }
  specs.push({
    category: "Performa",
    items: performaItems,
  });

  // 3. Battery (Baterai)
  let rangeValue = `${v.performance.range} km`;
  if (v.id === "mg-s5-ev") {
    rangeValue = `hingga ${v.performance.range} km`;
  } else if (v.id === "mg4-ev") {
    rangeValue = `425 km (51 kWh) / hingga 540 km (64 kWh)`;
  } else if (v.id === "mg-zs-ev") {
    rangeValue = `${v.performance.range} km (NEDC)`;
  }

  const bateraiItems = [
    { label: "Kapasitas Baterai", value: v.performance.batteryCapacity },
    { label: "Jarak Tempuh (NEDC)", value: rangeValue },
  ];
  if (v.performance.kersRegen) {
    bateraiItems.push({ label: "Sistem KERS", value: v.performance.kersRegen });
  }
  specs.push({
    category: "Baterai",
    items: bateraiItems,
  });

  // 4. Charging (Pengisian Daya)
  const chargingItems = [
    { label: "Pengisian Cepat DC", value: v.performance.fastChargingTime },
  ];
  specs.push({
    category: "Pengisian Daya",
    items: chargingItems,
  });

  // 5. Safety (Keamanan)
  const safetyItems = v.safetyFeatures.map((feat) => {
    return { label: feat, value: "Terintegrasi Standar" };
  });
  specs.push({
    category: "Keamanan",
    items: safetyItems,
  });

  // 6. Technology (Teknologi Kabin)
  const techItems = v.featuredTechnologies.map((feat) => {
    return { label: feat, value: "Tersedia" };
  });
  if (v.iSmartConnectivity && v.iSmartConnectivity.length > 0) {
    techItems.push({
      label: "Konektivitas i-SMART",
      value: v.iSmartConnectivity.join(", "),
    });
  }
  specs.push({
    category: "Teknologi Kabin",
    items: techItems,
  });

  return specs;
}

// Helper to dynamically build EVHighlight elements for each vehicle
function generateHighlights(v: RawVehicleData): EVHighlight[] {
  const highlights: EVHighlight[] = [];

  // Match corresponding prominent features for each vehicle
  if (v.id === "mg-s5-ev") {
    highlights.push({
      title: "Rear Wheel Drive (RWD)",
      value: "Rear Wheel Drive",
      description: "Mengusung sistem penggerak roda belakang (RWD) untuk menawarkan pengalaman berkendara yang lebih responsif, dinamis, dan stabil di berbagai kondisi jalan.",
      icon: "TrendingUp"
    });
    highlights.push({
      title: "One Pedal Driving",
      value: "One Pedal System",
      description: "Memaksimalkan efisiensi energi baterai dan kemudahan kemudi perkotaan dengan deselerasi regeneratif aktif cukup menggunakan satu pedal.",
      icon: "Zap"
    });
    highlights.push({
      title: "Panoramic Sunroof",
      value: "Magnify Max Sky",
      description: "Panoramic Sunroof mewah yang melingkupi kabin, memberikan pencahayaan alami yang elegan dan atmosfer premium bagi seluruh keluarga.",
      icon: "Compass"
    });
  } else if (v.id === "mg-zs-ev") {
    highlights.push({
      title: "I-MAX Panoramic Sunroof",
      value: "Sky Sunroof",
      description: "Electric I-MAX Panoramic Sunroof kaca raksasa elektris membuka eksposur cahaya alami dan kemewahan pemandangan langit romantis.",
      icon: "Compass"
    });
    highlights.push({
      title: "Vehicle-to-Load (V2L)",
      value: "V2L Power Source",
      description: "Menyuplai listrik luar ruangan bertegangan AC langsung dari mobil untuk mengisi daya laptop, kulkas portabel, atau kompor piknik Anda saat berkemah.",
      icon: "Zap"
    });
    highlights.push({
      title: "i-SMART Connectivity",
      value: "Smart Connection",
      description: "Sistem konektivitas pintar terintegrasi penuh untuk status monitoring, digital key, voice command, dan asisten darurat i-Call.",
      icon: "Cpu"
    });
  } else {
    // MG4 EV
    highlights.push({
      title: "Pure Rear-Wheel Drive (RWD)",
      value: "Rear Wheel Drive",
      description: "Menghadirkan sensasi menyetir sporty & lincah berkat distribusi berat seimbang sempurna serta penggerak roda belakang murni.",
      icon: "TrendingUp"
    });
    highlights.push({
      title: "Avant-Garde Aerodynamics",
      value: "Cyber Hatchback",
      description: "Desain radikal cyberpunk dengan lekukan bodi sporty meningkatkan traksi jalan raya pada kecepatan tinggi secara efisien.",
      icon: "Compass"
    });
    highlights.push({
      title: "i-SMART Connectivity",
      value: "Smart Ecosystem",
      description: "Konektivitas ekosistem i-SMART yang mumpuni dengan remote vehicle control, digital key, asisten navigasi online, dan asisten cuaca real-time.",
      icon: "Cpu"
    });
  }

  return highlights;
}

// Helper to dynamically build SmartFeatures specifications for each vehicle
function generateSmartFeatures(v: RawVehicleData): SmartFeatures {
  const check: string[] = [
    "Status Kapasitas Baterai Real-Time & Estimasi Jarak",
    "Pemantau Tekanan & Suhu Ban Presisi Tinggi (TPMS)",
    "Status Penguncian Pintu & Jendela Terkini",
    "Suhu Komponen Utama & Sirkuit Pendingin Baterai"
  ];

  const command: string[] = [
    "Aktivasi AC Cabin Pre-cooling Jarak Jauh",
    "Membuka & Mengunci Pintu via Aplikasi HP",
    "Mengontrol Kaca Jendela & Pintu Bagasi Listrik"
  ];
  if (v.featuredTechnologies.includes("Power Tailgate with Kick Sensor")) {
    command.push("Power Tailgate Control dengan Sensor Tendangan");
  }

  const connect: string[] = [
    v.featuredTechnologies.includes("Wireless Apple CarPlay") ? "Konektivitas Nirkabel Apple CarPlay" : "Konektivitas Apple CarPlay",
    v.featuredTechnologies.includes("Wireless Android Auto") ? "Konektivitas Nirkabel Android Auto" : "Konektivitas Android Auto",
    "Sinyal GPS Lokasi Mobil Presisi Tinggi secara Real-time"
  ];
  if (v.iSmartConnectivity) {
    connect.push("Asisten Suara Pintar untuk Kontrol Fitur Kabin");
    connect.push("Pembaruan Perangkat Lunak Over-the-Air (OTA)");
  }

  // Generate safety/ADAS information dynamically from the safetyFeatures list
  const drive: { title: string; description: string; benefit: string; icon: string }[] = [];
  v.safetyFeatures.forEach((feat) => {
    // If we have detailed documentation in our dictionary, pull it!
    const dictItem = ADAS_DICTIONARY[feat];
    if (dictItem) {
      drive.push({
        title: feat,
        description: dictItem.description,
        benefit: dictItem.benefit,
        icon: dictItem.icon
      });
    } else {
      // Fallback
      drive.push({
        title: feat,
        description: `Sistem perlindungan keselamatan aktif ${feat} terintegrasi secara cerdas untuk melindungi perjalanan Anda.`,
        benefit: "Menjamin keselamatan tanpa gesekan melenceng berbahaya di jalur cepat.",
        icon: "ShieldCheck"
      });
    }
  });

  return {
    check,
    command,
    connect,
    drive
  };
}

// Convert RawVehicleData array into clean, fully-compliant Vehicle interface array
export const vehicles: Vehicle[] = rawVehiclesData.map((v) => {
  return {
    id: v.id,
    name: v.name,
    brand: v.brand,
    type: v.type,
    tagline: v.tagline,
    priceOTR: v.priceOTR,
    priceLabel: v.priceLabel,
    range: v.performance.range,
    batteryCapacity: v.performance.batteryCapacity,
    fastChargingTime: v.performance.fastChargingTime,
    power: v.performance.maxPower,
    acceleration: v.performance.acceleration,
    warranty: v.performance.warranty,
    topSpeed: v.performance.topSpeed,
    colors: v.colors,
    gallery: v.gallery,
    interiorShowcase: v.interiorShowcase,
    exteriorShowcase: v.exteriorShowcase,
    highlights: generateHighlights(v),
    smartFeatures: generateSmartFeatures(v),
    specifications: generateSpecifications(v)
  };
});
