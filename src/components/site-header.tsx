"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navigation = [
  { id: "about", label: "Hakkımda" },
  { id: "work", label: "Projeler" },
  { id: "experience", label: "Deneyim" },
  { id: "contact", label: "İletişim" },
];

export function SiteHeader({ email, name }: { email: string; name: string }) {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname === "/" ? "home" : "");
  const [menuOpen, setMenuOpen] = useState(false);
  const [overHero, setOverHero] = useState(pathname === "/");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = ["home", ...navigation.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
        const home = entries.find((entry) => entry.target.id === "home");
        if (home) setOverHero(home.isIntersecting);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className={`site-header${overHero ? " is-over-hero" : ""}`}>
      <Link className="site-mark" href={pathname === "/" ? "#home" : "/#home"} aria-label={`${name} — ana sayfa`}>{name.charAt(0)}<span>.</span></Link>
      <button
        className="nav-toggle"
        type="button"
        ref={toggleRef}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className="sr-only">Menüyü {menuOpen ? "kapat" : "aç"}</span>
        <span className="nav-toggle-lines" aria-hidden="true" />
      </button>
      <nav id="primary-navigation" className={`site-nav${menuOpen ? " is-open" : ""}`} aria-label="Ana menü">
        {navigation.map(({ id, label }) => (
          <Link
            key={id}
            href={pathname === "/" ? `#${id}` : `/#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <a className="nav-availability" href={`mailto:${email}`}>Birlikte çalışalım <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}
