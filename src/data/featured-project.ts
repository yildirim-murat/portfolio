export const featuredProject = {
  kicker: "04 / Kamu çözümleri",
  name: "Kamu Kurum Çözümleri",
  description:
    "Kamu kurumlarının yoğun veri akışlarını ve hesaplamalarını yönetmesi; istatistik, rapor ve personel takibini günlük operasyonlarla birlikte yürütebilmesi için geliştirilmiş kurum içi uygulama.",
  contribution:
    "Projenin kapsamını, teknoloji tercihlerini ve geliştirme sürecinin tamamını üstlendim.",
  technologies: ["Spring Boot", "React", "PostgreSQL", "Go (Chi, Fiber)"],
  screenshot: {
    src: "/images/kamu-dashboard-preview.svg",
    alt: "Proje arayüzü olmayan, kamu kurumu iş akışını anlatan temsili yönetim paneli görseli.",
    width: 1600,
    height: 1000,
  },
} as const;
