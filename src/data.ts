import { FAQItem } from "./types";
export { vehicles } from "./data/vehicles";

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "Bagaimana cara melakukan pengisian daya (charging) baterai di rumah?",
    answer: "Setiap pembelian mobil listrik di showroom kami sudah termasuk free Home Wall Charger 11 kW beserta jasa instalasinya. Anda cukup menghubungkan colokan charger ke mobil saat terparkir di garasi. Pengisian daya penuh dari 0-100% membutuhkan waktu sekitar 5 hingga 8 jam, ideal dilakukan di malam hari saat Anda beristirahat.",
    category: "charging"
  },
  {
    id: "faq-2",
    question: "Apakah baterai mobil listrik aman saat melewati jalanan banjir?",
    answer: "Sangat aman. Seluruh unit EV kami menggunakan baterai dengan sertifikasi durabilitas IP67 atau IP68. Ini berarti baterai telah disegel secara hermetis dan tahan direndam dalam air sedalam 1 meter selama minimal 30 menit tanpa ada kebocoran arus listrik atau kerusakan sistem.",
    category: "battery"
  },
  {
    id: "faq-3",
    question: "Berapa lama masa garansi baterai yang diberikan?",
    answer: "Kualitas baterai kami dijamin sepenuhnya oleh pabrikan. Kami memberikan garansi baterai resmi selama 8 Tahun atau 160.000 KM (atau hingga 200.000 KM tergantung model pilihan Anda). Garansi ini mencakup penggantian modul sel baterai jika kapasitas kesehatan baterai (SOH) turun di bawah 70% selama masa garansi.",
    category: "warranty"
  },
  {
    id: "faq-4",
    question: "Bagaimana ketersediaan suku cadang (spare parts) dan layanan servis?",
    answer: "Kami menjamin ketersediaan suku cadang fast-moving maupun unit baterai utama. Layanan servis berkala dapat dilakukan di seluruh bengkel resmi mitra nasional kami. Selain itu, kami menyediakan layanan towing darurat gratis 24 jam serta layanan servis berkunjung (Home Service) untuk kenyamanan maksimal Anda.",
    category: "service"
  },
  {
    id: "faq-5",
    question: "Apakah biaya operasional mobil listrik lebih murah dibanding mobil bensin?",
    answer: "Benar, jauh lebih efisien. Rata-rata biaya pengisian listrik berkisar antara Rp 150 - Rp 250 per kilometer, sementara mobil bensin membutuhkan Rp 1.200 - Rp 1.800 per kilometer. Ini berarti Anda menghemat hingga 80% biaya energi harian, ditambah biaya servis berkala yang sangat murah karena minimnya komponen bergerak (tidak ada oli mesin, busi, filter bahan bakar, dll).",
    category: "ownership"
  },
  {
    id: "faq-6",
    question: "Berapa jarak tempuh rata-rata mobil listrik dalam sekali pengisian penuh?",
    answer: "Unit mobil listrik di showroom kami memiliki jarak tempuh luar biasa antara 560 KM hingga 620 KM (berdasarkan standar uji WLTP). Jarak ini sangat cukup untuk penggunaan dalam kota selama 1 hingga 2 minggu tanpa perlu charging ulang, serta sangat andal untuk melakukan perjalanan antar kota seperti Jakarta ke Surabaya tanpa kendala.",
    category: "general"
  },
  {
    id: "faq-7",
    question: "Bagaimana cara memesan jadwal Test Drive?",
    answer: "Anda dapat dengan mudah menjadwalkan Test Drive melalui menu 'Book Test Drive' di website ini atau mengklik tombol WhatsApp. Pilih mobil impian Anda, tentukan tanggal serta waktu yang Anda inginkan, dan tim penasihat otomotif kami akan segera menghubungi untuk konfirmasi pengantaran unit langsung ke rumah Anda atau di showroom terdekat.",
    category: "general"
  },
  {
    id: "faq-8",
    question: "Apakah mobil listrik dibebaskan dari aturan ganjil genap di Jakarta?",
    answer: "Ya, betul sekali. Pemerintah memberikan insentif khusus bagi pemilik mobil listrik (kendaraan berpelat nomor dengan garis biru), salah satunya adalah bebas melintasi kawasan Ganjil Genap di Jakarta setiap saat. Selain itu, tarif Pajak Kendaraan Bermotor (PKB) tahunan juga mendapatkan diskon hingga 90% sehingga sangat terjangkau.",
    category: "ownership"
  },
  {
    id: "faq-9",
    question: "Apa perbedaan antara pengisian daya AC dan pengisian daya DC?",
    answer: "AC (Alternating Current) adalah pengisian daya lambat/normal yang biasanya digunakan di rumah atau kantor dengan kapasitas daya charger kecil (3.3 kW - 22 kW). Pengisian DC (Direct Current) adalah pengisian daya cepat (peta stasiun SPKLU) yang menyuplai daya langsung berkapasitas besar (50 kW - 350 kW), mampu mengisi baterai 10% hingga 80% hanya dalam 15 - 30 menit saja.",
    category: "charging"
  },
  {
    id: "faq-10",
    question: "Apa itu teknologi ADAS dan apakah semua mobil memilikinya?",
    answer: "ADAS (Advanced Driver Assistance Systems) adalah teknologi asisten mengemudi aktif berbasis kamera, radar, dan sensor presisi tinggi. Semua model EV di showroom kami memiliki fitur ADAS terlengkap, termasuk Lane Keep Assist, Adaptive Cruise Control, Blind Spot Warning, dan Autonomous Emergency Braking yang mampu mengintervensi kemudi untuk menghindari bahaya tabrakan.",
    category: "adas"
  },
  {
    id: "faq-11",
    question: "Jika kapasitas baterai turun, apakah seluruh paket baterai harus diganti?",
    answer: "Tidak perlu. Baterai EV modern didesain dengan sistem modular. Jika terjadi penurunan performa atau kerusakan pada salah satu sel baterai, kami hanya perlu mendeteksi modul sel yang bermasalah melalui komputer diagnostik dan mengganti modul yang rusak tersebut saja secara spesifik, sehingga menghemat biaya servis.",
    category: "battery"
  },
  {
    id: "faq-12",
    question: "Bagaimana asuransi perlindungan terhadap mobil listrik?",
    answer: "Unit mobil listrik kami dapat diasuransikan sepenuhnya layaknya kendaraan konvensional, baik asuransi All-Risk maupun TLO (Total Loss Only). Beberapa perusahaan asuransi terkemuka yang bermitra dengan kami bahkan menyediakan paket asuransi khusus EV dengan jaminan kerusakan baterai akibat kecelakaan maupun banjir tanpa dikenakan biaya kelebihan.",
    category: "ownership"
  },
  {
    id: "faq-13",
    question: "Bagaimana cara melakukan pembayaran dan apakah tersedia simulasi kredit?",
    answer: "Kami menerima berbagai opsi pembayaran mulai dari transfer tunai, kartu debit/kredit, hingga fasilitas pembiayaan (leasing) syariah maupun konvensional. Untuk simulasi kredit detail dengan suku bunga spesial mulai dari 0%, Anda cukup menekan tombol 'Simulasi Kredit' yang akan menghubungkan Anda dengan sales konsultan kami di WhatsApp untuk dibuatkan proposal resmi yang dipersonalisasi.",
    category: "ownership"
  },
  {
    id: "faq-14",
    question: "Apakah pengisi daya charger di SPKLU aman digunakan saat hujan?",
    answer: "Sangat aman. Colokan charger SPKLU maupun port pengisian daya pada mobil sudah dilengkapi dengan seal karet pengaman tahan air khusus dan sistem auto-drainage. Selain itu, tidak ada aliran arus listrik bertegangan tinggi yang akan dilepaskan sebelum port charger terkunci secara rapat dan melakukan verifikasi handshake digital aman dengan sistem pusat mobil.",
    category: "charging"
  },
  {
    id: "faq-15",
    question: "Apakah mobil listrik memiliki perawatan rutin?",
    answer: "Ya, namun perawatannya sangat minim. Anda hanya perlu menjadwalkan kunjungan servis berkala setiap 10.000 KM atau 1 tahun untuk pengecekan kualitas cairan pendingin baterai, kondisi minyak rem, filter AC kabin, rotasi roda, serta kalibrasi software sistem operasional baterai. Tidak ada pergantian oli mesin berkala yang menguras waktu dan dompet.",
    category: "service"
  }
];
