import Image from "next/image";
import { featuredProject } from "@/data/featured-project";

export function FeaturedProjectScreen() {
  return (
    <section className="dashboard-screen" aria-labelledby="dashboard-title" lang="tr">
      <div className="dashboard-layout">
        <div className="dashboard-copy">
          <p className="dashboard-kicker">{featuredProject.kicker}</p>
          <h2 className="dashboard-title" id="dashboard-title">{featuredProject.name}</h2>
          <p className="dashboard-description">{featuredProject.description}</p>
          <p className="project-role">{featuredProject.contribution}</p>
          <p className="project-technologies">
            <strong>Teknolojiler:</strong> {featuredProject.technologies.join(" · ")}
          </p>
        </div>
        <figure className="dashboard-visual">
          <Image
            className="dashboard-preview"
            src={featuredProject.screenshot.src}
            alt={featuredProject.screenshot.alt}
            width={featuredProject.screenshot.width}
            height={featuredProject.screenshot.height}
            sizes="(max-width: 740px) 100vw, 62vw"
          />
        </figure>
      </div>
    </section>
  );
}
