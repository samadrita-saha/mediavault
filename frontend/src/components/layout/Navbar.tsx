import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

type NavbarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  onSearch: () => void;
};

export default function Navbar({
  search,
  setSearch,
  type,
  setType,
  onSearch,
}: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  return (
    <nav className="border-b bg-background">
      <div className="flex h-16 items-center justify-between px-8">
        <Link
          to="/"
          className="bg-linear-to-r from-[#D60270] via-[#9B4F96] to-[#0038A8] bg-clip-text text-2xl font-bold tracking-tight text-transparent transition-opacity hover:opacity-80"
        >
          MediaVault
        </Link>
        <div className="mx-8 w-full max-w-3xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
              placeholder="Search..."
              className="h-11 pl-10 pr-52"
            />

            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-2 border-l pl-2">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="h-8 w-28 border bg-background shadow-none">
                  <span className="text-sm">
                    {type === "movie" && "Movie"}
                    {type === "tv" && "TV Show"}
                    {type === "book" && "Book"}
                  </span>
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="movie">Movie</SelectItem>
                  <SelectItem value="tv">TV Show</SelectItem>
                  <SelectItem value="book">Book</SelectItem>
                </SelectContent>
              </Select>

              <Button size="sm" onClick={onSearch} className="h-8 px-3">
                Search
              </Button>
            </div>
          </div>
        </div>
        <Button onClick={() => handleLogout()} variant="ghost">
          Log Out
        </Button>{" "}
      </div>
    </nav>
  );
}
