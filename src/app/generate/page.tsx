import MainLayout from "@/components/layout/main-layout";
import { PlaylistGenerator } from "./playlist-generator";

export default function GeneratePage() {
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
          <PlaylistGenerator />
        </div>
      </div>
    </MainLayout>
  );
}
