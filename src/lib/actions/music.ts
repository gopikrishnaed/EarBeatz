'use server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/types/supabase';
import type { Song, SongFromDB } from '@/lib/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

export async function getSongs(): Promise<Song[]> {
    const { data, error } = await supabase
        .from('songs')
        .select(`
            id,
            title,
            song_url,
            duration_in_seconds,
            metadata,
            artists ( id, name ),
            albums ( id, title, cover_art_url )
        `);

    if (error) {
        console.error('Error fetching songs:', error);
        return [];
    }
    
    const songs: Song[] = (data as SongFromDB[]).map(s => ({
        id: s.id,
        title: s.title,
        songUrl: s.song_url,
        artist: {
          id: s.artists?.id || '',
          name: s.artists?.name || 'Unknown Artist'
        },
        album: {
          id: s.albums?.id || '',
          title: s.albums?.title || 'Unknown Album',
          coverArt: {
            imageUrl: s.albums?.cover_art_url || ''
          }
        },
        duration: s.duration_in_seconds ? `${Math.floor(s.duration_in_seconds / 60)}:${String(s.duration_in_seconds % 60).padStart(2, '0')}` : '0:00',
        metadata: s.metadata as Song['metadata'] || {}
    }));

    return songs;
}
