import { portfolio } from "@/data/portfolio";

export function ExperienceSection() {
  return (
    <section id="experience" className="content-section experience-section" aria-labelledby="experience-title">
      <div className="section-kicker">03 / Deneyim</div>
      <div className="experience-layout">
        <h2 id="experience-title" className="section-heading">Sürekli<br /><em>öğrenerek.</em></h2>
        <div className="experience-list">
          {portfolio.experience.map((entry) => (
            <article className={`experience-entry${entry.kind === "placeholder" ? " is-placeholder" : ""}`} key={`${entry.period}-${entry.organization}`}>
              <div className="experience-period">{entry.period}</div>
              <div><h3>{entry.role}</h3><div className="experience-org">{entry.organization}</div><p>{entry.description}</p></div>
            </article>
          ))}
        </div>
      </div>
      <p className="content-note">Bu sayfadaki isim, iletişim, deneyim ve proje metinleri başlangıç içeriğidir. Yayına almadan önce kendi bilgilerinle güncelle.</p>
    </section>
  );
}
