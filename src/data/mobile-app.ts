export const mobileApp = {
  kicker: "05 / Mobil deneyim",
  title: "Mobil Uygulama",
  description:
    "Belirli bir ihtiyaca odaklanan mobil uygulama; kullanım verileri ve istatistiklerin düzenli biçimde takip edilmesini sağlar.",
  contribution:
    "Projenin kapsamını, teknoloji tercihlerini ve geliştirme sürecinin tamamını üstlendim.",
  technologies: ["Kotlin", "Swift"],
  previews: [
    {
      platform: "Android",
      src: "/images/mobile-app-android.svg",
      alt: "Android cihaz görünümünde sunulan temsili mobil uygulama ekranı.",
      width: 900,
      height: 1600,
    },
    {
      platform: "iOS",
      src: "/images/mobile-app-ios.svg",
      alt: "iOS cihaz görünümünde sunulan temsili mobil uygulama ekranı.",
      width: 900,
      height: 1600,
    },
  ],
} as const;
