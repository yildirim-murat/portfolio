import Image from "next/image";
import { mobileApp } from "@/data/mobile-app";

function MobilePlatformMark({ platform }: { platform: "Android" | "iOS" }) {
  if (platform === "Android") {
    return (
      <svg
        className="mobile-app-platform-mark mobile-app-platform-mark--android"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
      >
        <path d="m7 5-1.1-1.9.9-.5 1.3 2.2Zm10 0 1.1-1.9-.9-.5-1.3 2.2Z" />
        <path d="M4 11a8 8 0 0 1 16 0v1H4v-1Z" />
        <path d="M4.5 12h15v6a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-6Z" />
        <rect x="2.25" y="13" width="2.25" height="5.5" rx="1.1" />
        <rect x="19.5" y="13" width="2.25" height="5.5" rx="1.1" />
        <rect x="7.5" y="19.2" width="3" height="3.6" rx="1.4" />
        <rect x="13.5" y="19.2" width="3" height="3.6" rx="1.4" />
        <circle cx="8.5" cy="8.5" r=".85" fill="#f2f1ec" />
        <circle cx="15.5" cy="8.5" r=".85" fill="#f2f1ec" />
      </svg>
    );
  }

  return (
    <svg
      className="mobile-app-platform-mark mobile-app-platform-mark--apple"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16.4 12.8c0-2.1 1.7-3.1 1.8-3.2a4 4 0 0 0-3.2-1.7c-1.4-.1-2.7.9-3.4.9-.7 0-1.8-.9-3-.9a4.5 4.5 0 0 0-3.8 2.3c-1.6 2.8-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.7 2.3 1.1-.1 1.5-.7 2.9-.7s1.8.7 2.9.7c1.2 0 1.9-1.1 2.6-2.2a9.8 9.8 0 0 0 1.2-2.5 3.8 3.8 0 0 1-1.8-3.3ZM14.1 6.4a3.9 3.9 0 0 0 .9-2.8 4 4 0 0 0-2.6 1.3 3.7 3.7 0 0 0-.9 2.7 3.3 3.3 0 0 0 2.6-1.2Z" />
    </svg>
  );
}

export function MobileAppScreen() {
  return (
    <section className="mobile-app-screen" aria-labelledby="mobile-app-title" lang="tr">
      <div className="mobile-app-layout">
        <div className="mobile-app-copy">
          <p className="mobile-app-kicker">{mobileApp.kicker}</p>
          <h2 className="mobile-app-title" id="mobile-app-title">
            {mobileApp.title}
          </h2>
          <p className="mobile-app-description">{mobileApp.description}</p>
          <p className="project-role">{mobileApp.contribution}</p>
          <p className="project-technologies">
            <strong>Teknolojiler:</strong> {mobileApp.technologies.join(" · ")}
          </p>
        </div>
        <div
          className="mobile-app-previews"
          role="group"
          aria-label="Temsili mobil uygulama ekranları"
        >
          {mobileApp.previews.map((preview) => (
            <figure className="mobile-app-preview" key={preview.platform}>
              <Image
                src={preview.src}
                alt={preview.alt}
                width={preview.width}
                height={preview.height}
                sizes="(max-width: 740px) 42vw, 22vw"
              />
              <figcaption className="mobile-app-caption">
                <MobilePlatformMark platform={preview.platform} />
                {preview.platform === "Android" ? (
                  <span className="sr-only">Android</span>
                ) : (
                  <span className="sr-only">iOS</span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
