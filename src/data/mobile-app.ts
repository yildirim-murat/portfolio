export const mobileApp = {
  kicker: "05 / Mobil deneyim",
  title: "Android ve iOS için mobil uygulama.",
  description:
    "Bu bölüm, mobil uygulama fikrini iki platformda temsili ekranlarla gösteriyor. Ürün kapsamı ve gerçek ekran akışı netleştikçe önizlemeler güncellenebilir.",
  previews: [
    {
      platform: "Android",
      src: "/images/mobile-app-android.svg",
      alt: "Android için mobil uygulamanın temsili ekran önizlemesi.",
      width: 900,
      height: 1600,
    },
    {
      platform: "iOS",
      src: "/images/mobile-app-ios.svg",
      alt: "iOS için mobil uygulamanın temsili ekran önizlemesi.",
      width: 900,
      height: 1600,
    },
  ],
} as const;
