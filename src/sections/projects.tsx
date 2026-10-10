import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { ProjectCard } from "@/components/project-card";

export function ProjectsSection() {
  return (
    <section id="work" className="content-section projects-section" aria-labelledby="work-title">
      <div className="section-topline"><span className="section-kicker">02 / Seçili işler</span><span className="section-note">Fikirden arayüze, küçük bir seçki.</span></div>
      <div className="section-title-row">
        <h2 id="work-title" className="section-heading">Merakla<br /><em>yapıldı.</em></h2>
        <p>Her proje, bir problemi daha anlaşılır ve daha insani bir dijital deneyime dönüştürme denemesi.</p>
      </div>
      <div className="project-grid">
        {portfolio.projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
      </div>
      <p className="projects-disclaimer">Bu seçkideki arayüzler kavram projeleridir; gerçek müşteri işleri veya yayındaki ürünler olarak sunulmamaktadır.</p>
      <div className="projects-more"><span>Üç küçük fikir, açık uçlu bir süreç.</span><Link href="#contact">Bir fikrin mi var? <span aria-hidden="true">↗</span></Link></div>
    </section>
  );
}
