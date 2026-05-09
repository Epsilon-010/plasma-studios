import { useImperativeHandle, useRef, useState } from "react";
import { Mail, MessageCircle, ArrowUpRight } from "lucide-react";
import { gsap } from "../../lib/gsap";
import type { Direction, SectionHandle } from "../../lib/morph";

const PHONE_DIGITS = "529514997286";
const PHONE_DISPLAY = "+52 951 499 7286";
const EMAIL = "hola@plasmastudios.mx";

type Props = { ref?: React.Ref<SectionHandle> };

export function Contact({ ref }: Props) {
  const root = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "Landing page",
    message: "",
  });

  useImperativeHandle(
    ref,
    () => ({
      enter: (direction) => buildEnter(root.current!, direction),
      exit: (direction) => buildExit(root.current!, direction),
    }),
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Cotización: ${form.projectType}`);
    const body = encodeURIComponent(
      `Hola, soy ${form.name} (${form.email}).\n\nProyecto: ${form.projectType}\n\n${form.message}`,
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const isValid = form.name.trim() && form.email.trim() && form.message.trim();

  return (
    <section
      ref={root}
      data-section="contacto"
      className="relative min-h-dvh w-full flex flex-col items-center justify-center px-6 md:px-12 py-24 overflow-hidden"
      style={{ background: "#ede0c2" }}
    >
      {/* Ambient honey blob */}
      <div
        className="absolute bottom-1/4 -left-40 size-[480px] rounded-full pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(212,165,92,0.22), transparent 65%)",
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

      <div className="max-w-5xl w-full relative z-10 grid md:grid-cols-2 gap-12 md:gap-20 items-start">
        {/* LEFT — pitch */}
        <div className="c-head">
          <h2
            className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-black tracking-[-0.035em] leading-none pb-1"
            style={{ color: "#1c130a" }}
          >
            Iniciemos{" "}
            <span
              className="italic"
              style={{
                fontFamily: '"Fraunces", Georgia, serif',
                color: "#b07e3d",
              }}
            >
              conversación
            </span>
            .
          </h2>
          <p
            className="mt-5 text-sm md:text-base leading-relaxed max-w-md"
            style={{ color: "#3d2918" }}
          >
            Reunión inicial sin compromiso de 30 minutos para evaluar
            el alcance del proyecto y proponer cronograma.
          </p>

          {/* Direct contact info — phone is the headliner */}
          <div className="mt-10 space-y-3">
            <a
              href={`tel:+${PHONE_DIGITS}`}
              className="group block font-display text-3xl md:text-[2.4rem] font-black tracking-[-0.02em] hover:translate-x-0.5 transition-transform duration-300"
              style={{ color: "#1c130a" }}
            >
              {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="group block font-display text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300"
              style={{ color: "#5a4332" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1c130a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#5a4332")}
            >
              {EMAIL}
            </a>
          </div>

          {/* Direct channels — buttons under the contact details */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={`https://wa.me/${PHONE_DIGITS}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase transition-colors"
              style={{ color: "#3d2918" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1c130a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3d2918")}
            >
              <MessageCircle className="size-3.5" />
              WhatsApp
              <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <span style={{ color: "rgba(61, 41, 24, 0.32)" }}>·</span>
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase transition-colors"
              style={{ color: "#3d2918" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1c130a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#3d2918")}
            >
              <Mail className="size-3.5" />
              Email
              <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Quick service info — glass panel (cream) */}
          <div className="glass-card-light mt-10 p-6 rounded-2xl max-w-md">
            <div className="relative z-10 space-y-3">
              <div
                className="flex items-baseline justify-between gap-4 pb-3"
                style={{ borderBottom: "1px solid rgba(176,126,61,0.18)" }}
              >
                <span
                  className="font-mono text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: "#8a6e52" }}
                >
                  Respuesta
                </span>
                <span className="text-sm" style={{ color: "#3d2918" }}>
                  24 horas hábiles
                </span>
              </div>
              <div
                className="flex items-baseline justify-between gap-4 pb-3"
                style={{ borderBottom: "1px solid rgba(176,126,61,0.18)" }}
              >
                <span
                  className="font-mono text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: "#8a6e52" }}
                >
                  Reunión inicial
                </span>
                <span className="text-sm" style={{ color: "#3d2918" }}>
                  Sin compromiso · 30 min
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <span
                  className="font-mono text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: "#8a6e52" }}
                >
                  Ubicación
                </span>
                <span className="text-sm" style={{ color: "#3d2918" }}>
                  Oaxaca, México
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — form wrapped in honey glass card */}
        <form
          onSubmit={handleSubmit}
          className="c-form glass-card-light glass-card-light--honey grid gap-5 p-7 md:p-8 rounded-3xl"
        >
          <span className="glass-card-blob-light" aria-hidden />
          <Field label="Nombre">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputCls}
              placeholder="Tu nombre"
            />
          </Field>
          <Field label="Email">
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputCls}
              placeholder="tu@correo.com"
            />
          </Field>
          <Field label="Tipo de proyecto">
            <select
              value={form.projectType}
              onChange={(e) =>
                setForm({ ...form, projectType: e.target.value })
              }
              className={inputCls}
            >
              <option>Landing page</option>
              <option>Sitio corporativo</option>
              <option>E-commerce</option>
              <option>Otro / no estoy seguro</option>
            </select>
          </Field>
          <Field label="Cuéntame del proyecto">
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputCls} resize-none`}
              placeholder="Qué quieres lograr, presupuesto aproximado, fechas..."
            />
          </Field>

          <button
            type="submit"
            disabled={!isValid}
            className="group mt-2 inline-flex items-center justify-between font-mono text-xs tracking-[0.3em] uppercase px-5 py-4 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: isValid ? "#1c130a" : "transparent",
              color: isValid ? "#ede0c2" : "#1c130a",
              border: isValid
                ? "1px solid #1c130a"
                : "1px solid rgba(28, 19, 10, 0.32)",
              boxShadow: isValid
                ? "0 6px 22px -6px rgba(28, 19, 10, 0.4)"
                : "none",
            }}
            onMouseEnter={(e) => {
              if (e.currentTarget.disabled) return;
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#1c130a";
              e.currentTarget.style.boxShadow =
                "inset 0 0 0 1px #1c130a, 0 6px 22px -6px rgba(122, 79, 44, 0.45)";
            }}
            onMouseLeave={(e) => {
              if (e.currentTarget.disabled) return;
              e.currentTarget.style.background = "#1c130a";
              e.currentTarget.style.color = "#ede0c2";
              e.currentTarget.style.boxShadow =
                "0 6px 22px -6px rgba(28, 19, 10, 0.4)";
            }}
          >
            <span>{isValid ? "Enviar mensaje" : "Completa los campos"}</span>
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>

          {/* Privacy line — small but reassuring */}
          <p
            className="font-mono text-[10px] tracking-[0.2em] uppercase mt-1"
            style={{ color: "#8a6e52" }}
          >
            Mensaje vía email cifrado · Datos nunca compartidos
          </p>
        </form>
      </div>
    </section>
  );
}

const inputCls =
  "w-full px-0 py-3 bg-transparent outline-none transition-all duration-300 text-sm border-0 border-b text-[#1c130a] placeholder:text-[#8a6e52]/55 focus:placeholder:text-[#8a6e52]/85";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="group block">
      <span
        className="font-mono text-[10px] tracking-[0.3em] uppercase mb-1.5 block transition-colors duration-300"
        style={{ color: "#8a6e52" }}
      >
        {label}
      </span>
      <div
        style={{
          borderBottom: "1px solid rgba(176,126,61,0.32)",
          color: "#1c130a",
          transition: "border-color 200ms",
        }}
      >
        {children}
      </div>
    </label>
  );
}

function buildEnter(root: HTMLElement, direction: Direction) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  const dy = direction === "fwd" ? 40 : -40;

  tl.fromTo(root, { autoAlpha: 0, y: dy }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0)
    .fromTo(
      q(".c-head, .c-form"),
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
