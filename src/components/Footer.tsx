import React from "react";
import { Link } from "react-router-dom";
import { Zap, ShieldCheck, Clock, PhoneCall, Award, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 font-sans border-t border-slate-900" id="showroom-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Upper Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-slate-900">
          
          {/* Col 1: Showroom Profile */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5" id="footer-logo">
              <div className="w-8 h-8 bg-red-600 rounded-sm flex items-center justify-center shrink-0">
                <div className="w-4 h-4 border-2 border-white rotate-45"></div>
              </div>
              <span className="font-display font-black text-xl tracking-tight uppercase">
                MG <span className="text-red-600">EV</span> GALLERY
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mt-2 font-medium">
              MG EV Gallery Showroom adalah dealer digital kendaraan listrik premium nomor satu di Indonesia. Kami menghantarkan teknologi masa depan di garasi rumah Anda hari ini dengan jaminan layanan berkelas dunia.
            </p>
            <div className="flex items-center gap-3 mt-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800 text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Authorized Dealer
              </span>
            </div>
          </div>

          {/* Col 2: Showroom Operation Details */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Showroom Hours
            </h3>
            <div className="flex flex-col gap-3.5 text-sm text-slate-300 mt-2 font-medium">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4.5 h-4.5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Buka Setiap Hari</p>
                  <p className="text-xs text-slate-400 mt-0.5">Senin - Minggu: 08.00 - 20.00 WIB</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Award className="w-4.5 h-4.5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Full Digital Concierge</p>
                  <p className="text-xs text-slate-400 mt-0.5">Respons Konsultan WhatsApp &gt; 5 Menit</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Electric Lineup
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold">
              <li>
                <Link to="/vehicle/mg-s5-ev" className="text-slate-300 hover:text-white transition-colors flex items-center justify-between">
                  <span>MG S5 EV</span>
                  <span className="text-[10px] font-mono bg-red-950/80 text-red-400 px-2 py-0.5 rounded-full border border-red-900/30">MGS5V</span>
                </Link>
              </li>
              <li>
                <Link to="/vehicle/mg-zs-ev" className="text-slate-300 hover:text-white transition-colors flex items-center justify-between">
                  <span>MG ZS EV</span>
                  <span className="text-[10px] font-mono bg-amber-950/80 text-amber-400 px-2 py-0.5 rounded-full border border-amber-900/30">MGZSEV</span>
                </Link>
              </li>
              <li>
                <Link to="/vehicle/mg4-ev" className="text-slate-300 hover:text-white transition-colors flex items-center justify-between">
                  <span>MG4 EV</span>
                  <span className="text-[10px] font-mono bg-blue-950/80 text-blue-400 px-2 py-0.5 rounded-full border border-blue-900/30">MG4EV</span>
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="text-red-500 hover:text-red-400 transition-colors text-xs font-bold uppercase tracking-widest mt-2 block">
                  LIHAT KATALOG LINEUP &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Sales Hotline & Conversion */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
              Lokasi & Layanan
            </h3>
            <div className="text-sm text-slate-300 font-medium">
              <p className="font-semibold text-white">MG EV Gallery HQ Showroom</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Jl. Samanhudi No.43, RT.5/RW.3, Ps. Baru, Kecamatan Sawah Besar, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10710.
              </p>
            </div>
            
            <div className="flex flex-col gap-2 mt-1">
              <a
                href="https://wa.me/628131422804"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-emerald-600 hover:bg-emerald-500 hover:shadow-emerald-950 shadow-md transition-all py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs text-center tracking-wider uppercase"
              >
                <PhoneCall className="w-3.5 h-3.5" /> HUBUNGI SALES CONSULTANT
              </a>

              <a
                href="https://www.instagram.com/riski.mgjakarta?igsh=MXJqZ3pzbmN3bGR4YQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 transition-all py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-xs text-center tracking-wider uppercase"
              >
                <Instagram className="w-4 h-4 text-pink-500" /> INSTAGRAM SHOWROOM
              </a>
            </div>
          </div>

        </div>

        {/* Lower footer copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>&copy; {currentYear} MG EV Gallery Indonesia. Authorized Showroom Partner Jakarta. All Rights Reserved.</p>
          <div className="flex gap-6 font-semibold">
            <a href="https://wa.me/628131422804" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
            <a href="https://wa.me/628131422804" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Kebijakan Privasi</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
