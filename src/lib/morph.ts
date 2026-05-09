import { gsap } from "./gsap";

export type Direction = "fwd" | "back";

export type SectionHandle = {
  enter: (direction: Direction) => gsap.core.Timeline;
  exit: (direction: Direction) => gsap.core.Timeline;
};

export type SectionMeta = {
  id: string;
  label: string;
  inNav: boolean;
};

export const sectionMeta: SectionMeta[] = [
  { id: "hero", label: "Inicio", inNav: false },
  { id: "manifesto", label: "Enfoque", inNav: true },
  { id: "servicios", label: "Servicios", inNav: true },
  { id: "proceso", label: "Proceso", inNav: true },
  { id: "trabajos", label: "Trabajos", inNav: true },
  { id: "stack", label: "Stack", inNav: true },
  { id: "contacto", label: "Contacto", inNav: true },
];

export function defaultEnter(root: HTMLElement, direction: Direction) {
  const tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 0.95 },
  });
  tl.fromTo(
    root,
    { autoAlpha: 0, y: direction === "fwd" ? 80 : -80, scale: 0.96 },
    { autoAlpha: 1, y: 0, scale: 1 },
  );
  return tl;
}

export function defaultExit(root: HTMLElement, direction: Direction) {
  const tl = gsap.timeline({
    defaults: { ease: "power2.in", duration: 0.7 },
  });
  tl.to(root, {
    autoAlpha: 0,
    y: direction === "fwd" ? -60 : 60,
    scale: 0.96,
  });
  return tl;
}
