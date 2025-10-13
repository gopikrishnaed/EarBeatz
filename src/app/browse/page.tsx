import MainLayout from "@/components/layout/main-layout";
import { MusicCard } from "@/components/music-card";
import { allMusic } from "@/lib/placeholder-data";

// Helper to get unique items by a key
function getUniqueItems<T>(items: T[], key: keyof T): T[] {
  return [...new Map(items.map(item => [item[key], item])).values()];
}

export default function BrowsePage() {
  const uniqueMusic = getUniqueItems(allMusic, 'id');
  const newReleases = [...uniqueMusic].sort(() => 0.5 - Math.random()).slice(0, 6);
  const topCharts = [...uniqueMusic].sort(() => 0.5 - Math.random()).slice(0, 6);
  const genres = [...uniqueMusic].sort(() => 0.5 - Math.random()).slice(0, 12);

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">Browse</h1>
          <p className="text-muted-foreground">
            Explore the world of music.
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-semibold font-headline mb-4">New Releases</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {newReleases.map((item) => (
              <MusicCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold font-headline mb-4">Top Charts</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {topCharts.map((item) => (
              <MusicCard key={item.id} item={item} />
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold font-headline mb-4">Genres</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {genres.map((item, index) => (
               <div key={`${item.id}-${index}`} className="bg-card/80 rounded-lg p-4 text-center font-semibold hover:bg-card transition-colors">{item.type === 'album' ? 'Rock' : item.type === 'playlist' ? 'Pop' : 'Hip-Hop' }</div>
            ))}
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
