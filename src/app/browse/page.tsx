
import MainLayout from "@/components/layout/main-layout";
import { MusicCard } from "@/components/music-card";
import { getPlaylists, getSongs } from "@/lib/supabase/queries";
import type { MusicItem, Song } from "@/lib/types";
import { SongItem } from "@/components/song-item";

export default async function BrowsePage() {
  const playlists = await getPlaylists();
  const songs = await getSongs();

  const playlistItems: MusicItem[] = playlists.map(p => ({ 
    id: p.id, 
    type: 'playlist' as const, 
    title: p.title, 
    creator: p.users?.name || 'AI Generated', 
    coverArt: { imageUrl: p.cover_art_url || '' } 
  }));

  const featuredPlaylists = [...playlistItems].sort(() => 0.5 - Math.random()).slice(0, 12);
  const featuredSongs = [...songs].sort(() => 0.5 - Math.random()).slice(0, 10);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">Browse</h1>
            <p className="text-muted-foreground">
              Explore playlists and songs from your library.
            </p>
          </div>

          <section>
            <h2 className="text-2xl font-semibold font-headline mb-4">Featured Playlists</h2>
            {featuredPlaylists.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {featuredPlaylists.map((item) => (
                  <MusicCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 border rounded-lg bg-card/50">
                <p className="text-lg font-medium">No playlists found</p>
                <p className="text-muted-foreground">
                  Create a new playlist or use the AI generator to get started.
                </p>
              </div>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold font-headline mb-4">All Songs</h2>
            {featuredSongs.length > 0 ? (
              <ul className="space-y-2">
                  {featuredSongs.map((song) => (
                      <SongItem key={song.id} song={song} playlist={songs} />
                  ))}
              </ul>
              ) : (
                  <p className="text-muted-foreground">No songs found in your library yet.</p>
              )}
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
