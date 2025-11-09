
import MainLayout from "@/components/layout/main-layout";
import { PlaylistGenerator } from "./playlist-generator";
import { getSongs } from "@/lib/supabase/queries";
import type { Song } from "@/lib/types";

export default async function GeneratePage() {
  const songs: Song[] = await getSongs();
  
  const moods = Array.from(
    new Set(
      songs
        .map((song) => song.metadata?.mood)
        .filter((mood): mood is string => !!mood)
    )
  );

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4">
          <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">
              Generate Playlist
            </h1>
            <p className="text-muted-foreground">
              Create the perfect playlist for any mood with the power of AI.
            </p>
          </div>
          <PlaylistGenerator moods={moods.length > 0 ? moods : ["Happy", "Chill", "Energetic"]} />
        </div>
      </div>
    </MainLayout>
  );
}
