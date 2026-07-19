import { useState } from "react";
import RatingDialog from "@/components/layout/RatingDialog";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type SearchResult = {
  external_id: string;
  source: string;
  name: string;
  type: string;
  image: string | null;
};

type SearchSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: SearchResult[];
  onAddSuccess: () => void;
};

export default function SearchSheet({
  open,
  onOpenChange,
  results,
  onAddSuccess,
}: SearchSheetProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogResult, setDialogResult] = useState<SearchResult | null>(null);

  const handleDialogOpen = (result: SearchResult) => {
    setDialogOpen(true);
    setDialogResult(result);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-125 sm:max-w-125">
        <SheetHeader>
          <SheetTitle>Search Results</SheetTitle>
          <SheetDescription>
            Select a rating and add media to your library.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 h-[calc(100vh-120px)] space-y-4 overflow-y-auto pr-2">
          {results.map((result) => (
            <div
              key={`${result.source}-${result.external_id}`}
              onClick={() => handleDialogOpen(result)}
              className="flex cursor-pointer gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
            >
              {result.image ? (
                <img
                  src={result.image}
                  alt={result.name}
                  className="h-24 w-16 rounded-md object-cover"
                />
              ) : (
                <div className="h-24 w-16 rounded-md bg-muted" />
              )}

              <div className="flex flex-col justify-center">
                <h3 className="font-semibold">{result.name}</h3>

                <p className="text-sm capitalize text-muted-foreground">
                  {result.type}
                </p>
              </div>
            </div>
          ))}

          <RatingDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            result={dialogResult}
            onAddSuccess={onAddSuccess}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
