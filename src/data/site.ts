/**
 * Informasi utama Mosa Coffee House.
 * Semua teks identitas kafe dipusatkan di sini agar mudah diperbarui.
 */
export const OPENING_HOUR = 8; // Buka setiap hari mulai pukul 08.00 WIB
/**
 * Jam tutup dipakai HANYA untuk logika indikator "Buka Sekarang".
 * Sesuaikan jika jam tutup aktual berbeda.
 */
export const CLOSING_HOUR = 22;

export const site = {
  name: "Mosa Coffee House",
  shortName: "Mosa",
  tagline: "Seduh Ketenangan di Setiap Cangkir",
  description:
    "Kedai kopi hangat bergaya vintage di Arcamanik, Bandung — tempat yang nyaman untuk bersantai, berkumpul dengan teman, atau fokus bekerja.",
  address: {
    street: "Jl. Golf Barat Raya No.51 B",
    district: "Sukamiskin, Kec. Arcamanik",
    city: "Kota Bandung, Jawa Barat 40293",
    full: "Jl. Golf Barat Raya No.51 B, Sukamiskin, Kec. Arcamanik, Kota Bandung, Jawa Barat 40293",
  },
  phone: {
    display: "0812-2041-927",
    tel: "+628122041927",
    whatsapp: "628122041927",
  },
  hours: {
    label: "Buka setiap hari mulai pukul 08.00 WIB",
    short: "Setiap hari · mulai 08.00 WIB",
    opening: "08.00",
  },
  facilities: [
    "Ramah Kursi Roda",
    "Area Outdoor",
    "WFC Friendly",
    "Parkir Gratis (Luas & di Jalan)",
    "Menerima Reservasi",
    "Ramah Anak",
  ],
  payments: ["Kartu Debit", "Kartu Kredit", "Pembayaran Seluler (NFC)"],
  socials: [
    { id: "instagram", label: "Instagram", href: "#" },
    { id: "facebook", label: "Facebook", href: "#" },
    { id: "tiktok", label: "TikTok", href: "#" },
    { id: "whatsapp", label: "WhatsApp", href: "https://wa.me/628122041927" },
  ],
  links: {
    mapsEmbed:
      "https://maps.google.com/maps?q=Mosa%20Coffee%20House%2C%20Jl.%20Golf%20Barat%20Raya%20No.51%20B%2C%20Sukamiskin%2C%20Arcamanik%2C%20Kota%20Bandung&t=&z=16&ie=UTF8&iwloc=&output=embed",
    mapsDirections:
      "https://www.google.com/maps/dir/?api=1&destination=Mosa%20Coffee%20House%2C%20Jl.%20Golf%20Barat%20Raya%20No.51%20B%2C%20Sukamiskin%2C%20Arcamanik%2C%20Kota%20Bandung",
    whatsapp: (message?: string) =>
      `https://wa.me/628122041927${message ? `?text=${encodeURIComponent(message)}` : ""}`,
  },
} as const;

export const navLinks = [
  { id: "beranda", label: "Beranda" },
  { id: "menu", label: "Menu" },
  { id: "tentang", label: "Tentang" },
  { id: "reservasi", label: "Reservasi" },
  { id: "kontak", label: "Kontak" },
] as const;
