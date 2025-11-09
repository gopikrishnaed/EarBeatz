
import MainLayout from "@/components/layout/main-layout";
import { SongItem } from "@/components/song-item";
import { getSongs } from "@/lib/supabase/queries";
import { MusicCard } from "@/components/music-card";
import type { MusicItem, Song } from "@/lib/types";

export default async function DashboardPage() {
  const allSongs: Song[] = await getSongs();

  // Create 5 random mixes
  const mixes: MusicItem[] = Array.from({ length: 5 }).map((_, i) => {
    const shuffled = [...allSongs].sort(() => 0.5 - Math.random());
    const mixSongs = shuffled.slice(0, 12);
    return {
      id: `mix-${i + 1}`,
      type: 'playlist' as const,
      title: `Daily Mix ${i + 1}`,
      creator: 'For You',
      coverArt: mixSongs.length > 0 ? mixSongs[0].coverArt : { imageUrl: '' },
      // Storing songs directly for client-side playback
      songs: mixSongs
    };
  });
  
  // Sort by creation date to get newly added items
  const newSongs = [...allSongs]
    .sort(() => 0.5 - Math.random()) // Simulate newness by shuffling
    .slice(0, 6);

  const featuredSongs = [...allSongs].sort(() => 0.5 - Math.random()).slice(0, 10);
  
  return (
    <MainLayout>
      <div 
        className="max-w-7xl mx-auto space-y-12"
      >
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Your daily mixes and new releases, curated just for you.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold font-headline mb-4">Your Daily Mixes</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            {mixes.map((item) => (
              <MusicCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            <section>
                <h2 className="text-2xl font-semibold font-headline mb-4">Newly Added</h2>
                <ul className="space-y-2">
                    {newSongs.length > 0 ? (
                        newSongs.map((song) => (
                            <SongItem key={song.id} song={song} playlist={newSongs} />
                        ))
                    ) : (
                        <p className="text-muted-foreground">No new songs found.</p>
                    )}
                </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-headline mb-4">Featured Tracks</h2>
              {featuredSongs.length > 0 ? (
                <ul className="space-y-2">
                    {featuredSongs.map((song) => (
                        <SongItem key={song.id} song={song} playlist={allSongs} />
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
