import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";

interface TiltCardProps {
  className?: string;
  children?: React.ReactNode;
  max?: number;
  scale?: number;
}

/** Cursor-aware micro-tilt. Subtle, luxury, no bounce. */
export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  ({ className, children, max = 5, scale = 1.015 }, ref) => {
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);

    const sx = useSpring(rx, { stiffness: 140, damping: 18 });
    const sy = useSpring(ry, { stiffness: 140, damping: 18 });

    const rotateX = useTransform(sx, [-1, 1], [max, -max]);
    const rotateY = useTransform(sy, [-1, 1], [-max, max]);

    function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
      const rect = e.currentTarget.getBoundingClientRect();
      rx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
      ry.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
    }

    function onMouseLeave() {
      rx.set(0);
      ry.set(0);
    }

    return (
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, scale, transformStyle: "preserve-3d" }}
        className={cn("will-change-transform", className)}
      >
        {children}
      </motion.div>
    );
  },
);
TiltCard.displayName = "TiltCard";