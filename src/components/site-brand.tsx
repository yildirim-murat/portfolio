import Image from "next/image";

export function SiteBrand() {
  return (
    <header className="site-brand">
      <a className="site-brand-link" href="#home" aria-label="Murat YILDIRIM, return to top">
        <Image
          src="/brand/logo.webp"
          alt=""
          width={512}
          height={512}
          priority
          sizes="52px"
          className="brand-logo"
        />
      </a>
    </header>
  );
}
