import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const entries = [
  {
    title: "Hamnet",
    type: "Movie",
    rating: "★★★★★",
    added: "Jul 12, 2026",
  },
  {
    title: "Piranesi",
    type: "Book",
    rating: "★★★★★",
    added: "Jul 10, 2026",
  },
  {
    title: "One Day",
    type: "TV Show",
    rating: "★★★★★",
    added: "Jul 8, 2026",
  },
  {
    title: "The Bear",
    type: "TV Show",
    rating: "★★★★☆",
    added: "Jul 5, 2026",
  },
];

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">My Library</h1>

          <p className="mt-2 text-muted-foreground">
            Everything you've logged.
          </p>
        </div>

        <div className="mb-8 flex gap-3">
          <Button>All</Button>
          <Button variant="outline">Movies</Button>
          <Button variant="outline">TV Shows</Button>
          <Button variant="outline">Books</Button>
        </div>

        <div className="space-y-4">
          {entries.map((entry) => (
            <Card key={entry.title}>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold">{entry.title}</h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  {entry.type}
                </p>

                <p className="mt-4 text-lg">{entry.rating}</p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Added {entry.added}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
