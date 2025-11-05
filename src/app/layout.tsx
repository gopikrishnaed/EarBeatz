import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { MusicPlayerProvider } from '@/context/music-player-context';
import { getSongs } from '@/lib/supabase/queries';
import type { Song } from '@/lib/types';

export const metadata: Metadata = {
  title: 'EarBeatz',
  description: 'Your next-gen music experience.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialPlaylist = await getSongs();
  
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <MusicPlayerProvider initialPlaylist={initialPlaylist}>
          {children}
        </MusicPlayerProvider>
        <Toaster />
      </body>
    </html>
  );
}
