import { MessageCircle } from "lucide-react";

const PHONE_DIGITS = "529514997286";
const PREFILL_MESSAGE =
  "Hola, me interesa cotizar un proyecto con Plasma Studios.";

/**
 * Fixed floating WhatsApp button — bottom-right, visible across all sections.
 * Click opens WhatsApp with the studio's number and a pre-filled message.
 * z-50 sits below the nav (z-60) but above section content.
 */
export function WhatsAppButton() {
  const url = `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(
    PREFILL_MESSAGE,
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 group flex items-center justify-center size-14 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
      style={{
        background: "#ede0c2",
        border: "1.5px solid #b07e3d",
        boxShadow:
          "0 0 18px rgba(212, 165, 92, 0.35), 0 8px 22px rgba(122, 79, 44, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      }}
    >
      {/* Outer pulse ring — soft honey */}
      <span
        className="wa-pulse absolute inset-0 rounded-full pointer-events-none"
        style={{ background: "rgba(212, 165, 92, 0.30)" }}
        aria-hidden
      />
      <MessageCircle
        className="relative size-6 transition-transform duration-300 group-hover:rotate-12"
        strokeWidth={2}
        style={{ color: "#1c130a" }}
      />

      {/* Tooltip on hover (desktop) */}
      <span
        className="absolute right-full mr-3 hidden md:flex items-center px-3 py-1.5 rounded-md font-mono text-[10px] tracking-[0.25em] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: "#ede0c2",
          color: "#1c130a",
          border: "1px solid rgba(176, 126, 61, 0.45)",
          boxShadow: "0 4px 14px rgba(122, 79, 44, 0.18)",
        }}
      >
        Hablemos por WhatsApp
      </span>
    </a>
  );
}

export default WhatsAppButton;
