"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import type { Song, SongFromDB } from '@/lib/types';
import { getSongs } from '@/lib/supabase/queries';


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

export const MusicPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const fetchInitialPlaylist = async () => {
      const songsFromDB = await getSongs();
      const formattedSongs: Song[] = songsFromDB.map(s => ({
        id: s.id,
        title: s.title,
        songUrl: s.song_url,
        artist: {
          id: s.artists?.id || '',
          name: s.artists?.name || 'Unknown Artist'
        },
        album: {
          id: s.albums?.id || '',
          title: s.albums?.title || 'Unknown Album',
          coverArt: {
            imageUrl: s.albums?.cover_art_url || ''
          }
        }
      }));
      setPlaylist(formattedSongs);
    };
    fetchInitialPlaylist();
  }, []);

  const playSong = (song: Song, newPlaylist?: Song[]) => {
    setCurrentSong(song);
    setIsPlaying(true);
    if (newPlaylist) {
      setPlaylist(newPlaylist);
    }
  };

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const nextSong = () => {
    if (currentSong) {
      const currentIndex = playlist.findIndex(s => s.id === currentSong.id);
      const nextIndex = (currentIndex + 1) % playlist.length;
      playSong(playlist[nextIndex]);
    }
  };

  const prevSong = () => {
    if (currentSong) {
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
