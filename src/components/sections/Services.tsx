import { memo, useImperativeHandle, useRef } from "react";
import {
  Sparkles,
  Globe,
  Server,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { gsap } from "../../lib/gsap";
import type { Direction, SectionHandle } from "../../lib/morph";

type Capability = {
  Icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
    style?: React.CSSProperties;
  }>;
  title: string;
  tagline: string;
  examples: string[];
};

const capabilities: Capability[] = [
  {
    Icon: Sparkles,
    title: "Landing page",
    tagline:
      "Una página enfocada en una conversión específica, ejecutada con detalle.",
    examples: [
      "Lanzamiento de producto o servicio",
      "Página de evento, conferencia o curso",
      "Captación con formulario o booking integrado",
      "Presencia profesional / portafolio personal",
    ],
  },
  {
    Icon: Globe,
    title: "Sitio corporativo",
    tagline:
      "Presencia digital multi-sección para marcas con varias historias que contar.",
    examples: [
      "Sitios de empresa, despacho o agencia",
      "Multi-idioma con SEO técnico",
      "CMS para edición autónoma",
      "Blog editorial, casos de estudio, recursos",
    ],
  },
  {
    Icon: Server,
    title: "Plataforma a medida",
    tagline:
      "Frontend + backend trabajando juntos. Lógica real, no solo páginas.",
    examples: [
      "Áreas de cliente con autenticación",
      "Dashboards con datos en vivo",
      "Sistemas de reservas, agendas, citas",
      "Herramientas internas para tu equipo",
    ],
  },
  {
    Icon: Layers,
    title: "Aplicación web completa",
    tagline:
      "Producto digital con todo lo necesario para operar en producción.",
    examples: [
      "Auth, base de datos, API",
      "Integración con servicios externos (pagos, email, terceros)",
      "Subida de archivos, búsqueda, filtros complejos",
      "Despliegue, monitoreo y soporte continuo",
    ],
  },
];

type Props = { ref?: React.Ref<SectionHandle> };

export function Services({ ref }: Props) {
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
      data-section="servicios"
      className="relative min-h-dvh w-full flex flex-col items-center md:justify-center px-6 md:px-12 pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden"
      style={{ background: "#ede0c2" }}
    >
      {/* Ambient honey blobs — section-level brand presence */}
      <div
        className="absolute top-1/3 -left-32 size-[420px] rounded-full pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(212,165,92,0.22), transparent 65%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />
      <div
        className="absolute bottom-0 -right-32 size-[420px] rounded-full pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(212,165,92,0.18), transparent 65%)",
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
        <div className="s-head mb-10 md:mb-20">
          <h2
            className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-black tracking-[-0.035em] leading-none max-w-3xl pb-1"
            style={{ color: "#1c130a" }}
          >
            Diseñamos y construimos lo que tu marca{" "}
            <span
              className="italic"
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                color: "#b07e3d",
              }}
            >
              necesita
            </span>
            .
          </h2>
          <p
            className="mt-5 text-sm md:text-base max-w-2xl leading-relaxed"
            style={{ color: "#3d2918" }}
          >
            Del sitio más simple a una plataforma con backend completo. Los
            siguientes son formatos comunes — tu proyecto puede combinar
            varios o ser algo distinto por completo.
          </p>
        </div>

        {/* Glass card grid */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {capabilities.map((c) => (
            <CapabilityCard key={c.title} cap={c} />
          ))}
        </div>

        {/* Open-ended closer card */}
        <div className="s-card mt-6">
          <a
            href="#contacto"
            className="group glass-card-light glass-card-light--honey block p-6 md:p-10 rounded-3xl"
          >
            <span className="glass-card-blob-light" aria-hidden />
            <div className="relative z-10 flex items-center justify-between gap-6 flex-wrap">
              <div className="flex-1 min-w-[260px]">
                <p
                  className="font-mono text-[10px] tracking-[0.35em] uppercase mb-3"
                  style={{ color: "#b07e3d" }}
                >
                  · Algo distinto
                </p>
                <h3
                  className="font-display text-2xl md:text-3xl font-black tracking-tight leading-tight mb-2 pb-1"
                  style={{ color: "#1c130a" }}
                >
                  Si no encaja en ninguno, lo construimos igual.
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-xl"
                  style={{ color: "#3d2918" }}
                >
                  Cada proyecto se diseña según el problema, no según el
                  catálogo. Cuéntanos qué necesitas y proponemos cómo
                  resolverlo.
                </p>
              </div>
              <span
                className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.3em] uppercase transition-all duration-300 group-hover:gap-3"
                style={{ color: "#1c130a" }}
              >
                Hablemos
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

