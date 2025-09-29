"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { MusicItem } from "@/lib/placeholder-data";
import { useMusicPlayer } from "@/context/music-player-context";
import { Play } from "lucide-react";
import { allSongs } from "@/lib/placeholder-data";

export function MusicCard({ item }: { item: MusicItem }) {
  const { playSong } = useMusicPlayer();

  const handlePlay = () => {
    // Find a song associated with the item (album/playlist) to play.
    // This is a simplified logic. In a real app, you'd fetch the tracklist.
    const songToPlay = allSongs.find(s => s.album.id === item.id || item.title.includes(s.album.title));
    if (songToPlay) {
      playSong(songToPlay);
    }
  };

  return (
    <Card className="overflow-hidden border-0 bg-card/60 hover:bg-card transition-colors group relative">
       <button
        onClick={handlePlay}
        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
        aria-label={`Play ${item.title}`}
      >
        <Play className="w-12 h-12 text-white fill-white" />
      </button>
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
