import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { cn } from "../../lib/cn";

type TextMorphProps = {
  /** Words to cycle through */
  words: string[];
  /** Time between morphs in ms */
  interval?: number;
  className?: string;
  charClassName?: string;
};

/**
 * Morphs through a list of words, character by character (blur + slide).
 * Powered by GSAP — no framer-motion dep.
 */
export function TextMorph({
  words,
  interval = 2500,
  className,
  charClassName,
}: TextMorphProps) {
  const [index, setIndex] = useState(0);
  const rootRef = useRef<HTMLSpanElement>(null);

  // Cycle the active word
  useEffect(() => {
    if (words.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  // Animate the chars in (blur + slide-up) every time index changes
  useGSAP(
    () => {
      if (!rootRef.current) return;
      const chars = rootRef.current.querySelectorAll<HTMLElement>(".tm-char");
      if (!chars.length) return;
      gsap.fromTo(
        chars,
        { y: 10, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.4,
          stagger: 0.03,
          ease: "power2.out",
        },
      );
    },
    { dependencies: [index], scope: rootRef },
  );

  if (!words.length) return null;

  const word = words[index] ?? "";
  const chars = Array.from(word);

  return (
    <span
      ref={rootRef}
      className={cn("inline-block", className)}
      aria-live="polite"
    >
      {chars.map((c, i) => (
        // Re-key on index so React mounts fresh nodes — gsap.fromTo runs from initial state
        <span
          key={`${index}-${i}`}
          className={cn("tm-char inline-block will-change-transform", charClassName)}
        >
          {c === " " ? " " : c}
        </span>
      ))}
    </span>
  );
}

export default TextMorph;
