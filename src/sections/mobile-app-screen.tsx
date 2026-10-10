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
        <path d="M7.2 8.4 5.7 5.8l.9-.5 1.5 2.6a8 8 0 0 1 7.8 0l1.5-2.6.9.5-1.5 2.6a6.8 6.8 0 0 1 2.7 5.4H4.5a6.8 6.8 0 0 1 2.7-5.4ZM8 11a.8.8 0 1 0 0 1.6A.8.8 0 0 0 8 11Zm8 0a.8.8 0 1 0 0 1.6.8.8 0 0 0 0-1.6ZM4.5 14.8h15v4.1a1.1 1.1 0 0 1-1.1 1.1h-.7v2h-1.5v-2h-7v2H7.7v-2H7a1.1 1.1 0 0 1-1.1-1.1v-4.1ZM2.3 14.8h1.5v4.1H2.3v-4.1Zm17.9 0h1.5v4.1h-1.5v-4.1Z" />
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
