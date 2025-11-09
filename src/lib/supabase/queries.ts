'use server';

import { createClient } from './server-client';
import type { AlbumFromDB, FeedPostFromDB, PlaylistFromDB, Song, SongFromDB } from '@/lib/types';

function mapSongData(songData: SongFromDB): Song {
    return {
        id: songData.id,
        title: songData.title,
        songUrl: songData.song_url || '', // Use the URL from DB or an empty string
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
            duration_in_seconds,
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

export async function getSongsByPlaylist(playlistId: string): Promise<Song[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('playlist_songs')
        .select(`
            songs (
                id,
                title,
                song_url,
                duration_in_seconds,
                metadata,
                artists ( id, name ),
                albums ( id, title, cover_art_url )
            )
        `)
        .eq('playlist_id', playlistId);

    if (error) {
        console.error('Error fetching songs by playlist:', error);
        return [];
    }

    const songData = data.map(item => item.songs).filter(Boolean) as SongFromDB[];
    return songData.map(mapSongData);
}

export async function getAlbumById(albumId: string): Promise<AlbumFromDB | null> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('albums')
        .select(`
            *,
            artists ( id, name )
        `)
        .eq('id', albumId)
        .single();
    
    if (error) {
        console.error('Error fetching album:', error);
        return null;
    }
    return data;
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
                artist_id,
                album_id
            ), 
            likes ( user_id ),
            comments ( id )
        `)
        .order('created_at', { ascending: false });

    if (error && Object.keys(error).length > 0) {
        console.error('Error fetching feed posts:', error);
        return [];
    }
    return data || [];
}


export async function savePlaylist(
    title: string, 
    description: string | null, 
    songs: Song[],
    coverArtUrl?: string | null
): Promise<{ success: boolean; error?: string }> {
    const supabase = createClient();

    // Step 1: Create the new playlist
    const { data: playlistData, error: playlistError } = await supabase
        .from('playlists')
        .insert({
            title,
            description,
            is_public: true,
            cover_art_url: coverArtUrl || (songs.length > 0 ? songs[0].album.coverArt.imageUrl : null),
            // creator_id would be set here if users were authenticated
        })
        .select()
        .single();

    if (playlistError) {
        console.error('Error saving playlist:', playlistError.message);
        return { success: false, error: playlistError.message };
    }

    if (!playlistData) {
        return { success: false, error: 'Failed to create playlist.' };
    }

    // Step 2: Prepare the songs to be linked to the new playlist
    const playlistSongs = songs.map(song => ({
        playlist_id: playlistData.id,
        song_id: song.id,
    }));

    // Step 3: Insert the song links into the playlist_songs table
    const { error: playlistSongsError } = await supabase
        .from('playlist_songs')
        .insert(playlistSongs);

    if (playlistSongsError) {
        console.error('Error saving playlist songs:', playlistSongsError.message);
        // Optional: Clean up by deleting the playlist if linking songs fails
        await supabase.from('playlists').delete().eq('id', playlistData.id);
        return { success: false, error: playlistSongsError.message };
    }

    return { success: true };
}
