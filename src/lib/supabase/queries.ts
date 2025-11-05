'use server';

import { createClient } from './server-client';
import type { AlbumFromDB, FeedPostFromDB, PlaylistFromDB, Song, SongFromDB } from '@/lib/types';

// Placeholder song URLs for demonstration
const placeholderSongs = [
    'https://cdn.pixabay.com/download/audio/2022/12/22/audio_fb4b16e49e.mp3', // Lofi Chill
    'https://cdn.pixabay.com/download/audio/2022/11/22/audio_15a8b13264.mp3', // Ambient Classical Guitar
    'https://cdn.pixabay.com/download/audio/2022/08/04/audio_2dde64b97c.mp3', // Just Relax
    'https://cdn.pixabay.com/download/audio/2024/04/24/audio_34902b97c7.mp3', // Upbeat Funk
    'https://cdn.pixabay.com/download/audio/2023/04/18/audio_1c8898165b.mp3'  // Cinematic Emotional
];

function mapSongData(songData: SongFromDB, index: number): Song {
    return {
        id: songData.id,
        title: songData.title,
        songUrl: songData.song_url || placeholderSongs[index % placeholderSongs.length],
        artist: {
          id: songData.artists?.id || '',
          name: songData.artists?.name || 'Unknown Artist'
        },
        album: {
          id: songData.albums?.id || '',
          title: songData.albums?.title || 'Unknown Album',
          coverArt: {
            imageUrl: songData.albums?.cover_art_url || ''
          }
        },
        duration: songData.duration_in_seconds ? `${Math.floor(songData.duration_in_seconds / 60)}:${String(songData.duration_in_seconds % 60).padStart(2, '0')}` : '3:00',
        metadata: songData.metadata as Song['metadata'] || {}
    }
}


export async function getSongs(): Promise<Song[]> {
    const supabase = createClient();
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
        console.error('Error fetching songs:', error.message);
        return [];
    }
    
    if (!data) {
        return [];
    }
    
    const songs: Song[] = (data as SongFromDB[]).map(mapSongData);

    return songs;
}


export async function getSongsByAlbum(albumId: string): Promise<SongFromDB[]> {
    const supabase = createClient();
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
    
    if (!data) {
        return [];
    }
    
    // Inject placeholder URLs if the song_url is null
    const modifiedData = data.map((song, index) => ({
        ...song,
        song_url: song.song_url || placeholderSongs[index % placeholderSongs.length]
    }));

    return modifiedData || [];
}

export async function getAlbums(): Promise<AlbumFromDB[]> {
    const supabase = createClient();
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
    const supabase = createClient();
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
    const supabase = createClient();
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
