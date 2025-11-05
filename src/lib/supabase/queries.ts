'use server';

import { supabase } from './server-client';
import type { AlbumFromDB, FeedPostFromDB, PlaylistFromDB, SongFromDB } from '@/lib/types';

export async function getSongsByAlbum(albumId: string): Promise<SongFromDB[]> {
    const { data, error } = await supabase
        .from('songs')
        .select(`
            id,
            title,
            song_url,
            artists ( id, name ),
            albums ( id, title, cover_art_url )
        `)
        .eq('album_id', albumId);

    if (error) {
        console.error('Error fetching songs by album:', error);
        return [];
    }
    return data || [];
}

export async function getAlbums(): Promise<AlbumFromDB[]> {
    const { data, error } = await supabase
        .from('albums')
        .select(`
            *,
            artists ( name )
        `);
    
    if (error) {
        console.error('Error fetching albums:', error);
        return [];
    }
    return data || [];
}

export async function getPlaylists(): Promise<PlaylistFromDB[]> {
    const { data, error } = await supabase
        .from('playlists')
        .select(`
            *,
            users ( name )
        `);

    if (error) {
        console.error('Error fetching playlists:', error);
        return [];
    }
    return data || [];
}

export async function getFeedPosts(): Promise<FeedPostFromDB[]> {
    const { data, error } = await supabase
        .from('feed_posts')
        .select(`
            id,
            content,
            created_at,
            users ( id, name, avatar_url ),
            songs (
                id,
                title,
                artists ( name ),
                albums ( id, title, cover_art_url )
            ),
            likes ( user_id ),
            comments ( id )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching feed posts:', error);
        return [];
    }
    return data || [];
}
