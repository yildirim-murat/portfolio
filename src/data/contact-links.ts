export type ContactChannel = "linkedin" | "whatsapp" | "email" | "github";

export type ContactLink = {
  channel: ContactChannel;
  label: string;
  href: string | null;
};

export const contactLinks: ContactLink[] = [
  { channel: "linkedin", label: "LinkedIn", href: null },
  { channel: "whatsapp", label: "WhatsApp", href: null },
  { channel: "email", label: "E-posta", href: null },
  { channel: "github", label: "GitHub", href: null },
];
