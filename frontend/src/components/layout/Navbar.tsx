import { Link } from "react-router-dom";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-8">
        {/* Logo */}
        <Link
          to="/"
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-2xl font-bold tracking-tight text-transparent transition-opacity hover:opacity-80"
        >
          MediaVault
        </Link>

        {/* Search Bar */}
        <div className="mx-10 flex max-w-xl flex-1 items-center">
          <div className="relative w-full">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="text"
              placeholder="Search movies, TV shows & books..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link to="/login">Login</Link>
          </Button>

          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
