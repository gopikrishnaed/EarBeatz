
import { getSongs } from "@/lib/supabase/queries";
import MainLayout from "@/components/layout/main-layout";

export default async function DebugPage() {
  const songs = await getSongs();

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8 bg-background/80 p-8 rounded-lg">
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            Database Debug
          </h1>
          <p className="text-muted-foreground">
            Raw song data from the database. If you see content below, the connection is working.
          </p>
        </div>
        <pre className="p-4 bg-muted rounded-lg overflow-auto text-xs">
          {JSON.stringify(songs, null, 2)}
        </pre>
      </div>
    </MainLayout>
  );
}
