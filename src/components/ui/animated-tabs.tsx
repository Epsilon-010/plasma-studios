import { useLayoutEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";

export type AnimatedTab = { id: string; label: string };

type AnimatedTabsProps = {
  tabs: AnimatedTab[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: "default" | "underline";
  /** Show numeric prefix (01, 02, ...) on each tab — only in underline variant */
  showIndex?: boolean;
};

export function AnimatedTabs({
  tabs,
  activeId,
  onChange,
  variant = "underline",
  showIndex = false,
}: AnimatedTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState({ left: 0, width: 0 });

  // Track active tab's bounding box → smoothly slide the indicator.
  // useLayoutEffect runs synchronously after DOM mutation so the indicator
  // never shows in the wrong position before paint.
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const btn = containerRef.current.querySelector<HTMLButtonElement>(
      `[data-tab="${activeId}"]`,
    );
    if (btn) {
      setRect({ left: btn.offsetLeft, width: btn.offsetWidth });
    }
  }, [activeId, tabs]);

  if (variant === "underline") {
    return (
      <div
        ref={containerRef}
        className="relative flex items-center text-sm font-medium"
        style={{ color: "rgba(28,19,10,0.6)" }}
      >
        {tabs.map((tab, i) => {
          const active = tab.id === activeId;
          return (
            <button
              key={tab.id}
              data-tab={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className="relative inline-flex items-baseline gap-1.5 px-3.5 py-1 transition-colors duration-200"
              style={{
                color: active ? "#1c130a" : undefined,
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.color = "#1c130a";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.color = "";
              }}
            >
              {showIndex && (
                <span
                  className="font-mono text-[10px] tracking-[0.3em]"
                  style={{ color: "rgba(28,19,10,0.4)" }}
                >
                  0{i + 1}
                </span>
              )}
              <span>{tab.label}</span>
            </button>
          );
        })}
        {/* Indicator — slides smoothly between tabs via CSS transition */}
        <span
          className="absolute -bottom-1 h-px transition-all duration-300 ease-out pointer-events-none"
          style={{
            left: rect.left,
            width: rect.width,
            background: "#a87a2e",
            boxShadow: "0 0 10px rgba(212,165,92,0.85), 0 0 20px rgba(212,165,92,0.4)",
          }}
          aria-hidden
        />
      </div>
    );
  }

  // pill variant — sliding red pill behind the active label.
  // Container is transparent so the nav blends seamlessly with the page.
  return (
    <div
      ref={containerRef}
      className="relative mx-auto flex w-fit items-center rounded-full p-1"
    >
      {/* Sliding red pill */}
      <span
        className="absolute h-8 rounded-full transition-all duration-300 ease-out pointer-events-none"
        style={{
          left: rect.left + 4,
          width: rect.width,
          background: "linear-gradient(180deg, #ffffff 0%, #d4d6db 100%)",
          boxShadow: "0 0 16px rgba(255,255,255,0.30)",
        }}
        aria-hidden
      />
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            data-tab={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative z-10 flex h-8 items-center rounded-full px-4 text-sm font-medium transition-colors duration-200",
              active ? "text-ink" : "text-mist-soft hover:text-star",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

export default AnimatedTabs;
