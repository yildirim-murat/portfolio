export type SocialLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  role: string;
  problem: string;
  approach: string;
  intent: string;
  theme: "forma" | "fieldnotes" | "mono";
  technologies: string[];
  liveUrl?: string;
  sourceUrl?: string;
};

export type ExperienceEntry = {
  period: string;
  role: string;
  organization: string;
  description: string;
  kind: "practice" | "placeholder";
};

export const portfolio = {
  name: "Murat",
  title: "Frontend geliştirici",
  location: "İstanbul, Türkiye",
  email: "murat@example.com",
  availability: "Yeni projeler için iletişime açığım",
  intro:
    "Arayüzü yalnızca güzel görünen değil, kullanması da iyi hissettiren dijital ürünler tasarlayıp geliştiriyorum.",
  about:
    "Detaylara özen gösteren, anlaşılır ve hızlı web deneyimleri üretmeye odaklanıyorum. Tasarım kararlarını çalışan ürüne dönüştürürken erişilebilirliği, performansı ve sürdürülebilir kodu birlikte düşünüyorum.",
  socials: [] as SocialLink[],
  skills: [
    { label: "Arayüz", items: ["React", "Next.js", "TypeScript"] },
    { label: "Görsel dil", items: ["CSS", "Tailwind CSS", "Responsive design"] },
    { label: "Üretim", items: ["Accessibility", "Web performance", "Design systems"] },
  ],
  projects: [
    {
      slug: "forma",
      name: "Forma",
      category: "Ürün analitiği · Kavram projesi",
      summary: "Karmaşık ürün verilerini sakin ve anlaşılır bir çalışma alanına dönüştürmek.",
      description:
        "Forma, küçük ürün ekiplerinin temel kullanım eğilimlerini bir bakışta görebilmesi için tasarlanmış bir analitik paneli kavramıdır.",
      role: "Arayüz konsepti ve görsel prototip",
      problem:
        "Analitik panelleri çoğu zaman aynı anda çok fazla sayı ve grafik gösteriyor. Bu yoğunluk, ekiplerin önemli değişimi bulmasını zorlaştırıyor.",
      approach:
        "Özet metrikleri belirginleştiren, grafiklere bağlam ekleyen ve ikincil bilgileri daha sessiz sunan bir panel kurgusu oluşturdum. Renk ve etiketleri yalnızca veriyi ayırt etmeye yardım ettiği yerde kullandım.",
      intent:
        "Bu konseptin hedefi, ilk bakışta okunabilirliği artırmak ve kullanıcıyı bir sonraki anlamlı soruya yönlendiren bir hiyerarşi kurmak.",
      theme: "forma",
      technologies: ["Next.js", "TypeScript", "CSS"],
    },
    {
      slug: "fieldnotes",
      name: "Fieldnotes",
      category: "Editoryal · Kavram projesi",
      summary: "Bağımsız yayınlar için okumayı merkeze alan, sade bir dijital dergi.",
      description:
        "Fieldnotes, uzun biçimli yazıların ve görsel hikâyelerin rahatça okunabilmesi için hazırlanmış editoryal bir web konseptidir.",
      role: "Editoryal konsept ve responsive arayüz",
      problem:
        "İçerik yoğun yayın sitelerinde dikkat; gezinme öğeleri, öneri kutuları ve sıkışık metin düzenleri arasında bölünebiliyor.",
      approach:
        "Geniş satır aralıkları, ölçülü bir yazı sütunu ve tutarlı içerik etiketleriyle okuma ritmini öne aldım. Sayfa dar ekranlarda da tek sütunlu ve rahat taranabilir kalacak şekilde düzenlendi.",
      intent:
        "Konsept, yazının başrol olduğu bir yayın deneyiminin nasıl sadeleşebileceğini araştırıyor.",
      theme: "fieldnotes",
      technologies: ["React", "TypeScript", "CSS"],
    },
    {
      slug: "mono",
      name: "Mono",
      category: "Tasarım sistemi · Kavram projesi",
      summary: "Ürün arayüzlerinde tutarlılığı küçük, anlaşılır yapı taşlarıyla kurmak.",
      description:
        "Mono, tekrarlanan arayüz kararlarını görünür ve yeniden kullanılabilir kılmak için tasarlanmış küçük bir tasarım sistemi konseptidir.",
      role: "Tasarım sistemi konsepti ve temel bileşenler",
      problem:
        "Ürün büyüdükçe benzer kontroller farklı davranıp görünmeye başlayabiliyor; küçük tutarsızlıklar bakım yükünü artırıyor.",
      approach:
        "Renk, tipografi ve boşluk kurallarını sınırlı bir token setinde topladım. Bu kararları buton, form alanı ve durum göstergesi gibi temel bileşenlere bağladım.",
      intent:
        "Mono'nun amacı, tasarım ve kod arasındaki ortak dili netleştirip yeni ekranların aynı temelden kurulmasını kolaylaştırmak.",
      theme: "mono",
      technologies: ["React", "TypeScript", "CSS variables"],
    },
  ] satisfies Project[],
  experience: [
    {
      period: "Devam ediyor",
      role: "Bağımsız üretim",
      organization: "Kişisel çalışmalar",
      description:
        "Modern web arayüzleri, erişilebilir etkileşimler ve performans odaklı frontend pratikleri üzerine çalışıyorum.",
      kind: "practice",
    },
    {
      period: "Güncellenecek",
      role: "Deneyim bilgisi ekleyin",
      organization: "Şirket / ekip adı",
      description:
        "Gerçek iş deneyiminizi, sorumluluğunuzu ve tarih aralığını buraya ekleyin. Bu örnek kayıt yayın öncesi düzenlenmelidir.",
      kind: "placeholder",
    },
  ] satisfies ExperienceEntry[],
} as const;

export const projectBySlug = (slug: string) =>
  portfolio.projects.find((project) => project.slug === slug);
