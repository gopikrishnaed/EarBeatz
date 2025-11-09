
import MainLayout from "@/components/layout/main-layout";
import { MusicCard } from "@/components/music-card";
import { getAlbumsWithCoverArt } from "@/lib/supabase/queries";
import type { MusicItem } from "@/lib/types";

export default async function AlbumsPage() {
  const albums = await getAlbumsWithCoverArt();
  const musicItems: MusicItem[] = albums.map(a => ({
    id: a.id,
    type: 'album',
    title: a.title,
    creator: a.artists?.name || 'Unknown Artist',
    coverArt: { imageUrl: a.coverArtUrl || '' }
  }));

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            Albums
          </h1>
          <p className="text-muted-foreground">
            Browse your collection of albums.
          </p>
        </div>

        <section>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {musicItems.map((item) => (
              <MusicCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
