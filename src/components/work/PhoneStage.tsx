"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { PhoneFrame } from "@/components/visuals/PhoneFrame";
import type { GalleryImage } from "@/data/projects";

// Three real screenshots in a fanned stack; the stack tilts gently toward the pointer.
// Listens on window because the card's stretched link sits on top of this element.
export function PhoneStage({ shots }: { shots: GalleryImage[] }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 120, damping: 20 });
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 20 });

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduce) return;
    const onMove = (e: globalThis.PointerEvent) => {
      const el = ref.current;
      if (!el || e.pointerType === "touch") return;
      const r = el.getBoundingClientRect();
      const inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      px.set(inside ? (e.clientX - r.left) / r.width - 0.5 : 0);
      py.set(inside ? (e.clientY - r.top) / r.height - 0.5 : 0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, px, py]);

  const [left, center, right] = shots;
  return (
    <div ref={ref} className="relative aspect-[10/9] w-full [perspective:1600px] lg:aspect-auto lg:h-full">
      <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative mx-auto h-full w-full max-w-[640px]">
        <div className="absolute left-[4%] top-[14%] w-[30%] -rotate-[8deg] opacity-80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-2 group-hover:-rotate-[10deg]">
          <PhoneFrame src={left.src} alt={left.alt} />
        </div>
        <div className="absolute right-[4%] top-[14%] w-[30%] rotate-[8deg] opacity-80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:rotate-[10deg]">
          <PhoneFrame src={right.src} alt={right.alt} />
        </div>
        <div className="absolute left-1/2 top-[4%] w-[36%] -translate-x-1/2 [transform:translateZ(60px)]">
          <PhoneFrame src={center.src} alt={center.alt} priority />
        </div>
      </motion.div>
    </div>
  );
}
