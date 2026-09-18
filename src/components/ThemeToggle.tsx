import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun1 } from "iconsax-reactjs";

import { useTheme } from "@/lib/theme";
import { EASE } from "@/lib/motion";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid h-10 w-10 cursor-pointer place-items-center rounded-full text-foreground/80 transition-colors duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ rotate: -70, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 70, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="grid place-items-center"
        >
          {isDark ? <Moon size="18" variant="Linear" /> : <Sun1 size="18" variant="Linear" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}