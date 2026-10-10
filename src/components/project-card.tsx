import Link from "next/link";
import type { Project } from "@/data/portfolio";
import { ProjectArtwork } from "@/components/project-artwork";

type ProjectCardProps = { project: Project };

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className={`project-card project-card-${project.theme}`}>
      <Link className="project-card-link" href={`/projects/${project.slug}`} aria-label={`${project.name} projesini incele`}>
        <div className="project-visual"><ProjectArtwork project={project} /></div>
        <div className="project-card-meta"><span>{project.category}</span></div>
        <div className="project-card-copy">
          <h3>{project.name}<span aria-hidden="true">↗</span></h3>
          <p>{project.summary}</p>
        </div>
      </Link>
    </article>
  );
}
