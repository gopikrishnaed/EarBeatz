// src/components/play-all-button.tsx
"use client";

import { useMusicPlayer } from "@/context/music-player-context";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import type { Song } from "@/lib/types";

export function PlayAllButton({ songs }: { songs: Song[] }) {
  const { playSong } = useMusicPlayer();

  const handlePlayAll = () => {
    if (songs && songs.length > 0) {
      playSong(songs[0], songs);
    }
  };

  return (
    <Button onClick={handlePlayAll}>
      <Play className="mr-2 h-4 w-4" /> Play All
    </Button>
  );
}
