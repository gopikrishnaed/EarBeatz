// src/components/song-item.tsx
"use client";

import Image from "next/image";
import { useMusicPlayer } from "@/context/music-player-context";
import { Button } from "@/components/ui/button";
import { Music, Play } from "lucide-react";
import type { Song } from "@/lib/types";

export function SongItem({ song, playlist }: { song: Song; playlist: Song[] }) {
  const { playSong } = useMusicPlayer();

  const handlePlaySong = () => {
    playSong(song, playlist);
  };

  return (
    <li className="group flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
      <div className="relative">
        <Image
          src={song.album.coverArt.imageUrl || `https://picsum.photos/seed/${song.id}/40/40`}
          alt={song.album.title}
          width={40}
          height={40}
          className="rounded-md"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute inset-0 h-full w-full bg-black/50 opacity-0 group-hover:opacity-100"
          onClick={handlePlaySong}
        >
          <Play className="h-5 w-5 fill-white text-white" />
        </Button>
      </div>
      <div className="flex-1">
        <p className="font-medium">{song.title}</p>
        <p className="text-sm text-muted-foreground">{song.artist.name}</p>
      </div>
      <span className="text-sm text-muted-foreground">{song.duration}</span>
    </li>
  );
}
