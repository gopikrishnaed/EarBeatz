
import MainLayout from "@/components/layout/main-layout";
import { MusicCard } from "@/components/music-card";
import { getAlbumsWithCoverArt } from "@/lib/supabase/queries";
import type { MusicItem, AlbumWithCoverArt } from "@/lib/types";

export default async function DiscoverPage() {
  const albums: AlbumWithCoverArt[] = await getAlbumsWithCoverArt();

  const allMusic: MusicItem[] = albums.map(a => ({
    id: a.id,
    type: 'album',
    title: a.title,
    creator: a.artists?.name || 'Unknown Artist',
    coverArt: { imageUrl: a.coverArtUrl || '' }
  }));

  // Sort by creation date to get newly added items
  const newReleases = [...albums]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 12)
    .map(a => ({
      id: a.id,
      type: 'album' as const,
      title: a.title,
      creator: a.artists?.name || 'Unknown Artist',
      coverArt: { imageUrl: a.coverArtUrl || '' }
    }));

  const trending = [...allMusic].sort(() => 0.5 - Math.random()).slice(0, 6);

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">Discover</h1>
          <p className="text-muted-foreground">
            Find your next favorite track.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold font-headline mb-4">Newly Added</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {newReleases.map((item) => (
              <MusicCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold font-headline mb-4">Trending Now</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {trending.map((item) => (
              <MusicCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
