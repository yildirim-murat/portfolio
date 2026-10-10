export const aiModel = {
  kicker: "04 / Yapay zekâ",
  title: "İhtiyaca göre eğitilen yapay zekâ modeli.",
  description:
    "Belirli bir kullanım amacı için eğitilen modelin yaklaşımını; veri hazırlığı, eğitim ve değerlendirme adımlarıyla ele alıyorum. Her aşama, modelin hedeflenen ihtiyaca uygunluğunu gözetiyor.",
  screenshot: {
    src: "/images/ai-model-training.svg",
    alt: "Yapay zekâ modeli için veri hazırlığı, eğitim ve değerlendirme akışını gösteren şematik çizim.",
    width: 1600,
    height: 1000,
  },
  process: ["Veri hazırlığı", "Model eğitimi", "Değerlendirme"],
} as const;
