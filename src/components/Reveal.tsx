import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

interface RevealProps extends HTMLMotionProps<"div"> {
  delay?: number;
}

export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  ({ className, delay = 0, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.85, ease: EASE, delay }}
      className={cn("will-change-transform", className)}
      {...props}
    >
      {children}
    </motion.div>
  ),
);
Reveal.displayName = "Reveal";