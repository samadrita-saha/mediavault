import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden bg-background px-6">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-[#D60270] via-[#9B4F96] to-[#0038A8] opacity-20 blur-3xl" />

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl">
          <span className="bg-linear-to-r from-[#D60270] via-[#9B4F96] to-[#0038A8] bg-clip-text text-transparent">
            MediaVault
          </span>
        </h1>

        <p className="mt-8 text-2xl font-semibold text-foreground sm:text-3xl">
          One home for every story you love.
        </p>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Keep track of your favorite books, movies and TV shows, rate them,
          organize your collection, and never lose your next recommendation
          again.
        </p>

        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link to="/register">Sign Up</Link>
          </Button>

          <Button size="lg" variant="outline" asChild>
            <Link to="/login">Log In</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
