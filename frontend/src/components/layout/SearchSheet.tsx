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
              className="rounded-lg border p-4"
            >
              <h3 className="font-semibold">{result.name}</h3>

              <p className="text-sm text-muted-foreground capitalize">
                {result.type}
              </p>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
