import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <main className="relative overflow-hidden bg-background px-6 py-20">
      <div className="absolute left-1/2 top-72 -z-10 h-125 w-125 -translate-x-1/2 rounded-full bg-linear-to-r from-[#D60270] via-[#9B4F96] to-[#0038A8] opacity-20 blur-3xl" />

      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl">
          <span className="bg-linear-to-r from-[#D60270] via-[#9B4F96] to-[#0038A8] bg-clip-text text-transparent">
            MediaVault
          </span>
        </h1>

        <p className="mt-8 text-2xl font-semibold text-foreground sm:text-3xl">
          One home for every story you love.
        </p>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Keep track of your favourite books, movies and TV shows, rate them,
          organize your collection, and never lose your next recommendation
          again.
        </p>

        <div className="mt-12 flex gap-4">
          <Link to="/register">
            <Button size="lg">Sign Up</Button>
          </Link>

          <Link to="/login">
            <Button size="lg" variant="outline">
              Log In
            </Button>
          </Link>
        </div>

        <div className="mt-20 w-full max-w-5xl overflow-hidden rounded-3xl border border-border/50 bg-card shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-5 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>

          <img
            src="/images/dashboard.jpg"
            alt="MediaVault dashboard"
            className="w-full transition-transform duration-300 hover:scale-[1.01]"
          />
        </div>
      </div>
    </main>
  );
}
