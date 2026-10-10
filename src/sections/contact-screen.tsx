import { contactLinks, type ContactChannel } from "@/data/contact-links";
import { ContactCopyright } from "@/components/contact-copyright";

function ContactIcon({ channel }: { channel: ContactChannel }) {
  const common = {
    "aria-hidden": true as const,
    focusable: false as const,
    fill: "currentColor",
    viewBox: "0 0 24 24",
  };

  switch (channel) {
    case "linkedin":
      return (
        <svg {...common}>
          <path d="M5.2 8.4H2.1V22h3.1V8.4ZM3.65 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM21.9 13.2c0-4.1-2.2-6-5.1-6a4.4 4.4 0 0 0-4 2.2V8.4H9.7V22h3.1v-6.7c0-1.8.3-3.6 2.6-3.6s2.3 2.1 2.3 3.7V22h3.1l1.1-8.8Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M12 2a9.8 9.8 0 0 0-8.4 14.8L2.3 22l5.3-1.4A10 10 0 1 0 12 2Zm0 17.9a8 8 0 0 1-4.1-1.1l-.3-.2-3.1.8.8-3-.2-.4A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.3.2-.3.7-1a.4.4 0 0 0 0-.5l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2c0 1.1.8 2.1.9 2.3.1.2 1.5 2.4 3.7 3.3 1.4.6 2 .7 2.7.6.4-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.3Z" />
        </svg>
      );
    case "email":
      return (
        <svg {...common}>
          <path d="M3 4h18a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm9 8.1L20.5 6h-17L12 12.1ZM3 18h18V8.4l-9 6.5-9-6.5V18Z" />
        </svg>
      );
    case "github":
      return (
        <svg {...common}>
          <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.3-3.9-1.3-.5-1.3-1.3-1.7-1.3-1.7-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.3 5.8.4.3.8 1 .8 2v3c0 .3.2.6.8.5A11.1 11.1 0 0 0 12 .9Z" />
        </svg>
      );
  }
}

export function ContactScreen() {
  return (
    <section className="contact-screen" id="contact" aria-labelledby="contact-title" lang="tr">
      <div className="contact-invitation">
        <h2 className="contact-title" id="contact-title">Birlikte ne geliştirebiliriz?</h2>
        <p className="contact-copy">
          Güvenli ve kullanımı kolay bir web ya da mobil çözüm fikriniz varsa, konuşalım.
        </p>
        <a className="contact-cta" href="mailto:muratyildirim.work@gmail.com">
          E-posta ile ulaşın <span aria-hidden="true">↗</span>
        </a>
      </div>
      <ul className="contact-link-list">
        {contactLinks.map(({ channel, label, href }) => (
          <li className="contact-link-item" data-channel={channel} key={channel}>
            {href ? (
              <a
                className="contact-link"
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ContactIcon channel={channel} />
                <span className="sr-only">{label}</span>
              </a>
            ) : (
              <span className="contact-link" aria-disabled="true">
                <ContactIcon channel={channel} />
                <span className="sr-only">{label} bağlantısı henüz eklenmedi</span>
              </span>
            )}
          </li>
        ))}
      </ul>
      <footer className="contact-footer">
        <ContactCopyright initialYear={new Date().getFullYear()} />
      </footer>
    </section>
  );
}
