import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { MusicItem } from "@/lib/placeholder-data";

export function MusicCard({ item }: { item: MusicItem }) {
  return (
    <Card className="overflow-hidden border-0 bg-card/60 hover:bg-card transition-colors group">
      <CardContent className="p-4 space-y-3">
        <div className="aspect-square relative">
          <Image
            src={item.coverArt.imageUrl}
            alt={item.title}
            fill
            className="rounded-md object-cover"
            data-ai-hint={item.coverArt.imageHint}
          />
        </div>
        <div>
          <h3 className="font-semibold truncate">{item.title}</h3>
          <p className="text-sm text-muted-foreground truncate">{item.creator}</p>
        </div>
      </CardContent>
    </Card>
  );
}
