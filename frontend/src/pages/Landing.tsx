import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-background px-6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-[#D60270] via-[#9B4F96] to-[#0038A8] opacity-20 blur-3xl" />

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl">
          <span className="bg-linear-to-r from-[#D60270] via-[#9B4F96] to-[#0038A8] bg-clip-text text-transparent">
            MediaVault
          </span>
        </h1>

        <p className="mt-6 text-2xl font-semibold text-foreground sm:text-3xl">
          Your personal media library.
        </p>

        <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
          Search, rate and organize your favorite movies, TV shows and books all
          in one place.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/register">Get Started</Link>
          </Button>

          <Button variant="outline" size="lg" asChild>
            <Link to="/search">Browse Media</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
