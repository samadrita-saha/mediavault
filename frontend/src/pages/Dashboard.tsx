import api from "@/lib/api";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SearchSheet from "@/components/layout/SearchSheet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type Entry = {
  entry_id: number;
  media_name: string;
  media_type: string;
  rating: number;
  creator: string | null;
  image: string | null;
  date_added: string;
};

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("movie");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filter, setFilter] = useState("all");

  const filteredEntries =
    filter === "all"
      ? entries
      : entries.filter((entry) => entry.media_type === filter);

  const fetchEntries = async () => {
    try {
      const response = await api.get("/entries");
      setEntries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleAddSuccess = async () => {
    setOpen(false);
    await fetchEntries();
  };

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      const response = await api.get("/search", {
        params: {
          query: search,
          type: type,
        },
      });

      setResults(response.data);
      setOpen(true);
      setSearch("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        onSearch={handleSearch}
      />

      <SearchSheet
        open={open}
        onOpenChange={setOpen}
        results={results}
        onAddSuccess={handleAddSuccess}
      />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">My Library</h1>

          <p className="mt-2 text-muted-foreground">
            Everything you've logged.
          </p>
        </div>

        <div className="mb-8 flex gap-3">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "movie" ? "default" : "outline"}
            onClick={() => setFilter("movie")}
          >
            Movies
          </Button>
          <Button
            variant={filter === "tv" ? "default" : "outline"}
            onClick={() => setFilter("tv")}
          >
            TV Shows
          </Button>
          <Button
            variant={filter === "book" ? "default" : "outline"}
            onClick={() => setFilter("book")}
          >
            Books
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map((entry) => (
            <Card key={entry.entry_id}>
              <CardContent className="p-4">
                {entry.image ? (
                  <img
                    src={entry.image}
                    alt={entry.media_name}
                    className="mb-4 h-72 w-full rounded-md object-cover"
                  />
                ) : (
                  <div className="mb-4 h-72 w-full rounded-md bg-muted" />
                )}

                <h2 className="line-clamp-1 text-lg font-semibold">
                  {entry.media_name}
                </h2>

                <p className="line-clamp-1 text-sm text-muted-foreground">
                  {entry.creator}
                </p>

                <p className="mt-1 text-sm capitalize text-muted-foreground">
                  {entry.media_type}
                </p>

                <p className="mt-3 text-lg">
                  {"★".repeat(entry.rating)}
                  {"☆".repeat(5 - entry.rating)}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  Added {new Date(entry.date_added).toLocaleDateString("en-GB")}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
