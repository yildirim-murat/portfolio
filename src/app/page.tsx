import { SiteHeader } from "@/components/site-header";
import { portfolio } from "@/data/portfolio";
import Hero from "@/components/hero";
import { AboutSection } from "@/sections/about";
import { ProjectsSection } from "@/sections/projects";
import { ExperienceSection } from "@/sections/experience";
import { ContactSection } from "@/sections/contact";
import { SiteFooter } from "@/sections/footer";

export default function HomePage() {
  return (
    <>
      <SiteHeader email={portfolio.email} name={portfolio.name} />
      <main>
        <Hero name={portfolio.name} />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
