import api from "@/lib/api";
import { useState } from "react";
import { Star } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type SearchResult = {
  external_id: string;
  source: string;
  name: string;
  type: string;
};

type RatingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  result: SearchResult | null;
};

export default function RatingDialog({
  open,
  onOpenChange,
  result,
}: RatingDialogProps) {
  const [rating, setRating] = useState(0);

  if (!result) return null;

  const handleAdd = async () => {
    try {
      await api.post("/entries", {
        external_id: result.external_id,
        source: result.source,
        name: result.name,
        type: result.type,
        rating,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add to Library</DialogTitle>
          <DialogDescription>
            Select a rating for <strong>{result.name}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-semibold">{result.name}</h2>

            <p className="mt-1 capitalize text-muted-foreground">
              {result.type}
            </p>
          </div>

          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                className="transition hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    value <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>

            <Button disabled={rating === 0} onClick={handleAdd}>
              Add
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
