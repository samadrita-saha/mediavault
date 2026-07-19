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
};

type SearchSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: SearchResult[];
};

export default function SearchSheet({
  open,
  onOpenChange,
  results,
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

        <div className="mt-6 h-[calc(100vh-120px)] overflow-y-auto space-y-4 pr-2">
          {results.map((result) => (
            <div
              key={`${result.source}-${result.external_id}`}
              onClick={() => handleDialogOpen(result)}
              className="cursor-pointer rounded-lg border p-4"
            >
              <h3 className="font-semibold">{result.name}</h3>

              <p className="text-sm text-muted-foreground capitalize">
                {result.type}
              </p>
            </div>
          ))}
          <RatingDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            result={dialogResult}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
