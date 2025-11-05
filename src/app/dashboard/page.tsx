import MainLayout from "@/components/layout/main-layout";
import { MusicCard } from "@/components/music-card";
import { getAlbums } from "@/lib/supabase/queries";
import type { MusicItem } from "@/lib/types";

export default async function DashboardPage() {
  const albums = await getAlbums();
  const musicItems: MusicItem[] = albums.map(a => ({
    id: a.id,
    type: 'album',
    title: a.title,
    creator: a.artists?.name || 'Unknown Artist',
    coverArt: { imageUrl: a.cover_art_url || '' }
  }));

  const madeForYou = [...musicItems].sort(() => 0.5 - Math.random()).slice(0, 6);
  const recentlyPlayed = [...musicItems].sort(() => 0.5 - Math.random()).slice(0, 6);
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            Good Afternoon
          </h1>
          <p className="text-muted-foreground">
            Explore your favorite music, discover new tracks, and share your vibes.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold font-headline mb-4">Made for you</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {madeForYou.map((item) => (
              <MusicCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold font-headline mb-4">Recently Played</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {recentlyPlayed.map((item) => (
              <MusicCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
