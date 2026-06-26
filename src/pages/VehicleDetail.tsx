import React, { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { vehicles } from "../data";
import {
  Zap,
  Cpu,
  Compass,
  ShieldCheck,
  ShieldAlert,
  Smartphone,
  MessageSquare,
  ArrowRight,
  Car,
  Activity,
  Maximize2,
  Gauge,
  Sliders,
  Volume2,
  CheckCircle,
  TrendingUp,
  GitMerge,
  Eye,
  Settings,
  Tv,
  Users,
  Wind
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function VehicleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Find the exact matching vehicle or default to first
  const vehicle = useMemo(() => {
    const found = vehicles.find((v) => v.id === id);
    return found || vehicles[0];
  }, [id]);

  // States for UX personalization
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [currentGalleryKey, setCurrentGalleryKey] = useState<keyof typeof vehicle.gallery>("front");
  
  // Accordion active keys
  const [activeSmartCategory, setActiveSmartCategory] = useState<string>("smart-drive");
  const [activeSpecCategory, setActiveSpecCategory] = useState<string>("Battery");

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(price);
  };

  // Redirection helpers
  const handleWhatsAppChat = (mobilName: string) => {
    const phoneNumber = "628131422804";
    const textMessage = encodeURIComponent(
      `Halo Kak,\n\nSaya tertarik dengan ${mobilName}.\nMohon informasi lengkap mengenai promo cashback terbaru, ketersediaan warna, serta jadwal unit test drive.\n\nTerima kasih!`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${textMessage}`, "_blank", "noopener,noreferrer");
  };

  const handleSimulasiKredit = (mobilName: string) => {
    const phoneNumber = "628131422804";
    const textMessage = encodeURIComponent(
      `Halo Kak,\n\nSaya tertarik dengan [${mobilName}].\n\nMohon informasi mengenai:\n• Simulasi kredit\n• Harga terbaru\n• Promo yang tersedia\n• Jadwal test drive\n\nTerima kasih.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${textMessage}`, "_blank", "noopener,noreferrer");
  };

  // Icon mapping dictionary to resolve dynamic string icon names from vehicles.ts
  const iconMap: Record<string, React.ComponentType<any>> = {
    Zap,
    Cpu,
    Compass,
    ShieldCheck,
    ShieldAlert,
    Smartphone,
    MessageSquare,
    ArrowRight,
    Car,
    Activity,
    Maximize2,
    Gauge,
    Sliders,
    Volume2,
    CheckCircle,
    TrendingUp,
    GitMerge,
    Eye,
    Settings,
    Tv,
    Users,
    Wind
  };

  return (
    <div className="bg-slate-50 pt-28 pb-20 font-sans" id={`vehicle-details-${vehicle.id}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8" id="detail-breadcrumb">
          <Link to="/" className="hover:text-red-650 transition-colors">Showroom</Link>
          <span>/</span>
          <Link to="/vehicles" className="hover:text-red-650 transition-colors">Lineup</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold">{vehicle.brand} {vehicle.name}</span>
        </div>

        {/* SECTION 1: VEHICLE HERO */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-premium border border-slate-100 mb-12" id="hero-technical-segment">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side: Premium Gallery Preview with Dynamic Color mapping */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              {/* Dynamic Studio Viewer Canvas */}
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-8 border border-slate-100 flex items-center justify-center relative overflow-hidden h-[300px] sm:h-[420px]">
                {/* Real-time background gradient based on color hex */}
                <div 
                  className="absolute inset-0 opacity-10 transition-all duration-700" 
                  style={{ backgroundColor: vehicle.colors[selectedColorIndex]?.hex || "#000" }}
                ></div>
                
                {/* Gradient ring */}
                <div className="absolute w-[80%] h-[80%] bg-gradient-to-t from-gray-100 to-transparent rounded-full -bottom-1/3 blur-xl pointer-events-none -z-10"></div>
                
                <motion.img
                  key={`${selectedColorIndex}-${currentGalleryKey}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  src={
                    currentGalleryKey === "front" 
                      ? (vehicle.colors[selectedColorIndex]?.imageUrl || vehicle.gallery.front)
                      : vehicle.gallery[currentGalleryKey]
                  }
                  alt={vehicle.name}
                  className="max-h-full max-w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)] pr-referrer"
                  referrerPolicy="no-referrer"
                />

                {/* Perspective Badge */}
                <div className="absolute bottom-4 left-4 bg-gray-950 text-white font-mono text-[9px] tracking-widest uppercase font-semibold py-1 px-3 rounded-full">
                  {currentGalleryKey === "front" ? `${vehicle.colors[selectedColorIndex]?.name} Profile` : `${currentGalleryKey} view`}
                </div>
              </div>

              {/* SECTION 2: INTERACTIVE GALLERY (Thumbnail Navigation) */}
              <div id="interactive-thumbnails-slider">
                <p className="text-[10px] font-bold font-mono tracking-wider text-gray-400 uppercase mb-3 text-left">
                  Tinjauan Visual Koleksi (Klik Ganti Angle)
                </p>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                  {(Object.keys(vehicle.gallery) as Array<keyof typeof vehicle.gallery>).map((key) => {
                    const isSelected = currentGalleryKey === key;
                    const imageUrl = vehicle.gallery[key];
                    const keyStr = String(key);
                    return (
                      <button
                        key={keyStr}
                        onClick={() => setCurrentGalleryKey(key)}
                        className={`relative aspect-square rounded-xl bg-gray-100 overflow-hidden border-2 transition-all cursor-pointer ${
                          isSelected ? "border-red-600 ring-2 ring-red-100" : "border-transparent opacity-70 hover:opacity-100"
                        }`}
                        aria-label={`View ${keyStr}`}
                      >
                        <img 
                          src={imageUrl} 
                          alt={keyStr} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/5"></div>
                        <div className="absolute bottom-1 w-full text-center text-[8px] font-mono font-bold text-white uppercase tracking-tighter bg-black/40 py-0.5">
                          {keyStr}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3: COLOR SELECTOR */}
              <div className="border-t border-gray-100 pt-6" id="interactive-color-selector">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xs font-bold font-mono tracking-wider text-gray-500 uppercase">
                      Studio Eksterior Warna
                    </h3>
                    <p className="text-sm font-extrabold text-gray-800 mt-1">
                      {vehicle.colors[selectedColorIndex]?.name}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {vehicle.colors.map((color, index) => {
                      const isSelected = selectedColorIndex === index;
                      return (
                        <button
                          key={color.name}
                          onClick={() => {
                            setSelectedColorIndex(index);
                            setCurrentGalleryKey("front"); // Reset to front template to show exact color choice
                          }}
                          className={`w-9 h-9 rounded-full border-2 transition-all flex items-center justify-center relative cursor-pointer ${
                            isSelected ? "border-red-600 scale-110 shadow-md" : "border-gray-200"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                          aria-label={`Select color ${color.name}`}
                        >
                          {isSelected && (
                            <span className="w-2.5 h-2.5 bg-white rounded-full mix-blend-difference"></span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* Right side: Detailed Purchase Specs, Pricing, and direct checkout routes */}
            <div className="lg:col-span-5 flex flex-col items-start text-left h-full justify-center">
              
              <div className="inline-block bg-slate-100/90 text-slate-800 text-[10px] font-mono tracking-widest uppercase font-bold py-1 px-3 rounded-md mb-3">
                {vehicle.brand} SHOWROOM SPEC SERIES
              </div>
              
              <h1 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight uppercase">
                {vehicle.name}
              </h1>
              
              <p className="font-sans text-slate-500 text-sm mt-3 italic leading-relaxed">
                "{vehicle.tagline}"
              </p>

              {/* Pricing Showcase Block (SECTION 9 Pricing Policy is fully replicated here for top funnel conversion) */}
              <div className="bg-gradient-to-r from-red-50 to-white border border-red-100 rounded-3xl p-6 w-full mt-6 mb-7 text-left shadow-sm">
                <span className="text-[10px] font-bold font-mono tracking-wider text-red-650 text-red-650 uppercase">
                  Harga Resmi OTR Jakarta
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-red-650 mt-1 tracking-tight">
                  {vehicle.id === "mg-s5-ev" 
                    ? "Rp 333.900.000 (Ignite) / Rp 355.900.000 (Magnify)" 
                    : vehicle.id === "mg4-ev"
                    ? "Rp 289.000.000 (Mulai)"
                    : formatPrice(vehicle.priceOTR)}
                </div>
                <div className="text-[11px] font-bold text-slate-700 mt-2 font-mono">
                  Detail OTR: {vehicle.priceLabel}
                </div>
                <p className="text-[10px] text-slate-400 font-mono mt-2 leading-relaxed">
                  *Sudah termasuk Insentif PPN 10% Pemerintah, Bebas Ganjil Genap, Bebas PKB tahunan, & Free instalasi Wall Charger 11kW beserta kabel & garansi pemasangan.
                </p>
              </div>

              {/* Core metrics comparison */}
              <div className="grid grid-cols-2 gap-4 w-full border-t border-b border-slate-200 py-5 my-2 text-left font-mono text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">RATED MILEAGE RANGE</span>
                  <span className="text-base font-black text-slate-800">
                    {vehicle.id === "mg-s5-ev" 
                      ? "Hingga 410 KM (NEDC)" 
                      : vehicle.id === "mg4-ev" 
                      ? "425 - 540 KM (NEDC)" 
                      : `${vehicle.range} KM (NEDC)`}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">ACCELERATION SPEED</span>
                  <span className="text-base font-black text-slate-800">{vehicle.acceleration}</span>
                </div>
                <div className="mt-3">
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">MAXIMUM POWER</span>
                  <span className="text-base font-black text-slate-800">{vehicle.power}</span>
                </div>
                <div className="mt-3">
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">BATTERY CAPACITY</span>
                  <span className="text-base font-black text-emerald-600 font-mono">{vehicle.batteryCapacity}</span>
                </div>
                <div className="col-span-2 mt-4 pt-4 border-t border-slate-100">
                  <span className="text-slate-400 block font-semibold text-[10px] uppercase">OFFICIAL BATTERY WARRANTY</span>
                  <span className="text-xs font-black text-red-650 uppercase flex items-center gap-1.5 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 animate-pulse" /> Garansi Resmi {vehicle.warranty}
                  </span>
                </div>
              </div>

              {/* Conversion Buttons targeting WhatsApp and Test Drive form Booking */}
              <div className="flex flex-col gap-3 w-full mt-6" id="primary-conversion-panel">
                <Link
                  to={`/test-drive?vehicleId=${vehicle.id}`}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full text-center transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-red-600/10 hover:shadow-red-600/20"
                  id="btn-detail-book-testdrive"
                >
                  <Car className="w-4 h-4" /> Daftar Test Drive Gratis Sekarang
                </Link>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleWhatsAppChat(vehicle.brand + " " + vehicle.name)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-full transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-650/10"
                    id="btn-detail-whatsapp"
                  >
                    <MessageSquare className="w-4 h-4" /> Konsultasi Sales
                  </button>

                  <button
                    onClick={() => handleSimulasiKredit(vehicle.brand + " " + vehicle.name)}
                    className="bg-slate-950 hover:bg-slate-850 text-white font-bold text-xs uppercase tracking-widest py-4 rounded-full transition-all cursor-pointer flex items-center justify-center shadow-lg shadow-slate-950/10"
                    id="btn-detail-simulasikredit"
                  >
                    Simulasi Angsuran
                  </button>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* SECTION 4: VEHICLE HIGHLIGHTS */}
        <section className="mb-16" id="showroom-features-spec-highlights">
          <div className="text-left mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-650 font-mono">
              ENGINEERED ADVANTAGES
            </h2>
            <h3 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 tracking-tight mt-1 uppercase">
              Fokus Utama Inovasi & Keunggulan
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vehicle.highlights.map((hlt) => (
              <div 
                key={hlt.title}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 text-left hover:shadow-premium transition-all flex flex-col items-start shadow-sm"
              >
                <div className="bg-red-50 text-red-650 p-3 rounded-2xl mb-4">
                  <Zap className="w-5 h-5 fill-current" />
                </div>
                <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider">
                  {hlt.value}
                </span>
                <h4 className="font-display font-semibold text-lg text-slate-900 tracking-tight mt-1.5 uppercase">
                  {hlt.title}
                </h4>
                <p className="text-xs text-slate-500 mt-2.5 leading-relaxed font-light">
                  {hlt.description}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* SECTION 5: SMART FEATURES ACCORDION */}
        <section className="bg-gray-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-gray-800 mb-16" id="showroom-smart-features-panel">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-block bg-red-600 text-white text-[9px] font-mono tracking-widest font-extrabold px-3 py-1 rounded-full mb-3 uppercase">
              ★ MG EV GALLERY Connected Drive Suite
            </div>
            <h3 className="font-sans font-black text-2xl sm:text-4xl tracking-tight text-white uppercase">
              Fitur Cerdas Masa Depan
            </h3>
            <p className="font-sans text-gray-400 text-xs sm:text-sm font-light mt-2.5">
              Kelola dan pantau kendaraan sepenuhnya di genggaman Anda melalui integrasi software otonom mutakhir dan kecerdasan artifisial.
            </p>
          </div>

          {/* Navigation layout for Dynamic state selector of smart properties */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-gray-800 pb-6">
            {[
              { id: "smart-check", label: "Smart Check", desc: "Pemantauan Status" },
              { id: "smart-command", label: "Smart Command", desc: "Kontrol Jarak Jauh" },
              { id: "smart-connect", label: "Smart Connect", desc: "Konektivitas GPS" },
              { id: "smart-drive", label: "Smart Drive (ADAS)", desc: "10 Sensor Aktif" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveSmartCategory(cat.id)}
                className={`py-2 px-5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  activeSmartCategory === cat.id
                    ? "bg-red-600 text-white font-bold"
                    : "bg-gray-900 hover:bg-gray-850 text-gray-400 hover:text-white border border-gray-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Smart Details Display based on active category selection */}
          <div className="text-left">
            <AnimatePresence mode="wait">
              {activeSmartCategory === "smart-check" && (
                <motion.div
                  key="smart-check"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                    <h4 className="font-bold text-lg text-emerald-400 mb-4 flex items-center gap-1.5">
                      <Smartphone className="w-5 h-5" /> Smart Check System
                    </h4>
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                      Sistem komputer komprehensif mobil yang terus menyiarkan diagnostik kesehatan baterai utama, laju angin ban, kesehatan motor, dan keaslian firmware secara langsung ke aplikasi smartphone Anda kapan saja.
                    </p>
                    <div className="space-y-2.5 text-xs text-gray-250">
                      {vehicle.smartFeatures.check.map((chk, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-200">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          <span>{chk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex items-center justify-center">
                    <img
                      src={vehicle.gallery.charging}
                      alt="Telemetry screen mockup"
                      className="rounded-xl w-full h-48 object-cover opacity-60 mix-blend-screen"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              )}

              {activeSmartCategory === "smart-command" && (
                <motion.div
                  key="smart-command"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex items-center justify-center">
                    <img
                      src={vehicle.gallery.interior}
                      alt="Climate remote screen"
                      className="rounded-xl w-full h-48 object-cover opacity-60 mix-blend-screen"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                    <h4 className="font-bold text-lg text-red-400 mb-4 flex items-center gap-1.5">
                      <Cpu className="w-5 h-5" /> Smart Command Control
                    </h4>
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                      Lakukan instruksi kendali jarak jauh (remote execution) dimanapun Anda berada. Atur AC kabin sebelum masuk, turunkan jendela, kunci pintu utama, serta hidupkan sistem anti-pencuri sentry mode secara nirkabel.
                    </p>
                    <div className="space-y-2.5 text-xs text-gray-250">
                      {vehicle.smartFeatures.command.map((cmd, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-200">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          <span>{cmd}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSmartCategory === "smart-connect" && (
                <motion.div
                  key="smart-connect"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl">
                    <h4 className="font-bold text-lg text-blue-400 mb-4 flex items-center gap-1.5">
                      <Compass className="w-5 h-5" /> Smart Connect Tracking
                    </h4>
                    <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                      Konektivitas satelit murni dan GPS presisi tinggi yang melacak lokasi real-time mobil di peta, melakukan kalkulasi laju konsumsi baterai, dan merencanakan rute terdekat ke Stasiun Pengisian SPKLU terdekat.
                    </p>
                    <div className="space-y-2.5 text-xs text-gray-250">
                      {vehicle.smartFeatures.connect.map((con, i) => (
                        <div key={i} className="flex items-center gap-2 text-gray-200">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          <span>{con}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex items-center justify-center">
                    <img
                      src={vehicle.gallery.dashboard}
                      alt="GPS map screen"
                      className="rounded-xl w-full h-48 object-cover opacity-65 mix-blend-screen"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              )}

              {activeSmartCategory === "smart-drive" && (
                <motion.div
                  key="smart-drive"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-[11px] font-mono tracking-wider font-semibold text-red-500 block mb-6 px-1">
                    ✓ INDERA AKTIF ADAS TERLENGKAP DI SETIAP PILIHAN MOBIL LISTRIK
                  </p>
                  
                  {/* Grid Listing containing all safety systems dynamically generated from data source */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {vehicle.smartFeatures.drive.map((item, idx) => {
                      const IconComponent = iconMap[item.icon] || ShieldCheck;
                      return (
                        <div 
                          key={idx}
                          className="bg-gray-900/60 hover:bg-gray-900 border border-gray-850 hover:border-gray-800 p-5 rounded-2xl transition-all"
                        >
                          <div className="flex items-center gap-3 mb-2.5">
                            <div className="bg-red-950/80 border border-red-500/20 text-red-500 p-2.5 rounded-xl">
                              <IconComponent className="w-4.5 h-4.5 stroke-[2.5]" />
                            </div>
                            <div>
                              <h5 className="font-extrabold text-sm text-white tracking-tight">{item.title}</h5>
                              <span className="text-[8px] bg-red-950 text-red-400 px-1.5 py-0.5 rounded font-mono uppercase tracking-wider font-bold mt-0.5 inline-block">Safe Assist</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-gray-400 leading-relaxed">
                            {item.description}
                          </p>
                          <div className="mt-3 pt-3 border-t border-gray-850/60">
                            <span className="text-[9px] font-mono text-emerald-400 uppercase font-bold tracking-wider">Benefit Bagi Pengemudi:</span>
                            <p className="text-[11px] text-emerald-200 mt-1 leading-normal italic font-medium">"{item.benefit}"</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </section>


        {/* SECTION 6: FULL SPECIFICATIONS (Highly detailed accordion tables) */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 shadow-premium border border-gray-150 mb-16 text-left" id="showroom-full-specs-accordion font-sans">
          
          <div className="mb-8 pb-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-red-600 font-mono">
                FLAGSHIP DATASHEET
              </h2>
              <p className="font-sans font-black text-2xl sm:text-4xl text-gray-900 tracking-tight mt-1">
                Spesifikasi Teknis Lengkap
              </p>
            </div>
            <span className="text-xs text-gray-400 font-mono italic">
              *Tipe {vehicle.name} Model Year 2026
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Nav Table Spec Category Selector */}
            <div className="lg:col-span-3 flex flex-wrap lg:flex-col gap-1.5">
              {vehicle.specifications.map((spec) => (
                <button
                  key={spec.category}
                  onClick={() => setActiveSpecCategory(spec.category)}
                  className={`w-full text-left py-3.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                    activeSpecCategory === spec.category
                      ? "bg-red-50 text-red-600 border-l-4 border-red-600 font-black"
                      : "bg-[#FAFAFA] hover:bg-gray-100 text-gray-600"
                  }`}
                >
                  <span>{spec.category}</span>
                  <ChevronRightSmall />
                </button>
              ))}
            </div>

            {/* Right details: Tabular render of specific specifications */}
            <div className="lg:col-span-9">
              <AnimatePresence mode="wait">
                {vehicle.specifications.map((spec) => {
                  if (spec.category !== activeSpecCategory) return null;
                  return (
                    <motion.div
                      key={spec.category}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border border-gray-150 rounded-2xl overflow-hidden shadow-sm"
                    >
                      <div className="bg-[#FAFAFA] py-4 px-6 border-b border-gray-150">
                        <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-gray-600">
                          DATA {spec.category.toUpperCase()}
                        </h4>
                      </div>
                      
                      <div className="divide-y divide-gray-100 font-sans">
                        {spec.items.map((item, index) => (
                          <div 
                            key={index} 
                            className={`grid grid-cols-1 sm:grid-cols-12 gap-4 py-4 px-6 text-xs ${
                              index % 2 === 0 ? "bg-white" : "bg-[#FBFBFC]"
                            }`}
                          >
                            <div className="sm:col-span-4 font-mono font-bold text-gray-500 uppercase tracking-wide">
                              {item.label}
                            </div>
                            <div className="sm:col-span-8 font-semibold text-gray-900 leading-relaxed">
                              {item.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              <div className="bg-gray-50 border border-gray-150 p-4.5 rounded-2xl mt-4 flex items-start gap-3">
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold uppercase mt-0.5">Disclaimer</span>
                <p className="text-[11px] text-gray-400 leading-normal font-sans">
                  Seluruh data teknis didasarkan pada hasil uji coba laboratorium resmi pabrikan berskala internasional. Hasil nyata jarak berkendara dapat dipengaruhi oleh kebiasaan mengemudi, kondisi jalanan kemacetan, suhu eksterior AC, beban kapasitas muatan, dan umur pakai kesehatan baterai.
                </p>
              </div>
            </div>

          </div>

        </section>


        {/* SECTION 7: INTERIOR SHOWCASE */}
        <section className="mb-16" id="showroom-interior-aesthetic-album">
          <div className="text-left mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-600 font-mono">
              THE SPA EXPERIENCE
            </h2>
            <h3 className="font-sans font-black text-2xl sm:text-4xl text-gray-900 tracking-tight mt-1">
              Kabin Mewah & Kenyamanan Maksimal
            </h3>
            <p className="text-sm text-gray-500 font-light mt-2 max-w-xl">
              Interior bernuansa kabin minimalis modern Apple-level yang menggabungkan keselarasan bahan daur ulang ramah lingkungan, jok kulit aromatis memijat, dan penataan tata suara panggung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicle.interiorShowcase.map((item) => (
              <div 
                key={item.title}
                className="bg-white rounded-3xl overflow-hidden shadow-premium border border-gray-100 hover:shadow-lg transition-all"
              >
                <div className="relative pt-[60%] overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute top-0 left-0 w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 text-left">
                  <h4 className="font-sans font-extrabold text-lg text-gray-900 tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* SECTION 8: EXTERIOR SHOWCASE */}
        <section className="mb-16" id="showroom-exterior-aesthetic-album">
          <div className="text-left mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-600 font-mono">
              SCULPTED BY THE WIND
            </h2>
            <h3 className="font-sans font-black text-2xl sm:text-4xl text-gray-900 tracking-tight mt-1">
              Eksterior Aerodinamis Sempurna
            </h3>
            <p className="text-sm text-gray-500 font-light mt-2 max-w-xl">
              Garis estetis membulat mengalir mulus tanpa hambatan yang dirancang di wind tunnel khusus demi meminimalisir hambatan gesekan angin koefisien serendah 0,21 Cd.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {vehicle.exteriorShowcase.map((item) => (
              <div 
                key={item.title}
                className="bg-white rounded-3xl overflow-hidden shadow-premium border border-gray-100 flex flex-col sm:flex-row hover:shadow-lg transition-all"
              >
                <div className="relative w-full sm:w-[45%] aspect-[4/3] sm:aspect-auto overflow-hidden shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute top-0 left-0 w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 text-left flex flex-col justify-center">
                  <span className="text-[9px] font-mono bg-red-50 text-red-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider inline-block w-fit mb-2">Performance Lines</span>
                  <h4 className="font-sans font-extrabold text-lg text-gray-900 tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* SECTION 10: TEST DRIVE CTA */}
        <section className="relative py-20 bg-gray-950 text-white rounded-3xl overflow-hidden p-6 sm:p-12 mb-16 text-center" id="interior-testdrive-cta">
          {/* Inner ambient light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight">
              Rasakan Kenikmatan Mengemudi Sendiri
            </h3>
            <p className="font-sans text-gray-400 text-sm font-light mt-4 leading-relaxed max-w-xl mx-auto">
              Jangan hanya membaca brosur spesifikasi teknik. Kencangkan sabuk pengaman Anda, rasakan gelontoran akselerasi instan tanpa jeda, kesunyian kabin premium, dan kemudahan parkir otonom kami secara langsung di tempat Anda.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to={`/test-drive?vehicleId=${vehicle.id}`}
                className="bg-red-600 hover:bg-red-500 font-bold text-xs uppercase tracking-widest py-4 px-10 rounded-xl transition-all shadow-lg"
              >
                Daftar Jadwal Test Drive Gratis
              </Link>
            </div>
            <p className="text-[9px] text-gray-550 text-gray-500 mt-5 font-mono lowercase">
              *staf showroom kami dapat langsung membawakan unit test drive gratis ke alamat tinggal Anda (area Jabodetabek).
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}

// Minimal helpers
function ChevronRightSmall() {
  return (
    <svg className="w-3 h-3 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  );
}
