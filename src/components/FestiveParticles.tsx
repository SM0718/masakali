import { motion } from "framer-motion";

interface Particle {
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  gold: boolean;
}

/** Lamp-light dust — a few slow, subtle motes of vermilion & gold. */
const PARTICLES: Particle[] = [
  { left: "8%", top: "70%", size: 5, duration: 11, delay: 0.4, drift: 30, gold: true },
  { left: "16%", top: "38%", size: 3, duration: 13, delay: 1.8, drift: 42, gold: false },
  { left: "24%", top: "82%", size: 4, duration: 10, delay: 0.9, drift: 26, gold: true },
  { left: "34%", top: "24%", size: 3, duration: 14, delay: 2.6, drift: 48, gold: true },
  { left: "47%", top: "60%", size: 5, duration: 12, delay: 1.2, drift: 34, gold: false },
  { left: "58%", top: "30%", size: 4, duration: 10.5, delay: 3.1, drift: 38, gold: true },
  { left: "66%", top: "72%", size: 3, duration: 13.5, delay: 0.6, drift: 44, gold: false },
  { left: "76%", top: "44%", size: 5, duration: 11.5, delay: 2.1, drift: 30, gold: true },
  { left: "85%", top: "66%", size: 4, duration: 12.5, delay: 1.5, drift: 36, gold: true },
  { left: "92%", top: "28%", size: 3, duration: 14.5, delay: 3.6, drift: 50, gold: false },
];

function color(gold: boolean) {
  return gold
    ? "radial-gradient(circle, rgba(217,171,83,0.9), rgba(217,171,83,0) 70%)"
    : "radial-gradient(circle, rgba(207,85,68,0.8), rgba(207,85,68,0) 70%)";
}

export function FestiveParticles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
    >
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: color(p.gold),
            filter: "blur(0.5px)",
          }}
          animate={{
            y: [0, -p.drift, 0, -p.drift * 0.55, 0],
            x: [0, p.drift * 0.35, 0, -p.drift * 0.3, 0],
            opacity: [0, 0.85, 0.35, 0.8, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}