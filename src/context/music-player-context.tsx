"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Song } from '@/lib/types';

interface MusicPlayerContextType {
  currentSong: Song | null;
  playlist: Song[];
  isPlaying: boolean;
  playSong: (song: Song, playlist?: Song[]) => void;
  pauseSong: () => void;
  nextSong: () => void;
  prevSong: () => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider = ({ 
  children, 
  initialPlaylist = [] 
}: { 
  children: ReactNode, 
  initialPlaylist?: Song[] 
}) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>(initialPlaylist);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSong = (song: Song, newPlaylist?: Song[]) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (newPlaylist) {
      setPlaylist(newPlaylist);
    } else if (!playlist.find(s => s.id === song.id)) {
      // If song is not in the current playlist, create a new one.
      setPlaylist([song, ...playlist]);
    }
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const nextSong = () => {
    if (currentSong && playlist.length > 0) {
      const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      playSong(playlist[nextIndex]);
    }
  };

  const prevSong = () => {
    if (currentSong && playlist.length > 0) {
      const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
      const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
      playSong(playlist[prevIndex]);
    }
  };

  return (
    <MusicPlayerContext.Provider value={{ currentSong, playlist, isPlaying, playSong, pauseSong, nextSong, prevSong }}>
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
