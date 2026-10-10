import { skillGroups } from "@/data/skills";

export function AboutScreen() {
  return (
    <section className="about-screen" aria-labelledby="about-title" lang="tr">
      <div className="about-content">
        <p className="about-kicker">02 / Yaklaşım</p>
        <h2 className="about-title" id="about-title">Güvenli temeller. Modern çözümler.</h2>
        <p className="about-copy">
          Kurumsal ve bireysel ihtiyaçlar için güvenli web uygulamaları, yönetim panelleri ve mobil çözümler geliştiriyorum. Her projede performans ve kullanım kolaylığını gözetiyorum.
        </p>
        <dl className="about-skills" aria-label="Teknik yetkinlik alanları">
          {skillGroups.map((group) => (
            <div className="about-skill-group" key={group.area}>
              <dt className="about-skill-title">{group.area}</dt>
              <dd className="about-skill-list">{group.technologies.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
