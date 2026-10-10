import { GlobeLoader } from "@/components/globe/globe-loader";
import { TypewriterTagline } from "@/components/typewriter-tagline";

type HeroProps = { name: string };

export default function Hero({ name }: HeroProps) {
  const [givenName, ...familyName] = name.trim().split(/\s+/);

  return (
    <section className="landing-shell" aria-labelledby="hero-name" id="home">
      <div className="hero">
        <div className="hero-copy">
          <h1 id="hero-name" className="hero-name">
            <span>{givenName}</span>
            <span>{familyName.join(" ")}</span>
          </h1>
          <p className="hero-role" lang="en">Software Developer</p>
          <p className="hero-tagline" lang="en">
            <TypewriterTagline text="Building software for the connected world." />
          </p>
          <p className="hero-supporting-copy" lang="tr">
            Kurumlar ve bireyler için güvenli web uygulamaları, yönetim panelleri ve mobil çözümler.
          </p>
          <a className="hero-contact-link" href="#contact" lang="tr">
            Projenizi konuşalım <span aria-hidden="true">↘</span>
          </a>
        </div>

        <div className="globe-frame" aria-hidden="false">
          <GlobeLoader />
        </div>
      </div>
    </section>
  );
}
