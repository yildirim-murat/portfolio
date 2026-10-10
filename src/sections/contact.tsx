import { portfolio } from "@/data/portfolio";
import { EmailAction } from "@/components/email-action";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="section-kicker">04 / İletişim</div>
      <div className="contact-layout">
        <div>
          <p className="contact-availability"><span />{portfolio.availability}</p>
          <h2 id="contact-title">Bir sonraki<br /><em>güzel şey</em><br />ne olsun?</h2>
        </div>
        <div className="contact-aside"><p>Bir proje, fikir ya da sadece merhaba demek için e-posta bırakabilirsin. Sana en kısa zamanda dönerim.</p><EmailAction email={portfolio.email} /></div>
      </div>
    </section>
  );
}
