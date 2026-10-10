"use client";

import { useState } from "react";

type EmailActionProps = { email: string };

export function EmailAction({ email }: EmailActionProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <div className="email-action">
      <a href={`mailto:${email}`}>{email}</a>
      <button type="button" onClick={copyEmail} aria-label="E-posta adresini kopyala">
        {copyStatus === "copied" ? "Kopyalandı ✓" : copyStatus === "failed" ? "Tekrar dene ↻" : "Kopyala ↗"}
      </button>
      <span className={copyStatus === "failed" ? "email-status is-error" : "email-status sr-only"} role="status" aria-live="polite">
        {copyStatus === "copied" ? "E-posta adresi panoya kopyalandı." : copyStatus === "failed" ? "Kopyalama başarısız oldu. E-posta bağlantısını kullanabilirsin." : ""}
      </span>
    </div>
  );
}
