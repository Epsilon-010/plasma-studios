import { useImperativeHandle, useRef } from "react";
import { gsap } from "../../lib/gsap";
import type { Direction, SectionHandle } from "../../lib/morph";
import { TextMorph } from "../ui/text-morph";

// "Haz que tu negocio [VERB]" — Spanish subjunctive after "haz que".
// Single-word verbs around visibility, growth and standing out.
const MORPH_WORDS = [
  "destaque.",
  "crezca.",
  "resalte.",
  "llame.",
  "sobresalga.",
  "impacte.",
];

type Props = { ref?: React.Ref<SectionHandle> };

export function Manifesto({ ref }: Props) {
  const root = useRef<HTMLElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      enter: (direction) => buildEnter(root.current!, direction),
      exit: (direction) => buildExit(root.current!, direction),
    }),
    [],
  );

  return (
    <section
      ref={root}
      data-section="manifesto"
      className="relative min-h-dvh w-full flex items-center justify-center px-6 md:px-12 overflow-hidden"
      style={{ background: "#ede0c2" }}
    >
      {/* Ambient honey blob */}
      <div
        className="absolute top-1/4 -right-32 size-[440px] rounded-full pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(212,165,92,0.20), transparent 65%)",
          filter: "blur(50px)",
        }}
        aria-hidden
      />

      {/* Hairline accent at top */}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[280px] h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(176,126,61,0.65), transparent)",
        }}
        aria-hidden
      />

      <div className="max-w-5xl w-full relative z-10">
        <div
          className="text-[clamp(2.4rem,8vw,6rem)] font-display font-black leading-none tracking-[-0.035em]"
          style={{ color: "#1c130a" }}
        >
          {/* Line 1 — addressed to the visitor's business */}
          <div className="overflow-hidden pb-1">
            <div className="flex flex-wrap gap-x-[0.3em] gap-y-1">
              <span className="m-word inline-block will-change-transform">Haz</span>
              <span className="m-word inline-block will-change-transform">que</span>
              <span className="m-word inline-block will-change-transform">tu</span>
              <span className="m-word inline-block will-change-transform">negocio</span>
            </div>
          </div>

          {/* Line 2 — verb (subjunctive) morphs through outcomes */}
          <div className="overflow-hidden pb-2">
            <div className="flex flex-wrap items-baseline gap-x-[0.3em] gap-y-1">
              <span
                className="m-word inline-block will-change-transform italic"
                style={{
                  fontFamily: '"Fraunces", Georgia, serif',
                  color: "#b07e3d",
                }}
              >
                <TextMorph words={MORPH_WORDS} interval={2400} />
              </span>
            </div>
          </div>
        </div>

        {/* Closing tagline */}
        <p
          className="m-tail mt-10 max-w-xl text-sm md:text-base leading-relaxed"
          style={{ color: "#3d2918" }}
        >
          Tu sitio web es la primera impresión que tu marca proyecta cuando
          tú no estás presente. Lo diseñamos para que esa impresión cuente.
        </p>

        {/* 3 principles — poster-style cards */}
        <div className="m-promises mt-16 grid md:grid-cols-3 gap-8 md:gap-10 max-w-5xl">
          {[
            {
              k: "01",
              t: "Investigación previa",
              d: "Cada proyecto empieza por entender la marca, su audiencia y su contexto competitivo.",
            },
            {
              k: "02",
              t: "Comunicación directa",
              d: "Decisiones claras. Tú diriges la visión, nosotros la ejecución.",
            },
            {
              k: "03",
              t: "Acompañamiento posterior",
              d: "El proyecto no termina al lanzar. Te acompañamos en ajustes, optimizaciones y dudas que aparezcan en uso real.",
            },
          ].map((p) => (
            <div
              key={p.k}
              className="group glass-card-light p-7 md:p-8 rounded-2xl transition-all duration-500"
            >
              <span className="glass-card-blob-light" aria-hidden />
              <div className="relative z-10">
                {/* Small honey dot replaces the chapter numeral */}
                <span
                  className="block size-2 rounded-full mb-6"
                  style={{
                    background: "#b07e3d",
                    boxShadow: "0 0 14px rgba(212,165,92,0.85)",
                  }}
                  aria-hidden
                />
                <h3
                  className="font-display text-xl md:text-[1.6rem] font-bold tracking-[-0.01em] leading-tight mb-3 transition-transform duration-500 group-hover:translate-x-0.5 pb-1"
                  style={{ color: "#1c130a" }}
                >
                  {p.t}
                </h3>
                <p
                  className="text-[0.95rem] md:text-base leading-relaxed"
                  style={{ color: "#3d2918" }}
                >
                  {p.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function buildEnter(root: HTMLElement, direction: Direction) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  const dy = direction === "fwd" ? 40 : -40;

  tl.fromTo(root, { autoAlpha: 0, y: dy }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0)
    .fromTo(
      q(".m-word, .m-promises > div, .m-tail"),
      { y: dy * 0.4, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.04, duration: 0.45 },
      0.1,
    );

  return tl;
}

function buildExit(root: HTMLElement, direction: Direction) {
  const tl = gsap.timeline({ defaults: { ease: "power3.in" } });
  const dy = direction === "fwd" ? -40 : 40;

  tl.to(root, { autoAlpha: 0, y: dy, duration: 0.4 }, 0);
  tl.set(root, { clearProps: "transform" });
  return tl;
}