type CapabilityCardProps = { cap: Capability };

const CapabilityCard = memo(function CapabilityCard({
  cap,
}: CapabilityCardProps) {
  return (
    <a
      href="#contacto"
      className="s-card group glass-card-crystal block p-6 md:p-9 rounded-3xl h-full"
    >
      <span className="glass-card-blob-light" aria-hidden />

      <div className="relative z-10 flex flex-col h-full">
        {/* Icon */}
        <div className="mb-7">
          <div
            className="inline-flex items-center justify-center size-12 rounded-xl transition-all duration-500 group-hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, rgba(212,165,92,0.22), rgba(255,255,255,0.5))",
              border: "1px solid rgba(176,126,61,0.36)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.85), 0 0 18px -4px rgba(212,165,92,0.5)",
            }}
          >
            <cap.Icon
              className="size-5 transition-transform duration-500 group-hover:-rotate-6"
              style={{
                color: "#1c130a",
                filter: "drop-shadow(0 0 6px rgba(212,165,92,0.65))",
              }}
              strokeWidth={1.5}
            />
          </div>
        </div>

        {/* Title */}
        <h3
          className="font-display text-2xl md:text-[1.85rem] font-black tracking-[-0.02em] leading-[1.05] mb-3"
          style={{ color: "#1c130a" }}
        >
          {cap.title}.
        </h3>

        {/* Tagline */}
        <p
          className="text-sm md:text-[0.95rem] leading-relaxed mb-7 max-w-[40ch]"
          style={{ color: "#3d2918" }}
        >
          {cap.tagline}
        </p>

        {/* Examples */}
        <p
          className="font-mono text-[10px] tracking-[0.3em] uppercase mb-3"
          style={{ color: "#8a6e52" }}
        >
          Por ejemplo
        </p>
        <ul className="space-y-2.5 mb-6">
          {cap.examples.map((ex, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-[13px] leading-snug"
              style={{ color: "#3d2918" }}
            >
              <span
                className="block w-3 h-px mt-2 shrink-0 transition-all duration-500 group-hover:w-5"
                style={{
                  background: "rgba(176,126,61,0.7)",
                  boxShadow: "0 0 4px rgba(212,165,92,0.55)",
                }}
                aria-hidden
              />
              <span>{ex}</span>
            </li>
          ))}
        </ul>

        {/* CTA tail — pinned bottom */}
        <div
          className="mt-auto pt-5 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(176,126,61,0.18)" }}
        >
          <span
            className="font-mono text-[10px] tracking-[0.3em] uppercase transition-colors duration-300"
            style={{ color: "#8a6e52" }}
          >
            Ver detalles
          </span>
          <span
            className="inline-flex items-center justify-center size-8 rounded-full transition-all duration-500 group-hover:scale-110"
            style={{
              border: "1px solid rgba(176,126,61,0.32)",
              background: "rgba(255,255,255,0.5)",
            }}
          >
            <ArrowUpRight
              className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ color: "#1c130a" }}
            />
          </span>
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
    q(".s-head, .s-card"),
    { y: dy * 0.4, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, stagger: 0.05, duration: 0.45 },
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
