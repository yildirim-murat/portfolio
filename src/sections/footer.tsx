import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-mark" href="#home">M<span>.</span></Link>
      <p>{portfolio.location} · Web için özenle yapıldı.</p>
      <a href={`mailto:${portfolio.email}`}>{portfolio.email} <span aria-hidden="true">↗</span></a>
      {portfolio.socials.length > 0 && (
        <nav className="footer-socials" aria-label="Sosyal bağlantılar">
          {portfolio.socials.map(({ href, label }) => (
            <a href={href} key={label} target="_blank" rel="noreferrer">{label} <span aria-hidden="true">↗</span></a>
          ))}
        </nav>
      )}
      <span className="footer-year">© {new Date().getFullYear()} {portfolio.name}</span>
    </footer>
  );
}
