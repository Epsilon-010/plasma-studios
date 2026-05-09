import { useImperativeHandle, useRef } from "react";
import { gsap } from "../../lib/gsap";
import type { Direction, SectionHandle } from "../../lib/morph";

const PHONE_DIGITS = "529514997286";
const EMAIL = "plasmastudio44@gmail.com";
const TIKTOK_HANDLE = "plasma.studios7";

type Props = { ref?: React.Ref<SectionHandle> };

export function Contact({ ref }: Props) {
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
      data-section="contacto"
      className="relative min-h-dvh w-full flex flex-col items-center justify-center px-6 md:px-12 pt-28 md:pt-32 pb-20 md:pb-24 overflow-hidden"
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

      {/* Centered minimal block — title + buttons */}
      <div className="c-head max-w-2xl w-full relative z-10 text-center">
        <h2
          className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] font-black tracking-[-0.035em] leading-none pb-1"
          style={{ color: "#1c130a" }}
        >
          Iniciemos una{" "}
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
          className="mt-5 text-sm md:text-base leading-relaxed max-w-md mx-auto"
          style={{ color: "#3d2918" }}
        >
          Escríbenos por el canal que prefieras. Respondemos rápido en cualquiera.
        </p>

        {/* Round social buttons */}
        <div className="c-social mt-12 flex items-center justify-center gap-5 md:gap-7 flex-wrap">
          <SocialButton
            href={`https://wa.me/${PHONE_DIGITS}`}
            ariaLabel="Contactar por WhatsApp"
          >
            <WhatsAppIcon className="size-7" />
          </SocialButton>

          <SocialButton
            href={`mailto:${EMAIL}`}
            ariaLabel="Enviar correo a Plasma Studios"
          >
            <GmailIcon className="size-7" />
          </SocialButton>

          <SocialButton
            href={`https://www.tiktok.com/@${TIKTOK_HANDLE}`}
            ariaLabel="Síguenos en TikTok"
          >
            <TikTokIcon className="size-7" />
          </SocialButton>
        </div>
      </div>
    </section>
  );
}

type SocialButtonProps = {
  href: string;
  ariaLabel: string;
  children: React.ReactNode;
};

function SocialButton({ href, ariaLabel, children }: SocialButtonProps) {
  const isExternal = href.startsWith("http");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      aria-label={ariaLabel}
      className="group inline-flex items-center justify-center size-16 md:size-20 rounded-full transition-all duration-500 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.6)",
        border: "1.5px solid rgba(176,126,61,0.40)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.85), 0 8px 22px -8px rgba(122,79,44,0.28)",
        color: "#1c130a",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "#1c130a";
        e.currentTarget.style.color = "#ede0c2";
        e.currentTarget.style.borderColor = "#1c130a";
        e.currentTarget.style.boxShadow =
          "0 12px 28px -8px rgba(28,19,10,0.45), inset 0 1px 0 rgba(255,255,255,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.6)";
        e.currentTarget.style.color = "#1c130a";
        e.currentTarget.style.borderColor = "rgba(176,126,61,0.40)";
        e.currentTarget.style.boxShadow =
          "inset 0 1px 0 rgba(255,255,255,0.85), 0 8px 22px -8px rgba(122,79,44,0.28)";
      }}
    >
      <span className="transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
        {children}
      </span>
    </a>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function GmailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.83 20.87a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.87-.87z" />
    </svg>
  );
}

function buildEnter(root: HTMLElement, direction: Direction) {
  const q = gsap.utils.selector(root);
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  const dy = direction === "fwd" ? 40 : -40;

  tl.fromTo(root, { autoAlpha: 0, y: dy }, { autoAlpha: 1, y: 0, duration: 0.55 }, 0)
    .fromTo(
      q(".c-head, .c-social"),
      { y: dy * 0.4, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.5 },
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
