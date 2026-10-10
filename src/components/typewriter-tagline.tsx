import styles from "./typewriter-tagline.module.css";

type TypewriterTaglineProps = {
  text: string;
};

export function TypewriterTagline({ text }: TypewriterTaglineProps) {
  const parts = text.split(/(\s+)/u);

  return (
    <span className={styles.root}>
      <span className={styles.screenReaderText}>{text}</span>
      <span className={styles.measure} aria-hidden="true">
        {text}
      </span>
      <span className={styles.visualText} aria-hidden="true">
        {parts.map((part, wordIndex) => {
          if (/^\s+$/u.test(part)) return part;
          const characterOffset = parts.slice(0, wordIndex).join("").length;

          return (
            <span className={styles.word} key={`${part}-${wordIndex}`}>
              {Array.from(part).map((character, index) => {
                const characterIndex = characterOffset + index;
                const delay = `${180 + characterIndex * 30}ms`;

                return (
                  <span className={styles.character} key={`${character}-${characterIndex}`} style={{ animationDelay: delay }}>
                    {character}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </span>
  );
}
