export type ContactChannel = "linkedin" | "whatsapp" | "email" | "github";

export type ContactLink = {
  channel: ContactChannel;
  label: string;
  href: string | null;
};

export const contactLinks: ContactLink[] = [
  {
    channel: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/murat-yildirim-2a0385250",
  },
  { channel: "whatsapp", label: "WhatsApp", href: "https://wa.me/muratyildirim42" },
  { channel: "email", label: "E-posta", href: "mailto:muratyildirim.work@gmail.com" },
  { channel: "github", label: "GitHub", href: "https://github.com/yildirim-murat" },
];
