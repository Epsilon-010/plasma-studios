import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when mobile menu is open + close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const handleSelect = (id: string) => {
    setMobileOpen(false);
    onSelect(id);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-60 pointer-events-none">
      {/* Soft cream/gold backdrop */}
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

      <div className="relative max-w-7xl mx-auto px-5 md:px-12 pt-5 md:pt-6 pointer-events-auto">
        <nav className="relative flex items-center justify-between gap-4 py-3 md:py-4">
          {/* Wordmark */}
          <button
            type="button"
            onClick={() => handleSelect("hero")}
            aria-label="Plasma Studios — Inicio"
            className="relative flex items-center group shrink-0"
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

          {/* Desktop tabs */}
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

          {/* Desktop CTA */}
          <div className="hidden md:block">
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
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden inline-flex items-center justify-center size-11 rounded-full transition-all duration-300"
            style={{
              background: mobileOpen ? "#1c130a" : "rgba(255,255,255,0.55)",
              border: `1.5px solid ${mobileOpen ? "#1c130a" : "rgba(176,126,61,0.45)"}`,
              color: mobileOpen ? "#ede0c2" : "#1c130a",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.6), 0 4px 14px rgba(122,79,44,0.16)",
            }}
          >
            {mobileOpen ? (
              <X className="size-5" strokeWidth={2} />
            ) : (
              <Menu className="size-5" strokeWidth={2} />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 pointer-events-auto"
          style={{ zIndex: 55 }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(237,224,194,0.96) 0%, rgba(237,224,194,0.92) 100%)",
              backdropFilter: "blur(18px) saturate(140%)",
              WebkitBackdropFilter: "blur(18px) saturate(140%)",
            }}
            aria-hidden
          />
          <div
            className="relative h-full flex flex-col items-center justify-center px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col items-center gap-7 mb-10">
              {sections
                .filter((s) => s.inNav)
                .map((s, i) => {
                  const active = s.id === currentId;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(s.id)}
                        className="group inline-flex items-baseline gap-3 transition-all duration-300"
                        style={{ color: active ? "#1c130a" : "#5a4332" }}
                      >
                        <span
                          className="font-mono text-[11px] tracking-[0.3em]"
                          style={{
                            color: active
                              ? "#b07e3d"
                              : "rgba(90,67,50,0.55)",
                          }}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className="font-display text-3xl font-black tracking-tight"
                          style={{
                            fontStyle: active ? "italic" : "normal",
                            fontFamily: active
                              ? '"Fraunces", Georgia, serif'
                              : undefined,
                          }}
                        >
                          {s.label}
                        </span>
                      </button>
                    </li>
                  );
                })}
            </ul>

            {/* Mobile CTA */}
            <button
              type="button"
              onClick={() => handleSelect("contacto")}
              className="inline-flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] uppercase px-7 py-4 rounded-full transition-all duration-300"
              style={{
                background: "#1c130a",
                color: "#ede0c2",
                border: "1.5px solid #1c130a",
                boxShadow: "0 8px 24px -6px rgba(28,19,10,0.40)",
              }}
            >
              Contáctanos
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
