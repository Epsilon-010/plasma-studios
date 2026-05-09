import type { SectionMeta } from "../../lib/morph";
import { LiquidMetalButton } from "../ui/liquid-metal";
import { AnimatedTabs, type AnimatedTab } from "../ui/animated-tabs";

type NavProps = {
  sections: SectionMeta[];
  currentId: string;
  currentIndex: number;
  onSelect: (id: string) => void;
};

export function Nav({ sections, currentId, onSelect }: NavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-60 pointer-events-none">
      {/* Soft cream/gold backdrop — gradient fades, no hard edge */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(237,224,194,0.85) 0%, rgba(237,224,194,0.4) 55%, transparent 100%)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          maskImage:
            "linear-gradient(180deg, #000 0%, #000 30%, rgba(0,0,0,0.6) 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, #000 0%, #000 30%, rgba(0,0,0,0.6) 65%, transparent 100%)",
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 pt-6 pointer-events-auto">
        <nav className="relative flex items-center justify-between py-4">
          {/* Wordmark — Greek epsilon bracket + brand */}
          <button
            type="button"
            onClick={() => onSelect("hero")}
            aria-label="Plasma Studios — Inicio"
            className="relative flex items-center group"
          >
            <img
              src="/logo.png"
              alt="Plasma Studios"
              width="160"
              height="40"
              className="h-7 md:h-8 w-auto transition-all duration-500 group-hover:scale-105"
              style={{
                filter:
                  "brightness(0) drop-shadow(0 0 10px rgba(168,122,46,0.45)) drop-shadow(0 0 22px rgba(212,165,92,0.25))",
              }}
            />
          </button>

          <div className="hidden md:block">
            <AnimatedTabs
              tabs={sections.map<AnimatedTab>((s) => ({
                id: s.id,
                label: s.label,
              }))}
              activeId={currentId}
              onChange={onSelect}
              variant="underline"
            />
          </div>

          <LiquidMetalButton
            type="button"
            size="sm"
            borderWidth={2}
            metalConfig={{
              colorBack: "#a87a2e",
              colorTint: "#f4dc8a",
              speed: 0.45,
              repetition: 4,
              distortion: 0.18,
              scale: 1,
            }}
            onClick={() => onSelect("contacto")}
          >
            Contáctanos
          </LiquidMetalButton>
        </nav>
      </div>

    </header>
  );
}
