
"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { MusicItem } from "@/lib/types";
import { useMusicPlayer } from "@/context/music-player-context";
import { Play } from "lucide-react";
import { getSongsByAlbum, getSongsByPlaylist } from "@/lib/supabase/queries";
import { Button } from "./ui/button";

export function MusicCard({ item }: { item: MusicItem }) {
  const { playSong } = useMusicPlayer();

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (item.type === 'album') {
      const songs = await getSongsByAlbum(item.id);
      if (songs && songs.length > 0) {
        const mappedSongs = songs.map(song => ({
          id: song.id,
          title: song.title,
          songUrl: song.song_url || '',
          artist: {
            id: song.artists?.id || '',
            name: song.artists?.name || 'Unknown Artist'
          },
          album: {
            id: song.albums?.id || '',
            title: song.albums?.title || 'Unknown Album',
          },
          coverArt: {
            imageUrl: song.cover_art_song || ''
          },
          duration: song.duration_in_seconds ? `${Math.floor(song.duration_in_seconds / 60)}:${String(song.duration_in_seconds % 60).padStart(2, '0')}` : '3:00'
        }));
        playSong(mappedSongs[0], mappedSongs);
      }
    } else if (item.type === 'playlist') {
        // For client-side generated mixes
        if (item.songs && item.songs.length > 0) {
          playSong(item.songs[0], item.songs);
          return;
        }
        
        // For DB-saved playlists
        const songs = await getSongsByPlaylist(item.id);
        if (songs && songs.length > 0) {
            playSong(songs[0], songs);
        }
    }
  };

  const cardContent = (
    <Card className="overflow-hidden border-0 bg-card/60 hover:bg-card transition-colors group relative">
      <Button
        onClick={handlePlay}
        variant="ghost"
        size="icon"
        className="absolute bottom-20 right-2 bg-primary/80 hover:bg-primary text-primary-foreground rounded-full h-12 w-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-4 z-10"
        aria-label={`Play ${item.title}`}
      >
        <Play className="w-6 h-6 fill-current" />
      </Button>
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

  if (item.type === 'album') {
    return <Link href={`/album/${item.id}`} className="block">{cardContent}</Link>;
  }

  // Playlists and Mixes don't have detail pages yet, so they are not links.
  return cardContent;
}
