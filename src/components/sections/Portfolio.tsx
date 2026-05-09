import { memo, useImperativeHandle, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "../../lib/gsap";
import type { Direction, SectionHandle } from "../../lib/morph";

type Project = {
  code: string;
  title: string;
  tag: string;
  accent: string;
  url: string;
  stack: string[];
};

// Hoisted so it isn't recompiled on every ProjectCard render.
const PROTOCOL_REGEX = /^https?:\/\//;

// Live deployed projects. Iframe shows the site; click opens in a new tab.
const projects: Project[] = [
  {
    code: "P.001",
    title: "149 Arquitectura",
    tag: "Sitio corporativo — Estudio de arquitectura",
    accent: "Portafolio de proyectos, servicios y contacto.",
    url: "https://www.149arquitectura.com/",
    stack: ["React", "Tailwind", "GSAP"],
  },
  {
    code: "P.002",
    title: "Quevedo Express",
    tag: "Sitio web — Servicio de paquetería",
    accent: "Información de servicios, cobertura y solicitud.",
    url: "https://www.servicio-quevedo-express.com/",
    stack: ["Next.js", "Tailwind", "TypeScript"],
  },
];

type Props = { ref?: React.Ref<SectionHandle> };

export function Portfolio({ ref }: Props) {
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
      data-section="trabajos"
      className="relative min-h-dvh w-full flex flex-col items-center justify-center px-6 md:px-12 py-24 overflow-hidden"
      style={{ background: "#ede0c2" }}
    >
      {/* Ambient honey blob — corner accent */}
      <div
        className="absolute -top-20 left-1/4 size-[480px] rounded-full pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(212,165,92,0.20), transparent 65%)",
          filter: "blur(50px)",
        }}
        aria-hidden
      />

      {/* Hairline accent */}
      <div
        className="absolute top-24 left-1/2 -translate-x-1/2 w-[280px] h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(176,126,61,0.65), transparent)",
        }}
        aria-hidden
      />

      <div className="max-w-6xl w-full relative z-10">
        <div className="pf-head mb-14 md:mb-20">
          <h2
            className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-black tracking-[-0.035em] leading-none max-w-3xl pb-1"
            style={{ color: "#1c130a" }}
          >
            Proyectos{" "}
            <span
              className="italic"
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                color: "#b07e3d",
              }}
            >
              seleccionados
            </span>
            .
          </h2>
          <p
            className="mt-5 text-sm md:text-base max-w-xl leading-relaxed"
            style={{ color: "#3d2918" }}
          >
            Casos en producción y proyectos vivos. Click en cualquiera para
            visitarlo.
          </p>
        </div>

        {/* 2-column grid with live iframe previews */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((p) => (
            <ProjectCard key={p.code} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

const ProjectCard = memo(function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="pf-card group glass-card-light block p-3 rounded-2xl transition-all duration-500"
    >
      <span className="glass-card-blob-light" aria-hidden />
      {/* Browser-frame mock — light cream chrome */}
      <div
        className="relative z-10 overflow-hidden rounded-xl transition-all duration-500"
        style={{
          background: "rgba(255,255,255,0.7)",
          border: "1px solid rgba(176,126,61,0.20)",
          boxShadow:
            "0 12px 30px -12px rgba(122,79,44,0.20), inset 0 1px 0 rgba(255,255,255,0.85)",
        }}
      >
        {/* Top bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{
            background: "rgba(252,250,243,0.85)",
            borderBottom: "1px solid rgba(176,126,61,0.16)",
          }}
        >
          <div className="flex gap-1.5">
            <span
              className="size-2.5 rounded-full"
              style={{
                background: "rgba(212,165,92,0.85)",
                boxShadow: "0 0 6px rgba(212,165,92,0.55)",
              }}
              aria-hidden
            />
            <span
              className="size-2.5 rounded-full"
              style={{ background: "rgba(176,126,61,0.35)" }}
              aria-hidden
            />
            <span
              className="size-2.5 rounded-full"
              style={{ background: "rgba(176,126,61,0.20)" }}
              aria-hidden
            />
          </div>
          <div
            className="flex-1 mx-3 px-3 py-1 rounded-md font-mono text-[10px] tracking-widest truncate"
            style={{
              background: "rgba(255,255,255,0.55)",
              color: "#5a4332",
            }}
          >
            {project.url.replace(PROTOCOL_REGEX, "")}
          </div>
          <ArrowUpRight
            className="size-3.5 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{ color: "#5a4332" }}
          />
        </div>

        {/* Live iframe preview — pointer-events-none so click goes to parent <a> */}
        <div className="relative aspect-16/10 overflow-hidden pointer-events-none">
          <iframe
            src={project.url}
            title={project.title}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            className="absolute top-0 left-0 origin-top-left w-[200%] h-[200%]"
            style={{
              transform: "scale(0.5)",
              border: "none",
            }}
          />
          {/* Hover honey halo overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 30%, rgba(212,165,92,0.18) 100%)",
            }}
            aria-hidden
          />
        </div>
      </div>

      {/* Project info below */}
      <div className="relative z-10 mt-5 px-3 pb-2">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="font-mono text-[10px] tracking-[0.3em] font-bold"
                style={{ color: "#b07e3d" }}
              >
                {project.code}
              </span>
              <span
                className="font-mono text-[10px] tracking-[0.3em] uppercase"
                style={{ color: "#8a6e52" }}
              >
                {project.tag}
              </span>
            </div>
            <h3
              className="font-display text-2xl md:text-[1.6rem] font-black tracking-tight leading-tight mb-2 transition-transform duration-500 group-hover:translate-x-0.5"
              style={{ color: "#1c130a" }}
            >
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#3d2918" }}>
              {project.accent}
            </p>
          </div>
        </div>

        {/* Stack */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-1 rounded transition-all duration-500"
              style={{
                color: "#5a4332",
                border: "1px solid rgba(176,126,61,0.30)",
                background: "rgba(255,255,255,0.45)",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
});

function buildEnter(root: HTMLElement, direction: Direction) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  const dy = direction === "fwd" ? 40 : -40;

  tl.fromTo(
    root,
    { autoAlpha: 0, y: dy },
    { autoAlpha: 1, y: 0, duration: 0.55 },
    0,
  ).fromTo(
    q(".pf-head, .pf-card"),
    { y: dy * 0.4, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.55 },
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
