"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getCurrentYear = () => new Date().getFullYear();

type ContactCopyrightProps = {
  initialYear: number;
};

export function ContactCopyright({ initialYear }: ContactCopyrightProps) {
  const year = useSyncExternalStore(subscribe, getCurrentYear, () => initialYear);

  return <p className="contact-copyright">© Murat YILDIRIM {year}</p>;
}
