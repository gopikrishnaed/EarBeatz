"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { MusicItem } from "@/lib/types";
import { useMusicPlayer } from "@/context/music-player-context";
import { Play } from "lucide-react";
import { getSongsByAlbum } from "@/lib/supabase/queries";

export function MusicCard({ item }: { item: MusicItem }) {
  const { playSong } = useMusicPlayer();

  const handlePlay = async () => {
    // In a real app, you'd fetch the tracklist for the album or playlist.
    // For this demo, we'll fetch the first song of an album.
    if (item.type === 'album') {
      const songs = await getSongsByAlbum(item.id);
      if (songs && songs.length > 0) {
        // The context expects a slightly different format, so we map it.
        const songToPlay = {
          id: songs[0].id,
          title: songs[0].title,
          songUrl: songs[0].song_url,
          artist: {
            id: songs[0].artists?.id || '',
            name: songs[0].artists?.name || 'Unknown Artist'
          },
          album: {
            id: songs[0].albums?.id || '',
            title: songs[0].albums?.title || 'Unknown Album',
            coverArt: {
              imageUrl: songs[0].albums?.cover_art_url || ''
            }
          }
        };
        playSong(songToPlay);
      }
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
            src={item.coverArt.imageUrl || `https://picsum.photos/seed/${item.id}/300/300`}
            alt={item.title}
            fill
            className="rounded-md object-cover"
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
