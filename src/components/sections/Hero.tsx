import { lazy, Suspense, useImperativeHandle, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "../../lib/gsap";
import type { Direction, SectionHandle } from "../../lib/morph";

const LiquidOcean = lazy(() =>
  import("../ui/liquid-ocean").then((m) => ({ default: m.LiquidOcean })),
);

type HeroProps = { ref?: React.Ref<SectionHandle> };

export function Hero({ ref }: HeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isMotion: "(prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isReduced } = ctx.conditions as {
            isMotion: boolean;
            isReduced: boolean;
          };
          if (isReduced) return;
        },
      );
    },
    { scope: root },
  );

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
      data-section="hero"
      className="hero-section relative min-h-dvh w-full overflow-hidden"
      style={{ background: "#ede0c2" }}
    >
      {/* BG — warm wheat canvas with tan wireframe */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Suspense
          fallback={
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(176,126,61,0.12) 0%, transparent 70%), #ede0c2",
              }}
            />
          }
        >
          <LiquidOcean
            backgroundColor={0xede0c2}
            gridColor={0xc9a87a}
            accentColor={0xa67c46}
            showBoats={false}
            fov={28}
            rotationSpeed={0.00018}
            waveAmplitude={0.28}
            waveSpeed={0.025}
            oceanFragments={22}
            oceanSize={28}
            showWireframe={true}
            oceanOpacity={0.25}
            className="absolute inset-0 h-full w-full"
          />
        </Suspense>
        {/* Subtle warm vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 55%, rgba(190,165,125,0.10) 85%, rgba(140,105,68,0.16) 100%)",
          }}
        />
      </div>


      {/* Main stack — centered text only */}
      <div className="relative z-30 min-h-dvh w-full flex flex-col items-center justify-center px-6 md:px-12">
        {/* Title — stacked two-line, dreamcore (deep coffee + warm honey) */}
        <h1
          className="font-black tracking-[-0.04em] leading-[0.86] text-center"
          style={{
            fontFamily: '"Fraunces", Georgia, serif',
            fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
            fontStyle: "italic",
          }}
        >
          <span
            className="hero-display-word block"
            style={{
              color: "#1c130a",
              textShadow:
                "0 4px 28px rgba(122,79,44,0.16), 0 0 50px rgba(252,250,243,0.5)",
            }}
          >
            Plasma
          </span>
          <span
            className="hero-display-word block"
            style={{
              color: "#b07e3d",
              textShadow:
                "0 4px 28px rgba(176,126,61,0.28), 0 0 60px rgba(212,165,92,0.4)",
            }}
          >
            Studios
          </span>
        </h1>

        {/* Text block below title */}
        <div className="mt-8 w-full max-w-2xl text-center">
          <p
            className="hero-desc mx-auto max-w-xl leading-relaxed"
            style={{
              color: "#3d2918",
              fontSize: "clamp(1.05rem, 1.55vw, 1.35rem)",
            }}
          >
            Estudio de diseño y desarrollo digital. Construimos sitios,
            plataformas y sistemas a medida para tu{" "}
            <span
              className="relative font-bold"
              style={{ color: "#1c130a" }}
            >
              marca
              <span
                className="absolute left-0 right-0 -bottom-0.5 h-px"
                style={{
                  background: "#b07e3d",
                  boxShadow: "0 0 6px rgba(212, 165, 92, 0.65)",
                }}
                aria-hidden
              />
            </span>
            .
          </p>

          {/* CTAs */}
          <div className="hero-cta mt-6 flex items-center justify-center gap-5 flex-wrap">
            <a
              href="#contacto"
              className="group/btn inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] uppercase px-7 py-4 transition-all duration-300"
              style={{
                background: "#1c130a",
                color: "#ede0c2",
                border: "1px solid #1c130a",
                boxShadow: "0 6px 24px -6px rgba(28, 19, 10, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#1c130a";
                e.currentTarget.style.boxShadow =
                  "inset 0 0 0 1px #1c130a, 0 6px 24px -6px rgba(122, 79, 44, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#1c130a";
                e.currentTarget.style.color = "#ede0c2";
                e.currentTarget.style.boxShadow =
                  "0 6px 24px -6px rgba(28, 19, 10, 0.4)";
              }}
            >
              <span>Hablemos</span>
              <ArrowUpRight className="size-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
            <a
              href="#trabajos"
              className="font-mono text-[10px] tracking-[0.3em] uppercase transition-colors flex items-center gap-2"
              style={{ color: "#5a4332" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1c130a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#5a4332")}
            >
              <span
                className="block w-6 h-px"
                style={{ background: "rgba(61, 41, 24, 0.55)" }}
              />
              Ver trabajos
            </a>
          </div>
        </div>
      </div>

      {/* Bottom hairline */}
      <div
        className="absolute left-0 right-0 bottom-0 h-px pointer-events-none z-40"
        style={{ background: "rgba(61, 41, 24, 0.18)" }}
        aria-hidden
      />
    </section>
  );
}

function buildEnter(root: HTMLElement, direction: Direction) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  const dy = direction === "fwd" ? 40 : -40;

  tl.fromTo(
    root,
    { autoAlpha: 0, y: dy },
    { autoAlpha: 1, y: 0, duration: 0.55 },
    0,
  )
    .fromTo(
      q(".hero-display-word"),
      { yPercent: 80, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
      },
      0.18,
    )
    .fromTo(
      q(".hero-desc, .hero-cta"),
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 },
      0.55,
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
