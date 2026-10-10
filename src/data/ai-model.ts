export const aiModel = {
  kicker: "03 / Yapay zekâ",
  title: "Ses Analizi ve Denetim",
  description:
    "Eğitilmiş model, ses girdilerini talep niyetini anlamaya ve personel hatalarını tespit etmeye destek olmak için analiz eder; mevcut sistem inceleme API’sine entegre edilmiştir.",
  contribution:
    "Modelin geliştirilmesi, teknoloji tercihleri ve API entegrasyonu dahil projenin tüm sorumluluğunu üstlendim.",
  technologies: ["Ollama", "Whisper", "FastAPI", "Spring Boot", "Next.js", "PostgreSQL"],
  screenshot: {
    src: "/images/ai-model-training.svg",
    alt: "Gerçek ürün ekranı olmayan, model eğitimi ve çıktı akışını anlatan temsili şema.",
    width: 1600,
    height: 1000,
  },
  process: ["Ses girdisi", "Talep niyeti ve hata analizi", "Sistem inceleme API’si"],
} as const;
