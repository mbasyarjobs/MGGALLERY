import React, { useState } from "react";
import { Link } from "react-router-dom";
import { vehicles } from "../data";
import VehicleCard from "../components/VehicleCard";
import {
  Zap,
  BatteryCharging,
  Compass,
  Plus,
  ShieldCheck,
  Smartphone,
  CheckCircle,
  PiggyBank,
  Leaf,
  Cpu,
  MessageSquare,
  ArrowRight,
  ShieldAlert,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Home() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Get 3 featured vehicles (MG S5 EV, MG ZS EV, MG4 EV)
  const featuredVehicles = [
    vehicles.find(v => v.id === "mg-s5-ev") || vehicles[0],
    vehicles.find(v => v.id === "mg-zs-ev") || vehicles[1 % vehicles.length],
    vehicles.find(v => v.id === "mg4-ev") || vehicles[2 % vehicles.length]
  ];

  const themes = [
    {
      // S5 EV: Scarlet Red
      gradient: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-red-950/40 via-neutral-950 to-slate-950",
      halo: "bg-red-500/20",
      highlightColor: "text-red-500 border-red-500/20 bg-red-500/5",
      glowShadow: "drop-shadow-[0_25px_60px_rgba(239,68,68,0.25)]",
      metricHighlight: "text-red-400"
    },
    {
      // ZS EV: York Blue
      gradient: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/40 via-neutral-950 to-slate-950",
      halo: "bg-blue-500/20",
      highlightColor: "text-blue-400 border-blue-500/20 bg-blue-500/5",
      glowShadow: "drop-shadow-[0_25px_60px_rgba(59,130,246,0.25)]",
      metricHighlight: "text-blue-400"
    },
    {
      // MG4 EV: Volcano Orange
      gradient: "bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-950/35 via-neutral-950 to-slate-950",
      halo: "bg-orange-500/20",
      highlightColor: "text-orange-400 border-orange-500/20 bg-orange-500/5",
      glowShadow: "drop-shadow-[0_25px_60px_rgba(249,115,22,0.25)]",
      metricHighlight: "text-orange-400"
    }
  ];

  const handleWhatsAppChat = (mobilName: string = "Showroom Lineup") => {
    const phoneNumber = "628131422804";
    const textMessage = encodeURIComponent(
      `Halo Kak,\n\nSaya tertarik dengan ${mobilName}.\nMohon informasi lengkap mengenai promo cashback, ketersediaan unit siap kirim (ready stock), serta benefit pemesanan bulan ini.\n\nHormat saya.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${textMessage}`, "_blank", "noopener,noreferrer");
  };

  const handleSimulasiKredit = (mobilName: string) => {
    const phoneNumber = "628131422804";
    const textMessage = encodeURIComponent(
      `Halo Kak,\n\nSaya tertarik dengan ${mobilName}.\nMohon informasi mengenai:\n\n• Simulasi kredit (DP ringan & cicilan)\n• Harga terbaru OTR Jakarta\n• Promo yang sedang berlangsung\n• Jadwal test drive terdekat\n\nTerima kasih.`
    );
    window.open(`https://wa.me/${phoneNumber}?text=${textMessage}`, "_blank", "noopener,noreferrer");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(price);
  };

  const reasons = [
    {
      title: "Ultra Fast Charging",
      description: "Suport teknologi HPC (High Power Charger) hingga 360 kW DC. Isi daya baterai dari 10% ke 80% hanya butuh waktu 15 - 26 menit saja.",
      icon: BatteryCharging,
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      title: "Low Operating Cost",
      description: "Hemat pengeluaran bulanan hingga 80% dibanding mobil bensin. Pengisian listrik ekonomis ditambah bebas biaya pergantian pelumas/mesin.",
      icon: PiggyBank,
      color: "text-emerald-500",
      bg: "bg-emerald-50"
    },
    {
      title: "Zero Emissions",
      description: "Lindungi kualitas udara perkotaan dengan 100% pembakaran bersih. Berpartisipasi langsung dalam net-zero emisi karbon tingkat global.",
      icon: Leaf,
      color: "text-teal-500",
      bg: "bg-teal-50"
    },
    {
      title: "Smart Features",
      description: "Konektivitas penuh lewat Android Automotive terintegrasi, Google Maps daring, integrasi asisten suara, dan ketersediaan update software OTA.",
      icon: Smartphone,
      color: "text-blue-500",
      bg: "bg-blue-50"
    },
    {
      title: "ADAS Safety Shield",
      description: "Proteksi asisten kemudi otonom tercanggih (LiDAR & radar multi-titik). Mencegah risiko benturan luar jangkauan pengemudi secara aktif.",
      icon: ShieldAlert,
      color: "text-red-500",
      bg: "bg-red-50"
    },
    {
      title: "Comprehensive Warranty",
      description: "Bebas khawatir jangka panjang dengan garansi modul baterai utama hingga 8 Tahun / 200.000 KM ditambah gratis proteksi darurat 24 jam.",
      icon: ShieldCheck,
      color: "text-indigo-500",
      bg: "bg-indigo-50"
    }
  ];

  return (
    <div className="bg-slate-50 pt-16" id="home-view-container">      {/* SECTION 1: PREMIUM VEHICLE CAROUSEL HERO */}
      <section className="relative min-h-[92vh] md:min-h-screen bg-slate-950 flex items-center justify-center overflow-hidden" id="home-hero-section">
        
        {/* Layered Smooth Transitioning Backgrounds */}
        {themes.map((theme, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out -z-10 ${
              activeIndex === idx ? "opacity-100" : "opacity-0"
            } ${theme.gradient}`}
          />
        ))}

        {/* Ambient Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 pointer-events-none -z-10" />

        {/* Swiper Carousel */}
        <div className="w-full relative z-10">
          <Swiper
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[Autoplay, Navigation, Pagination, EffectFade]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1200}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            className="w-full"
          >
            {featuredVehicles.map((vehicle, idx) => {
              const theme = themes[idx] || themes[0];
              return (
                <SwiperSlide key={vehicle.id} className="relative w-full h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                      
                      {/* Left Side: Luxury Glassmorphism card */}
                      <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
                        {/* Dynamic category / badge with elegant zoom-in effect */}
                        <motion.div
                          key={`badge-${activeIndex}-${idx}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className={`inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase font-black px-4 py-2 rounded-full mb-6 border ${theme.highlightColor} shadow-md backdrop-blur-md`}
                        >
                          <Zap className="w-4 h-4 fill-current animate-pulse shrink-0" />
                          <span>Premium EV Flagship</span>
                        </motion.div>

                        {/* Title with Parallax Slide Effect */}
                        <motion.h1
                          key={`title-${activeIndex}-${idx}`}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                          className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none uppercase"
                        >
                          {vehicle.brand}{" "}
                          <span className="text-white">
                            {vehicle.name.replace(vehicle.brand, "").trim()}
                          </span>
                        </motion.h1>
                        
                        {/* Tagline */}
                        <motion.p
                          key={`tag-${activeIndex}-${idx}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.1 }}
                          className="font-sans text-gray-300 text-base sm:text-lg font-light mt-4 max-w-xl leading-relaxed"
                        >
                          {vehicle.tagline}
                        </motion.p>

                        {/* Metrics Panel with heavy glass blur */}
                        <motion.div
                          key={`metrics-${activeIndex}-${idx}`}
                          initial={{ opacity: 0, scale: 0.98, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.2 }}
                          className="grid grid-cols-3 gap-3 sm:gap-6 bg-slate-900/40 border border-white/5 backdrop-blur-xl rounded-3xl p-4 sm:p-6 mt-8 w-full max-w-2xl text-white font-mono shadow-2xl"
                        >
                          <div>
                            <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold tracking-wider uppercase leading-snug">Jangkauan (NEDC)</p>
                            <p className="text-base sm:text-2xl font-black text-white mt-1.5">
                              {vehicle.id === "mg-s5-ev" ? "Hingga 410 KM" : vehicle.id === "mg4-ev" ? "425 - 540 KM" : `${vehicle.range} KM`}
                            </p>
                            <p className="text-[9px] text-emerald-400 mt-1 flex items-center gap-1">✓ Bebas Emisi</p>
                          </div>
                          <div>
                            <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold tracking-wider uppercase leading-snug">Fast Charging</p>
                            <p className="text-base sm:text-2xl font-black text-white mt-1.5">
                              {vehicle.id === "mg-s5-ev" ? "±35 Menit" : vehicle.id === "mg4-ev" ? "±26 - 35 Menit" : "±30 Menit"}
                            </p>
                            <p className="text-[9px] text-gray-300 mt-1 truncate">
                              {vehicle.id === "mg-zs-ev" ? "30-80% DC" : "10-80% DC"}
                            </p>
                          </div>
                          <div>
                            <p className="text-[9px] sm:text-[10px] text-gray-400 font-bold tracking-wider uppercase leading-snug">Garansi Resmi</p>
                            <p className={`text-base sm:text-xl font-black mt-2 ${theme.metricHighlight}`}>
                              {vehicle.warranty.split(" ")[0]} TAHUN
                            </p>
                            <p className="text-[9px] text-gray-400 mt-0.5">Baterai Utama</p>
                          </div>
                        </motion.div>

                        {/* CTAs */}
                        <motion.div
                          key={`ctas-${activeIndex}-${idx}`}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, delay: 0.3 }}
                          className="flex flex-col sm:flex-row gap-3 mt-8 w-full sm:w-auto"
                        >
                          <Link
                            to={`/test-drive?vehicleId=${vehicle.id}`}
                            className="bg-red-600 hover:bg-red-755 text-white font-bold text-xs tracking-widest uppercase py-4 px-8 rounded-full flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-red-500/20 active:scale-95 transition-all duration-150"
                          >
                            Book Test Drive
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>

                          <button
                            onClick={() => handleWhatsAppChat(vehicle.name)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-widest uppercase py-4 px-6 rounded-full flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-700/25 active:scale-95 transition-all duration-150"
                          >
                            <MessageSquare className="w-4 h-4 stroke-[2.5]" />
                            WhatsApp Chat
                          </button>

                          <button
                            onClick={() => handleSimulasiKredit(vehicle.name)}
                            className="bg-slate-900/60 hover:bg-slate-800 text-slate-205 text-slate-200 hover:text-white font-bold text-xs tracking-widest uppercase py-4 px-6 rounded-full flex items-center justify-center gap-2 cursor-pointer border border-white/5 active:scale-95 transition-all duration-150 backdrop-blur-md"
                          >
                            Simulasi Kredit
                          </button>
                        </motion.div>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-[10px] text-gray-500 mt-4 lowercase font-mono"
                        >
                          *harga showroom OTR mulai dari <span className="font-bold text-gray-350 text-gray-300">{formatPrice(vehicle.priceOTR)}</span>
                        </motion.p>
                      </div>

                      {/* Right Side: Vehicle Showcase Image with subtle halo back reflections */}
                      <div className="lg:col-span-5 relative flex items-center justify-center mt-6 lg:mt-0">
                        <div className="relative w-full max-w-[320px] sm:max-w-[450px] lg:max-w-none flex justify-center items-center">
                          
                          {/* Radial Glowing Core Reflection representing state transition */}
                          <div
                            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-[350px] sm:h-[350px] rounded-full blur-[100px] transition-all duration-1000 -z-10 ${theme.halo}`}
                          />
                          
                          {/* Float-zoom vehicle presentation */}
                          <img
                            src={vehicle.gallery.front}
                            alt={vehicle.name}
                            className={`w-full h-auto object-contain transition-all duration-[2000ms] ${theme.glowShadow} ${
                              activeIndex === idx 
                                ? "scale-105 rotate-1 translate-y-0 opacity-100" 
                                : "scale-90 -rotate-2 translate-y-4 opacity-40"
                            }`}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* Handcrafted Luxury Navigation Arrows */}
        <div className="absolute bottom-8 right-8 z-30 hidden md:flex items-center gap-2.5">
          <button
            onClick={() => swiperInstance?.slidePrev()}
            className="w-12 h-12 bg-slate-900/60 border border-white/5 text-white flex items-center justify-center rounded-full hover:bg-red-650 hover:border-red-500 transition-all backdrop-blur-md cursor-pointer active:scale-90 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => swiperInstance?.slideNext()}
            className="w-12 h-12 bg-slate-900/60 border border-white/5 text-white flex items-center justify-center rounded-full hover:bg-red-650 hover:border-red-500 transition-all backdrop-blur-md cursor-pointer active:scale-90 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bespoke active slide dot/bar pagination indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
          {featuredVehicles.map((_, index) => (
            <button
              key={index}
              onClick={() => swiperInstance?.slideToLoop(index)}
              className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                activeIndex === index 
                  ? `w-8 shadow-md ${index === 0 ? "bg-red-500 shadow-red-500/50" : index === 1 ? "bg-blue-500 shadow-blue-500/50" : "bg-orange-500 shadow-orange-500/50"}` 
                  : "w-2.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

      </section>


      {/* SECTION 2: WHY CHOOSE EV */}
      <section className="py-24 bg-white border-y border-slate-100" id="home-why-ev-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Narrative */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-600 font-mono">
              The Electric Revolution
            </h2>
            <p className="font-display font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
              Mengapa Berpindah Ke Kendaraan Listrik Sekarang?
            </p>
            <p className="font-sans text-slate-500 text-base sm:text-lg font-light mt-4">
              Kurangi pengeluaran operasional Anda secara drastis sembari menikmati performa tanpa bising, akselerasi instan, asisten mengemudi otonom pintar, dan kemudahan pengisian daya.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
                viewport={{ once: true }}
                className="bg-white border border-slate-100 p-8 rounded-3xl flex flex-col items-start relative overflow-hidden group transition-all shadow-premium"
                id={`why-ev-card-${index}`}
              >
                {/* Decorative card number background */}
                <div className="absolute top-2.5 right-6 text-7xl font-display font-black text-slate-100/75 select-none group-hover:text-red-50/50 transition-colors pointer-events-none">
                  0{index + 1}
                </div>

                <div className={`${item.bg} p-4 rounded-2xl mb-6 relative z-10`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>

                <h3 className="font-display font-semibold text-xl text-slate-900 tracking-tight relative z-10">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-500 mt-3 leading-relaxed relative z-10 font-medium">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      
      {/* SECTION 3: FEATURED VEHICLES */}
      <section className="py-24 bg-slate-50" id="home-featured-vehicles-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Showcase Info */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-red-600 font-mono">
                FLAGSHIP SHOWROOM LINEUP
              </h2>
              <p className="font-display font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-3">
                Jajaran Kendaraan Listrik Unggulan
              </p>
            </div>
            <Link
              to="/vehicles"
              className="group inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-widest text-red-600 hover:text-red-700 transition-colors"
              id="link-view-all-featured"
            >
              Lihat Seluruh Grid Lineup
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          {/* Cards Render */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.slice(0, 3).map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>

        </div>
      </section>


      {/* SECTION 4: CALL TO ACTION */}
      <section className="relative py-24 bg-slate-950 overflow-hidden border-t border-slate-900" id="home-cta-section">
        {/* Subtle glowing backgrounds */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-600/5 rounded-full blur-[120px]"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-emerald-900/40 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase tracking-widest font-bold px-3.5 py-1.5 rounded-full mb-6"
          >
            ✓ Garansi Kepuasan & Layanan Servis Rumah Gratis
          </motion.div>

          <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-tight max-w-4xl">
            Sedia Mengalami Teknologi <span className="text-red-500">Masa Depan</span> Sekarang?
          </h2>
          
          <p className="font-sans text-slate-350 text-slate-400 text-sm sm:text-lg font-light mt-6 max-w-2xl leading-relaxed">
            Daftarkan janji temu uji kemudi (Test Drive) gratis di tempat Anda, atau konsultasikan skenario kredit ringan cicilan bersama konsultan spesialis MG EV Gallery. Respons cepat via WhatsApp kurang dari 5 menit.
          </p>

          {/* Core Conversion Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
            <Link
              to="/test-drive"
              className="bg-red-600 hover:bg-red-700 hover:shadow-red-500/20 hover:shadow-xl text-white font-bold text-xs tracking-widest uppercase py-4.5 px-10 rounded-full transition-all text-center cursor-pointer shadow-lg shadow-red-500/10"
              id="cta-schedule-drive-btn"
            >
              Book Test Drive Gratis
            </Link>

            <button
              onClick={() => handleWhatsAppChat()}
              className="bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-500/20 hover:shadow-xl text-white font-bold text-xs tracking-widest uppercase py-4.5 px-10 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/10"
              id="cta-whatsapp-chat-btn"
            >
              <MessageSquare className="w-5 h-5 stroke-[2.5]" />
              Hubungi WhatsApp Sales
            </button>
          </div>

          <p className="text-[10px] text-slate-500 mt-6 font-mono lowercase">
            *bebas biaya konsultasi, pendaftaran, dan biaya pengiriman unit test drive ke rumah Anda.
          </p>

        </div>
      </section>

    </div>
  );
}
