import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FC,
  type Ref,
} from "react";
import { gsap } from "../../lib/gsap";
import type { Direction, SectionHandle, SectionMeta } from "../../lib/morph";
import { Hero } from "../sections/Hero";
import { Manifesto } from "../sections/Manifesto";
import { Services } from "../sections/Services";
import { Portfolio } from "../sections/Portfolio";
import { Contact } from "../sections/Contact";
import { Nav } from "./Nav";

type SectionEntry = SectionMeta & {
  Component: FC<{ ref?: Ref<SectionHandle> }>;
};

const SECTIONS: SectionEntry[] = [
  { id: "hero", label: "Inicio", inNav: false, Component: Hero },
  { id: "manifesto", label: "Manifiesto", inNav: false, Component: Manifesto },
  { id: "servicios", label: "Servicios", inNav: true, Component: Services },
  { id: "trabajos", label: "Trabajos", inNav: true, Component: Portfolio },
  { id: "contacto", label: "Contacto", inNav: true, Component: Contact },
];

const TRANSITION_OVERLAP = 0.25;
const WHEEL_THRESHOLD = 140;
const TOUCH_THRESHOLD = 90;
const SCROLL_EDGE_TOLERANCE = 2;
const NAV_COOLDOWN_MS = 750;
// WheelEvent.deltaMode: 0=pixel, 1=line, 2=page. Normalize to pixels.
const WHEEL_LINE_PX = 16;
const WHEEL_PAGE_PX = 800;

