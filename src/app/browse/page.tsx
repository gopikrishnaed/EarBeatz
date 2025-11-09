
import MainLayout from "@/components/layout/main-layout";
import { MusicCard } from "@/components/music-card";
import { getPlaylists } from "@/lib/supabase/queries";
import type { MusicItem } from "@/lib/types";

export default async function BrowsePage() {
  const playlists = await getPlaylists();

  const playlistItems: MusicItem[] = playlists.map(p => ({ 
    id: p.id, 
    type: 'playlist' as const, 
    title: p.title, 
    creator: p.users?.name || 'AI Generated', 
    coverArt: { imageUrl: p.cover_art_url || '' } 
  }));

  const featuredPlaylists = [...playlistItems].sort(() => 0.5 - Math.random()).slice(0, 12);

  return (
    <MainLayout>
      <div>
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">Browse Playlists</h1>
            <p className="text-muted-foreground">
              Explore curated and AI-generated playlists.
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
        </div>
      </div>
    </MainLayout>
  );
}
