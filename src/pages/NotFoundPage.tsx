import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-[70vh] items-center">
      <div className="mx-auto max-w-2xl px-5 py-28 text-center">
        <p className="font-serif text-7xl font-light text-primary md:text-8xl">404</p>
        <p className="mt-5 font-serif text-2xl font-light italic text-foreground md:text-3xl">
          This thread came loose.
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm font-light leading-relaxed text-muted-foreground">
          The page you are looking for is not in the archive. It may have been
          cut from a different bolt — or never woven at all.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link to="/">Back to home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/shop">Browse the collections</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}