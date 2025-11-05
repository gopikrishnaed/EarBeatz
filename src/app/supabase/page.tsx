import MainLayout from "@/components/layout/main-layout";
import { supabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

async function getArtists() {
  // Using 'any' for now as we haven't defined the full Supabase schema types yet
  const { data, error } = await supabase.from("artists").select("id, name");

  if (error) {
    console.error("Supabase error:", error.message);
    throw new Error("Could not fetch artists from the database.");
  }
  
  return data;
}

export default async function SupabasePage() {
  let artists: { id: string; name: string }[] | null = null;
  let fetchError: string | null = null;

  try {
    artists = await getArtists();
  } catch (error) {
    if (error instanceof Error) {
        fetchError = error.message;
    } else {
        fetchError = "An unknown error occurred."
    }
  }

  const hasCredentials = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return (
    <MainLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold font-headline tracking-tight">
            Supabase Integration
          </h1>
          <p className="text-muted-foreground">
            This page demonstrates fetching data from a Supabase database.
          </p>
        </div>

        {!hasCredentials && (
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Missing Supabase Credentials</AlertTitle>
                <AlertDescription>
                    Please add your Supabase URL and anon key to the <code>.env</code> file to connect to the database.
                </AlertDescription>
            </Alert>
        )}

        {fetchError && (
             <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Database Error</AlertTitle>
                <AlertDescription>
                    {fetchError} Check if your tables are set up correctly and credentials are valid.
                </AlertDescription>
            </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Artists from Supabase</CardTitle>
          </CardHeader>
          <CardContent>
            {artists && artists.length > 0 ? (
              <ul className="space-y-2">
                {artists.map((artist) => (
                  <li key={artist.id} className="rounded-md border p-3 bg-muted/50">
                    {artist.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">
                {hasCredentials && !fetchError ? "No artists found in the database." : "Could not fetch data."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
