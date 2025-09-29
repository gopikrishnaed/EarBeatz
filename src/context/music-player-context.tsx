"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Song } from '@/lib/placeholder-data';
import { allSongs } from '@/lib/placeholder-data';

interface MusicPlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  pauseSong: () => void;
  nextSong: () => void;
  prevSong: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const nextSong = () => {
    if (currentSong) {
      const currentIndex = allSongs.findIndex(s => s.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % allSongs.length;
      playSong(allSongs[nextIndex]);
    }
  };

  const prevSong = () => {
    if (currentSong) {
      const currentIndex = allSongs.findIndex(s => s.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + allSongs.length) % allSongs.length;
      playSong(allSongs[prevIndex]);
    }
  };

  return (
    <MusicPlayerContext.Provider value={{ currentSong, isPlaying, playSong, pauseSong, nextSong, prevSong }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
