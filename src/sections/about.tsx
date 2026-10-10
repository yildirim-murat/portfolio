import { portfolio } from "@/data/portfolio";

export function AboutSection() {
  return (
    <section id="about" className="content-section about-section" aria-labelledby="about-title">
      <div className="section-kicker">01 / Hakkımda</div>
      <div className="about-layout">
        <h2 id="about-title" className="section-heading">İyi yazılım,<br /><em>iyi hissettirir.</em></h2>
        <div className="about-copy">
          <p className="about-lead">{portfolio.intro}</p>
          <p>{portfolio.about}</p>
          <a className="text-link" href="#contact">Birlikte bir şey üretelim <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div className="skills-block" aria-labelledby="skills-title">
        <div className="skills-heading"><span id="skills-title">Nasıl çalışıyorum</span><span>TOOLS & PRACTICE</span></div>
        <div className="skills-list">
          {portfolio.skills.map((group, index) => (
            <div className="skill-group" key={group.label}>
              <span className="skill-index">0{index + 1}</span>
              <h3>{group.label}</h3>
              <p>{group.items.join(" · ")}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
