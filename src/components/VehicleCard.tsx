import React from "react";
import { Link } from "react-router-dom";
import { Vehicle } from "../types";
import { Zap, Compass, Flame, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface VehicleCardProps {
  vehicle: Vehicle;
  key?: string;
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  // Safe formatter for Rupiah currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white rounded-3xl overflow-hidden shadow-premium border border-slate-100 hover:shadow-xl transition-all flex flex-col h-full"
      id={`vehicle-card-${vehicle.id}`}
    >
      {/* Visual Image Banner with tags */}
      <div className="relative pt-[56%] bg-slate-50 overflow-hidden group">
        <img
          src={vehicle.colors[0].imageUrl || vehicle.gallery.front}
          alt={vehicle.name}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        
        {/* Subtle Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent"></div>

        {/* Brand & Type Tags */}
        <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap">
          <span className="bg-slate-900/90 text-white text-[10px] font-mono tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {vehicle.brand}
          </span>
          <span className="bg-red-650/95 bg-red-600 text-white text-[10px] font-mono tracking-widest uppercase font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {vehicle.type}
          </span>
        </div>

        {/* Fast Charging Badge */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md border border-white/20 text-slate-900 text-[10px] font-semibold py-1 px-2.5 rounded-full flex items-center gap-1 shadow-sm">
          <Zap className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
          <span>
            {vehicle.id === "mg-s5-ev" ? "DC ±35 Min" : vehicle.id === "mg4-ev" ? "DC ±26 - 35 Min" : "DC ±30 Min"}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-2">
          <h3 className="font-display font-bold text-xl text-slate-900 tracking-tight leading-snug">
            {vehicle.name}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-1 mt-1 italic font-medium">
            "{vehicle.tagline}"
          </p>
        </div>

        {/* Pricing Layout */}
        <div className="my-3.5 pb-3.5 border-b border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 font-mono tracking-wider uppercase">
            Harga OTR Jakarta
          </div>
          <div className="text-2xl font-display font-black text-slate-900 mt-1 tracking-tight">
            {vehicle.id === "mg-s5-ev" ? "Rp 333,9 Jt - Rp 355,9 Jt" : vehicle.id === "mg4-ev" ? "Rp 289.000.000 (Mulai)" : formatPrice(vehicle.priceOTR)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
            *Sudah Termasuk Insentif PPN 10% & Paket Wall Charger Gratis
          </div>
        </div>

        {/* Core dynamic EV Specs highlights */}
        <div className="grid grid-cols-3 gap-2 py-2.5 bg-slate-50 rounded-2xl p-3 text-center mb-6 border border-slate-100">
          <div className="flex flex-col items-center">
            <Compass className="w-4 h-4 text-slate-400 mb-1" />
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-tighter">Jarak Tempuh</span>
            <span className="text-xs font-bold text-slate-800">
              {vehicle.id === "mg-s5-ev" ? "410 KM" : vehicle.id === "mg4-ev" ? "425-540 KM" : `${vehicle.range} KM`}
            </span>
          </div>
          <div className="flex flex-col items-center border-x border-slate-200">
            <Flame className="w-4 h-4 text-red-500 mb-1" />
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-tighter">Akselerasi</span>
            <span className="text-xs font-bold text-slate-800">{vehicle.acceleration.split(" ")[0]} Detik</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
            <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-tighter">Garansi</span>
            <span className="text-[10px] font-bold text-slate-800 leading-none mt-1">8 Tahun</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Link
            to={`/vehicle/${vehicle.id}`}
            className="w-full bg-slate-900 hover:bg-red-600 hover:shadow-red-200 text-white font-bold text-xs tracking-widest uppercase py-3.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all group cursor-pointer"
            id={`btn-detail-${vehicle.id}`}
          >
            Pelajari Spesifikasi & Promo
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </motion.div>
  );
}
