import React from "react";
import { vehicles } from "../data";
import VehicleCard from "../components/VehicleCard";
import { Sparkles } from "lucide-react";
import { motion } from "motion/react";

export default function VehicleList() {
  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 font-sans" id="vehicle-list-view">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Editorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-xs font-bold uppercase tracking-widest text-red-600 font-mono flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4 text-red-500 animate-pulse" /> FLEET CONFIGURATOR
          </h1>
          <p className="font-display font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-2 uppercase">
            Jelajahi Kendaraan Listrik
          </p>
          <p className="font-sans text-slate-500 text-sm sm:text-base font-light mt-3">
            Lihat model mobil listrik premium pilihan terbaik di showroom kami. Temukan kecocokan sempurna Anda hari ini.
          </p>
        </div>

        {/* Dynamic Grid Listing Output */}
        <div id="results-listing-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vehicles.map((vehicle) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <VehicleCard vehicle={vehicle} />
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
