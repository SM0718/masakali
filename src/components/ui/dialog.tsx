import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CloseSquare as CloseIcon, ArrowRight } from "iconsax-reactjs";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("overlay fixed inset-0 z-50 bg-background/70 backdrop-blur-[6px]", className)}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "dlg-content fixed left-1/2 top-1/2 z-50 grid w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-0 border border-line bg-background shadow-[0_24px_80px_-24px_rgba(0,0,0,0.45)] outline-none",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-background/60 text-foreground/80 backdrop-blur transition-colors hover:text-foreground focus:outline-none">
        <CloseIcon size="20" variant="Linear" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = "DialogContent";

const DialogCloseLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "group inline-flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-primary transition-colors hover:text-primary/80",
      className,
    )}
    {...props}
  >
    {children}
    <ArrowRight
      size="14"
      variant="Linear"
      className="transition-transform duration-500 group-hover:translate-x-1"
    />
  </a>
));
DialogCloseLink.displayName = "DialogCloseLink";

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogCloseLink,
};