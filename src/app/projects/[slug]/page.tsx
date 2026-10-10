import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { ProjectArtwork } from "@/components/project-artwork";
import { projectBySlug, portfolio } from "@/data/portfolio";
import { absoluteUrl, hasConfiguredSiteUrl } from "@/lib/site-url";
import { SiteFooter } from "@/sections/footer";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolio.projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.description,
    ...(hasConfiguredSiteUrl && { alternates: { canonical: absoluteUrl(`/projects/${project.slug}`) } }),
    openGraph: {
      title: `${project.name} — ${portfolio.name}`,
      description: project.description,
      type: "article",
    },
    twitter: { card: "summary", title: `${project.name} — ${portfolio.name}`, description: project.description },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader email={portfolio.email} name={portfolio.name} />
      <main className="project-page">
        <div className="project-breadcrumb"><Link href="/#work">← Tüm projeler</Link><span>{project.category}</span></div>
        <header className="project-detail-heading">
          <div><span className="section-kicker">{project.category}</span><h1>{project.name}<span>.</span></h1></div>
          <p>{project.description}</p>
        </header>
        <div className="project-detail-visual project-visual"><ProjectArtwork project={project} /></div>
        <div className="project-detail-meta">
          <div><span>Katkım</span><strong>{project.role}</strong></div>
          <div><span>Teknolojiler</span><strong>{project.technologies.join(" · ")}</strong></div>
          <div><span>Tür</span><strong>Kişisel konsept çalışması</strong></div>
        </div>
        <article className="project-story">
          <section><h2>01 / Başlangıç noktası</h2><p>{project.problem}</p></section>
          <section><h2>02 / Nasıl ele aldım</h2><p>{project.approach}</p></section>
          <section><h2>03 / Tasarım niyeti</h2><p>{project.intent}</p></section>
        </article>
        <div className="project-detail-end"><span>Bir kavram çalışması · Canlı ürün veya müşteri işi değildir.</span><Link href="/#contact">Benzer bir şey konuşalım <span aria-hidden="true">↗</span></Link></div>
      </main>
      <SiteFooter />
    </>
  );
}
