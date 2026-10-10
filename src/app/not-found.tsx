import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <span className="section-kicker">404 / KAYIP SAYFA</span>
      <h1>Burada<br /><em>bir şey yok.</em></h1>
      <p>Aradığın sayfa taşınmış ya da adresi değişmiş olabilir.</p>
      <Link className="text-link" href="/">Ana sayfaya dön <span aria-hidden="true">↗</span></Link>
    </main>
  );
}