export function MorphStage() {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const lockRef = useRef(false);
  const refs = useRef<Array<SectionHandle | null>>([]);
  const wrapperRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Hide every section before paint. Hero's enter() animates root back in.
  useLayoutEffect(() => {
    const sections =
      document.querySelectorAll<HTMLElement>("[data-section]");
    sections.forEach((s) => gsap.set(s, { autoAlpha: 0 }));
  }, []);

  useEffect(() => {
    const hashId = window.location.hash.slice(1);
    const hashIdx = hashId
      ? SECTIONS.findIndex((s) => s.id === hashId)
      : -1;

    if (hashIdx > 0) {
      currentRef.current = hashIdx;
      setCurrent(hashIdx);
      const handle = refs.current[hashIdx];
      if (handle) handle.enter("fwd");
    } else {
      const hero = refs.current[0];
      if (hero) hero.enter("fwd");
    }
  }, []);

  const goto = useCallback((target: number) => {
    if (lockRef.current) return;
    const from = currentRef.current;
    if (target === from || target < 0 || target >= SECTIONS.length) return;

    const fromHandle = refs.current[from];
    const toHandle = refs.current[target];
    if (!fromHandle || !toHandle) return;

    const direction: Direction = target > from ? "fwd" : "back";
    lockRef.current = true;
    currentRef.current = target;
    setCurrent(target);

    // Reset incoming wrapper's scroll so user always lands at the top
    const targetWrapper = wrapperRefs.current[target];
    if (targetWrapper) targetWrapper.scrollTop = 0;

    const targetId = SECTIONS[target].id;
    if (window.location.hash.slice(1) !== targetId) {
      history.replaceState(null, "", `#${targetId}`);
    }

    const exitTl = fromHandle.exit(direction);
    const enterTl = toHandle.enter(direction);
    const master = gsap.timeline({
      onComplete: () => {
        lockRef.current = false;
        // Reset outgoing wrapper's scroll for next time
        const fromWrapper = wrapperRefs.current[from];
        if (fromWrapper) fromWrapper.scrollTop = 0;
      },
    });
    master.add(exitTl, 0);
    master.add(enterTl, `>-=${TRANSITION_OVERLAP}`);
  }, []);

  const gotoById = useCallback(
    (id: string) => {
      const idx = SECTIONS.findIndex((s) => s.id === id);
      if (idx >= 0) goto(idx);
    },
    [goto],
  );

  // Returns true if the active section's internal scroll absorbed the wheel
  // (i.e., we should NOT trigger nav on this event).
  const consumeByInternalScroll = (deltaY: number): boolean => {
    const wrapper = wrapperRefs.current[currentRef.current];
    if (!wrapper) return false;
    const { scrollTop, scrollHeight, clientHeight } = wrapper;
    const overflows = scrollHeight - clientHeight > SCROLL_EDGE_TOLERANCE;
    if (!overflows) return false;
    const atTop = scrollTop <= SCROLL_EDGE_TOLERANCE;
    const atBottom =
      scrollTop + clientHeight >= scrollHeight - SCROLL_EDGE_TOLERANCE;
    if (deltaY > 0 && !atBottom) return true;
    if (deltaY < 0 && !atTop) return true;
    return false;
  };

  useEffect(() => {
    let wheelDelta = 0;
    let resetTimer: number | null = null;
    let lastNavAt = 0;

    const onWheel = (e: WheelEvent) => {
      if (lockRef.current) {
        e.preventDefault();
        return;
      }

      // Normalize delta — different inputs (mouse, trackpad, line-mouse) report
      // deltaY in pixels (0), lines (1) or pages (2). Convert all to pixel-equivalent.
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= WHEEL_LINE_PX;
      else if (e.deltaMode === 2) dy *= WHEEL_PAGE_PX;

      // Defer to native scroll while there's still room inside the section
      if (consumeByInternalScroll(dy)) {
        wheelDelta = 0;
        return;
      }

      e.preventDefault();

      // Cooldown — prevents inertia/coast events from firing a second nav
      const now = performance.now();
      if (now - lastNavAt < NAV_COOLDOWN_MS) {
        wheelDelta = 0;
        return;
      }

      wheelDelta += dy;

      if (wheelDelta > WHEEL_THRESHOLD) {
        wheelDelta = 0;
        lastNavAt = now;
        goto(currentRef.current + 1);
      } else if (wheelDelta < -WHEEL_THRESHOLD) {
        wheelDelta = 0;
        lastNavAt = now;
        goto(currentRef.current - 1);
      }

      if (resetTimer !== null) window.clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => {
        wheelDelta = 0;
      }, 180);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (resetTimer !== null) window.clearTimeout(resetTimer);
    };
  }, []);

  useEffect(() => {
    let startY: number | null = null;
    const onStart = (e: TouchEvent) => {
      startY = e.touches[0]?.clientY ?? null;
    };
    const onEnd = (e: TouchEvent) => {
      if (startY === null || lockRef.current) return;
      const endY = e.changedTouches[0]?.clientY ?? startY;
      const dy = startY - endY;
      // Only trigger nav if section is at its scroll edge in the relevant direction
      if (dy > TOUCH_THRESHOLD && !consumeByInternalScroll(dy)) {
        goto(currentRef.current + 1);
      } else if (dy < -TOUCH_THRESHOLD && !consumeByInternalScroll(dy)) {
        goto(currentRef.current - 1);
      }
      startY = null;
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lockRef.current) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goto(currentRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goto(currentRef.current - 1);
      } else if (e.key === "Home") {
        goto(0);
      } else if (e.key === "End") {
        goto(SECTIONS.length - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.slice(1);
      if (id) gotoById(id);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <>
      <Nav
        sections={SECTIONS.filter((s) => s.inNav)}
        currentId={SECTIONS[current].id}
        currentIndex={current}
        onSelect={gotoById}
      />

      <div className="fixed inset-0 overflow-hidden">
        {SECTIONS.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => {
              wrapperRefs.current[i] = el;
            }}
            className="absolute inset-0 overflow-y-auto overscroll-contain"
            style={{
              zIndex: i === current ? 10 : 1,
              pointerEvents: i === current ? "auto" : "none",
            }}
          >
            <s.Component
              ref={(h: SectionHandle | null) => {
                refs.current[i] = h;
              }}
            />
          </div>
        ))}
      </div>

      <SectionDots
        count={SECTIONS.length}
        current={current}
        onSelect={goto}
      />
    </>
  );
}

type DotsProps = {
  count: number;
  current: number;
  onSelect: (i: number) => void;
};

function SectionDots({ count, current, onSelect }: DotsProps) {
  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
      {Array.from({ length: count }).map((_, i) => {
        const active = i === current;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Sección ${i + 1}`}
            className="group relative size-3 flex items-center justify-center"
          >
            <span
              className={`absolute inset-0 m-auto rounded-full transition-all duration-500 ${
                active
                  ? "size-3 bg-star shadow-[0_0_10px_rgba(255,255,255,0.55)]"
                  : "size-1.5 bg-star/30 group-hover:bg-star/70"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}
