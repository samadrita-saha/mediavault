import { Link } from "react-router-dom";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center justify-between px-8">
        {/* Logo */}
        <Link
          to="/"
          className="bg-linear-to-r from-[#D60270] via-[#9B4F96] to-[#0038A8] bg-clip-text text-2xl font-bold tracking-tight text-transparent transition-opacity hover:opacity-80"
        >
          MediaVault
        </Link>

        {/* Search Bar */}
        <div className="mx-8 w-full max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="text"
              placeholder="Search movies, TV shows & books..."
              className="pl-10"
            />
          </div>
        </div>

        {/* User */}
        <div className="font-medium text-foreground">User</div>
      </div>
    </nav>
  );
}
