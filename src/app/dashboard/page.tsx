import MainLayout from "@/components/layout/main-layout";
import { SongItem } from "@/components/song-item";
import { getSongs } from "@/lib/supabase/queries";
import type { Song } from "@/lib/types";

export default async function DashboardPage() {
  const allSongs = await getSongs();

  const featuredSongs = [...allSongs].sort(() => 0.5 - Math.random()).slice(0, 10);
  
  return (
    <MainLayout>
      <div>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Here are some tracks you might like.
            </p>
          </div>

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
