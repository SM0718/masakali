import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { CloseSquare as CloseIcon } from "iconsax-reactjs";

import { cn } from "@/lib/utils";

const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn("overlay fixed inset-0 z-50 bg-background/60 backdrop-blur-[6px]", className)}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

const SheetContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { side?: "left" | "right" }
>(({ className, children, side = "left", ...props }, ref) => (
  <DialogPrimitive.Portal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "sheet-content fixed inset-y-0 z-50 flex w-full flex-col border-line bg-background shadow-[24px_0_80px_-24px_rgba(0,0,0,0.45)] outline-none sm:max-w-sm",
        side === "left"
          ? "left-0 border-r"
          : "right-0 border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
        className,
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-5 z-10 grid h-10 w-10 place-items-center text-foreground/70 transition-colors hover:text-foreground focus:outline-none">
        <CloseIcon size="22" variant="Linear" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

interface SheetHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const SheetHeader = React.forwardRef<HTMLDivElement, SheetHeaderProps>(
  ({ className, title, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-1 border-b border-line px-6 pb-5 pt-8",
        className,
      )}
      {...props}
    >
      {title ? (
        <h3 className="font-serif text-xl font-medium normal-case tracking-normal text-foreground">
          {title}
        </h3>
      ) : null}
    </div>
  ),
);
SheetHeader.displayName = "SheetHeader";

const SheetBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex-1 overflow-y-auto px-6 py-6", className)} {...props} />
  ),
);
SheetBody.displayName = "SheetBody";

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetBody, SheetOverlay };