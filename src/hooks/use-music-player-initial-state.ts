// src/hooks/use-music-player-initial-state.ts
"use client";

import { useState, useEffect } from 'react';
import { getSongs } from '@/lib/supabase/queries';
import type { Song } from '@/lib/types';

export function useMusicPlayerInitialState() {
  const [initialPlaylist, setInitialPlaylist] = useState<Song[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchInitialSongs() {
      try {
        const songs = await getSongs();
        setInitialPlaylist(songs);
      } catch (error) {
        console.error("Failed to fetch initial songs for music player:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchInitialSongs();
  }, []);

  return { initialPlaylist, isLoading };
}
