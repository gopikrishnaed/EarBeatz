import Image from "next/image";
import { getAlbumById, getSongsByAlbum } from "@/lib/supabase/queries";
import MainLayout from "@/components/layout/main-layout";
import { Play } from "lucide-react";
import { PlayAllButton } from "@/components/play-all-button";
import { SongItem } from "@/components/song-item";
import type { Song, SongFromDB } from "@/lib/types";

function mapSongData(songData: SongFromDB, album: Awaited<ReturnType<typeof getAlbumById>>): Song {
  return {
      id: songData.id,
      title: songData.title,
      songUrl: songData.song_url || '',
      artist: {
        id: album?.artists?.id || '',
        name: album?.artists?.name || 'Unknown Artist'
      },
      album: {
        id: album?.id || '',
        title: album?.title || 'Unknown Album',
        coverArt: {
          imageUrl: album?.cover_art_url || ''
        }
      },
      duration: songData.duration_in_seconds ? `${Math.floor(songData.duration_in_seconds / 60)}:${String(songData.duration_in_seconds % 60).padStart(2, '0')}` : '3:00',
      metadata: songData.metadata as Song['metadata'] || {}
  }
}

export default async function AlbumDetailPage({ params }: { params: { id: string } }) {
  const album = await getAlbumById(params.id);
  const songsFromDb = await getSongsByAlbum(params.id);

  if (!album) {
    return (
      <MainLayout>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Album not found</h1>
          <p className="text-muted-foreground">Sorry, we couldn't find the album you're looking for.</p>
        </div>
      </MainLayout>
    )
  }

  const songs: Song[] = songsFromDb.map(song => mapSongData(song, album));

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/3">
          <div className="aspect-square relative shadow-lg">
            <Image
              src={album.cover_art_url || `https://picsum.photos/seed/${album.id}/600/600`}
              alt={album.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="mt-4 text-center md:text-left">
            <h1 className="text-3xl font-bold font-headline">{album.title}</h1>
            <p className="text-lg text-muted-foreground">{album.artists?.name || 'Unknown Artist'}</p>
            <div className="mt-4 flex justify-center md:justify-start">
              {songs.length > 0 && <PlayAllButton songs={songs} />}
            </div>
          </div>
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4 font-headline">Tracks</h2>
          <ul className="space-y-2">
            {songs.length > 0 ? (
              songs.map((song) => (
                <SongItem key={song.id} song={song} playlist={songs} />
              ))
            ) : (
              <p className="text-muted-foreground">No tracks found for this album.</p>
            )}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
}
