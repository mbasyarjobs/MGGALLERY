import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { vehicles } from "../data";
import { Calendar, Clock, MapPin, User, Phone, MessageSquare, ShieldCheck, HelpCircle } from "lucide-react";
import { motion } from "motion/react";

export default function TestDrive() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Parse any pre-selected vehicle parameter from URL search query
  const queryVehicleId = searchParams.get("vehicleId") || "";

  // Structure form state values
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    vehicleId: queryVehicleId || vehicles[0]?.id || "",
    date: "",
    time: "",
    notes: ""
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state if query parameter changes
  useEffect(() => {
    if (queryVehicleId) {
      setFormData((prev) => ({ ...prev, vehicleId: queryVehicleId }));
    }
  }, [queryVehicleId]);

  // Find active selected vehicle for displaying parameters
  const selectedVehicleObj = useMemo(() => {
    return vehicles.find((v) => v.id === formData.vehicleId) || vehicles[0];
  }, [formData.vehicleId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error once user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Run simple client validations
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Nama lengkap wajib diisi.";
    if (!formData.phone.trim()) errors.phone = "Nomor WhatsApp wajib diisi.";
    if (!formData.city.trim()) errors.city = "Kota domisili wajib diisi.";
    if (!formData.date) errors.date = "Tanggal pilihan wajib diisi.";
    if (!formData.time) errors.time = "Waktu pilihan wajib diisi.";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // Scroll to first error
      const firstErrorEl = document.getElementsByName(Object.keys(errors)[0])[0];
      if (firstErrorEl) {
        firstErrorEl.focus();
      }
      return;
    }

    setIsSubmitting(true);

    // Formulate prefilled text for direct high-converting WhatsApp lead
    const vehicleName = selectedVehicleObj 
      ? `${selectedVehicleObj.brand} ${selectedVehicleObj.name}` 
      : "Katalog Showroom EV";

    const formattedMessage = 
      `Halo Kak,\n\n Saya ingin memesan jadwal Test Drive dengan rincian data diri berikut:\n\n` +
      `• *Nama Lengkap* : ${formData.name.trim()}\n` +
      `• *No. WhatsApp* : ${formData.phone.trim()}\n` +
      `• *Kota Domisili* : ${formData.city.trim()}\n` +
      `• *Unit Kendaraan* : ${vehicleName}\n` +
      `• *Tanggal Pilihan* : ${formData.date}\n` +
      `• *Waktu Pilihan* : ${formData.time}\n` +
      `• *Catatan Tambahan* : ${formData.notes.trim() ? formData.notes.trim() : "-"}\n\n` +
      `Mohon dibantu konfirmasi ketersediaan unit test-drive di lokasi showroom terdekat atau penjadwalan langsung ke kantor/rumah saya. Terima kasih!`;

    // Redirection after short delay
    setTimeout(() => {
      const phoneNumber = "628131422804"; // Showroom hotline
      const redirectUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMessage)}`;
      window.open(redirectUrl, "_blank", "noopener,noreferrer");
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 font-sans" id="test-drive-view-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Panel: Aesthetic Side-panel with scheduled vehicle details */}
          <div className="lg:col-span-5 flex flex-col gap-6" id="testdrive-left-card">
            
            <div className="text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-red-600 font-mono">
                AUTONOMOUS CONCIERGE
              </span>
              <h1 className="font-display font-bold text-3xl sm:text-5xl text-slate-900 tracking-tight mt-1 uppercase">
                Pesan Jadwal Test Drive
              </h1>
              <p className="font-sans text-slate-500 text-sm font-light mt-3 leading-relaxed">
                Uji coba secara langsung di jalanan perkotaan kenyamanan mengemudi, sensasi instan akselerasi tanpa getar, dan kehebatan asisten otonom mobil listrik pilihan Anda.
              </p>
            </div>

            {/* Active Display Card of Selected Vehicle */}
            <div className="bg-white rounded-3xl p-6 shadow-premium border border-slate-100 text-left">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block mb-1">
                Mobil Listrik Pilihan Anda
              </span>
              <h3 className="font-display font-bold text-2xl text-slate-900 tracking-tight leading-none uppercase">
                {selectedVehicleObj.brand} {selectedVehicleObj.name}
              </h3>
              
              <div className="relative pt-[50%] bg-slate-50 rounded-2xl overflow-hidden my-4 border border-slate-100">
                <img
                  src={selectedVehicleObj.colors[0].imageUrl || selectedVehicleObj.gallery.front}
                  alt={selectedVehicleObj.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Little telemetry of chosen vehicle */}
              <div className="grid grid-cols-3 gap-2 py-3 bg-slate-50 rounded-xl p-3 text-center text-[10px] font-mono font-semibold">
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase">Jarak Tempuh</span>
                  <span className="text-gray-800 font-bold">{selectedVehicleObj.range} KM</span>
                </div>
                <div className="border-x border-gray-200">
                  <span className="text-gray-400 block text-[9px] uppercase">Akselerasi</span>
                  <span className="text-gray-800 font-bold">{selectedVehicleObj.acceleration.split(" ")[0]} Detik</span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[9px] uppercase">Fast Charge</span>
                  <span className="text-emerald-600 font-bold">10-80% Ok</span>
                </div>
              </div>

              <div className="flex gap-2.5 bg-emerald-50 border border-emerald-100 p-4 rounded-xl mt-5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-emerald-800 leading-normal font-medium">
                  <strong>Jasa Free Home Delivery</strong>: Tim kami siap mengirimkan unit test drive langsung ke alamat kantor atau rumah Anda secara gratis tanpa pungutan biaya berkendara apapun.
                </p>
              </div>
            </div>

          </div>

          {/* Right Panel: Clean form layout */}
          <div className="lg:col-span-7 font-sans" id="testdrive-right-form">
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-premium border border-gray-150 text-left">
              
              <h3 className="font-sans font-black text-xl text-gray-950 tracking-tight border-b border-gray-100 pb-4 mb-6 uppercase">
                Formulir Pendaftaran Jadwal
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* Field 1: Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Nama Lengkap Sesuai SIM A
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Contoh: Budi Santoso"
                      className={`w-full bg-gray-55/70 bg-gray-50 border ${
                        formErrors.name ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-red-550 focus:border-red-650 focus:border-red-600"
                      } rounded-xl py-3.5 pl-10 pr-4 text-sm font-semibold outline-none focus:bg-white transition-all`}
                    />
                  </div>
                  {formErrors.name && (
                    <span className="text-red-500 text-[10px] font-mono mt-1 block">{formErrors.name}</span>
                  )}
                </div>

                {/* Field 2: Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Nomor WhatsApp / Telp Aktif
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Contoh: +62 813-1422-804"
                      className={`w-full bg-gray-50 border ${
                        formErrors.phone ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-red-600"
                      } rounded-xl py-3.5 pl-10 pr-4 text-sm font-semibold outline-none focus:bg-white transition-all`}
                    />
                  </div>
                  {formErrors.phone && (
                    <span className="text-red-500 text-[10px] font-mono mt-1 block">{formErrors.phone}</span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Field 3: City */}
                  <div>
                    <label htmlFor="city" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Kota Domisili Tinggal
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Contoh: Jakarta Selatan / BSD"
                        className={`w-full bg-gray-50 border ${
                          formErrors.city ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-red-600"
                        } rounded-xl py-3.5 pl-10 pr-4 text-sm font-semibold outline-none focus:bg-white transition-all`}
                      />
                    </div>
                    {formErrors.city && (
                      <span className="text-red-500 text-[10px] font-mono mt-1 block">{formErrors.city}</span>
                    )}
                  </div>

                  {/* Field 4: Vehicle Selection */}
                  <div>
                    <label htmlFor="vehicleId" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      PILIH UNIT MOBIL LISTRIK
                    </label>
                    <select
                      id="vehicleId"
                      name="vehicleId"
                      value={formData.vehicleId}
                      onChange={handleInputChange}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-3 text-sm font-semibold text-gray-800 outline-none focus:border-red-500 transition-colors cursor-pointer"
                    >
                      {vehicles.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.brand} {v.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Field 5: Date */}
                  <div>
                    <label htmlFor="date" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Pilih Tanggal Penjadwalan
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 pointer-events-none">
                        <Calendar className="w-4 h-4" />
                      </span>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-50 border ${
                          formErrors.date ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-red-600"
                        } rounded-xl py-3 pl-10 pr-4 text-sm font-semibold outline-none focus:bg-white transition-all`}
                      />
                    </div>
                    {formErrors.date && (
                      <span className="text-red-500 text-[10px] font-mono mt-1 block">{formErrors.date}</span>
                    )}
                  </div>

                  {/* Field 6: Time Selection */}
                  <div>
                    <label htmlFor="time" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                      Pilih Jam Penjadwalan
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3.5 flex items-center text-gray-400 pointer-events-none">
                        <Clock className="w-4 h-4" />
                      </span>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleInputChange}
                        className={`w-full bg-gray-50 border ${
                          formErrors.time ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-red-600"
                        } rounded-xl py-3 pl-10 pr-4 text-sm font-semibold outline-none focus:bg-white transition-all`}
                      />
                    </div>
                    {formErrors.time && (
                      <span className="text-red-500 text-[10px] font-mono mt-1 block">{formErrors.time}</span>
                    )}
                  </div>
                </div>

                {/* Field 7: Notes */}
                <div>
                  <label htmlFor="notes" className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Catatan Tambahan & Alamat Pengiriman (Jika Ingin Dikirim ke Rumah)
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Contoh: Kirimkan unit ke alamat rumah kami di Kemang Pratama 3 Blok AA, / Hubungi saya sebelum jam 10 pagi, dst."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-medium outline-none focus:border-red-650 focus:bg-white transition-all"
                  ></textarea>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-red-600 hover:bg-red-500 disabled:bg-red-400 text-white font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-600/10 hover:shadow-red-600/20"
                    id="btn-testdrive-submit"
                  >
                    {isSubmitting ? (
                      <span>Memproses Pengajuan...</span>
                    ) : (
                      <>
                        <MessageSquare className="w-4 h-4 animate-bounce" /> Kirim Jadwal Ke WhatsApp Showroom
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center mt-3 font-mono">
                    *Dengan menekan tombol kirim, data Anda akan diformat aman dan langsung terkirim lewat WhatsApp resmi Dealer Resmi MG Jakarta untuk asisten konfirmasi kilat.
                  </p>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
