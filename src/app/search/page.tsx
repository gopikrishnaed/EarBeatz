
import MainLayout from "@/components/layout/main-layout";
import { searchMusic } from "@/lib/supabase/queries";
import { SongItem } from "@/components/song-item";
import { MusicCard } from "@/components/music-card";
import type { Song, MusicItem, AlbumWithCoverArt } from "@/lib/types";
import { SearchX } from "lucide-react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = (searchParams?.q as string) || "";
  const { songs, albums } = await searchMusic(query);

  const albumItems: MusicItem[] = albums.map((album: AlbumWithCoverArt) => ({
    id: album.id,
    type: 'album',
    title: album.title,
    creator: album.artists?.name || 'Unknown Artist',
    coverArt: { imageUrl: album.coverArtUrl || '' },
  }));

  const hasResults = songs.length > 0 || albums.length > 0;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">
              Search Results
            </h1>
            <p className="text-muted-foreground">
              Showing results for: <span className="font-semibold text-foreground">{query}</span>
            </p>
          </div>

          {!hasResults && query ? (
            <div className="flex flex-col items-center justify-center text-center py-20 border rounded-lg bg-card/50">
              <SearchX className="w-16 h-16 text-primary mb-4" />
              <h2 className="text-2xl font-bold">No Results Found</h2>
              <p className="text-muted-foreground max-w-md">
                We couldn't find anything for "{query}". Try a different search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
              {songs.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold font-headline mb-4">Songs</h2>
                  <ul className="space-y-2">
                    {songs.map((song) => (
                      <SongItem key={song.id} song={song} playlist={songs} />
                    ))}
                  </ul>
                </section>
              )}

              {albums.length > 0 && (
                <section>
                  <h2 className="text-2xl font-semibold font-headline mb-4">Albums</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {albumItems.map((item) => (
                      <MusicCard key={item.id} item={item} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
