import React, { useState, useEffect } from "react";
import { MessageSquare, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show tool tip after a small delay to invite user attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "628131422804"; // Realistic showroom hot-line URL format
    const textMessage = encodeURIComponent(
      "Halo Kak,\n\nSaya berkunjung dari website EV Showroom.\nMohon informasi lengkap mengenai daftar harga terbaru (OTR), promo cashback bulan ini, serta pilihan simulasi kredit cicilan ringan.\n\nTerima kasih!"
    );
    window.open(`https://wa.me/${phoneNumber}?text=${textMessage}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2" id="floating-whatsapp-container">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-gray-900 text-white text-xs py-2.5 px-4 rounded-xl shadow-xl flex items-center gap-2 max-w-xs border border-gray-800"
            id="whatsapp-tooltip"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <p className="font-medium text-gray-200">Hubungi Konsultan EV Showroom</p>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-white ml-2 text-[10px]"
              aria-label="Close tooltip"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleWhatsAppRedirect}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full p-4 shadow-2xl flex items-center justify-center relative cursor-pointer group"
        aria-label="Contact sales on WhatsApp"
        id="btn-whatsapp-floating"
      >
        <span className="absolute -top-1 -right-1 bg-red-600 text-[9px] font-bold text-white px-1.5 py-0.5 rounded-full animate-bounce">
          1
        </span>
        <MessageSquare className="w-6 h-6 stroke-[2.5]" />
        
        {/* Hover expanding text */}
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-out font-medium text-sm whitespace-nowrap flex items-center">
          Chat WhatsApp <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
        </span>
      </motion.button>
    </div>
  );
}
