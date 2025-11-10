
'use server';

import { createClient as createServerClient } from './server-client';
import { createClient as createBrowserClient } from './client';
import { serviceRoleClient } from './service-role';
import type { AlbumFromDB, AlbumWithCoverArt, FeedPostFromDB, PlaylistFromDB, Song, SongFromDB, FeedPostInsert, UserFromDB, UserInsert } from '@/lib/types';

// This client is for components and server actions that need the user's session.
const getSupabaseClient = () => {
  if (typeof window === 'undefined') {
    return createServerClient();
  }
  return createBrowserClient();
}

export async function loginUser(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const supabase = serviceRoleClient;
  
  const { data, error } = await supabase
    .from('users')
    .select('password')
    .eq('email', email)
    .single();

  if (error || !data) {
    console.error('Login error:', error?.message);
    return { success: false, error: 'User not found.' };
  }

  // In a real app, you should use a secure password hashing library like bcrypt.
  // For this prototype, we'll do a simple string comparison.
  if (data.password !== password) {
    return { success: false, error: 'Invalid password.' };
  }

  return { success: true };
}

export async function signupUser(user: Omit<UserInsert, 'id' | 'created_at' | 'avatar_url'>): Promise<{ success: boolean; error?: string }> {
  const supabase = serviceRoleClient;

  // Check if user already exists
  const { data: existingUser, error: existingUserError } = await supabase
    .from('users')
    .select('id')
    .eq('email', user.email)
    .single();

  if (existingUser) {
    return { success: false, error: 'A user with this email already exists.' };
  }
  
  if (existingUserError && existingUserError.code !== 'PGRST116') { // PGRST116: "exact one row expected" which is fine if user doesn't exist
    console.error('Error checking for existing user:', existingUserError.message);
    return { success: false, error: existingUserError.message };
  }
  
  const { error } = await supabase.from('users').insert({
    name: user.name,
    email: user.email,
    password: user.password
  });

  if (error) {
    console.error('Error signing up user:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}


function mapSongData(songData: SongFromDB): Song {
    return {
        id: songData.id,
        title: songData.title,
        songUrl: songData.song_url || '',
        artist: {
          id: songData.artists?.id || '',
          name: songData.artists?.name || 'Unknown Artist'
        },
        album: {
          id: songData.albums?.id || '',
          title: songData.albums?.title || 'Unknown Album',
        },
        coverArt: {
            imageUrl: songData.cover_art_song || ''
        },
        duration: songData.duration_in_seconds ? `${Math.floor(songData.duration_in_seconds / 60)}:${String(songData.duration_in_seconds % 60).padStart(2, '0')}` : '3:00',
        metadata: songData.metadata as Song['metadata'] || {}
    }
}

export async function getSongs(): Promise<Song[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('songs')
        .select(`
            *,
            artists ( id, name ),
            albums ( id, title )
        `);

    if (error && Object.keys(error).length > 0) {
        console.error('Error fetching songs:', error.message);
        return [];
    }
    
    if (!data) {
        return [];
    }
    
    const songs: Song[] = (data as unknown as SongFromDB[]).map(mapSongData);

    return songs;
}


export async function getSongsByAlbum(albumId: string): Promise<SongFromDB[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('songs')
        .select(`
            *,
            artists ( id, name )
        `)
        .eq('album_id', albumId);

    if (error) {
        console.error('Error fetching songs by album:', error);
        return [];
    }
    
    return data || [];
}

export async function getSongsByPlaylist(playlistId: string): Promise<Song[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('playlist_songs')
        .select(`
            songs (
                *,
                artists ( id, name ),
                albums ( id, title )
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

export async function getAlbumById(albumId: string): Promise<(AlbumFromDB & { artists: { id: string, name: string } | null}) | null> {
    const supabase = getSupabaseClient();
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
    const supabase = getSupabaseClient();
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

export async function getAlbumsWithCoverArt(): Promise<AlbumWithCoverArt[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('albums')
        .select(`
            *,
            artists ( id, name ),
            songs ( cover_art_song )
        `);

    if (error) {
        console.error('Error fetching albums with cover art:', error);
        return [];
    }
    if (!data) return [];

    const albumsWithCovers = data.map(album => {
        const firstSongWithCover = album.songs.find(song => song.cover_art_song);
        return {
            ...album,
            coverArtUrl: firstSongWithCover?.cover_art_song || null,
        };
    });

    return albumsWithCovers as AlbumWithCoverArt[];
}


export async function getPlaylists(): Promise<PlaylistFromDB[]> {
    const supabase = getSupabaseClient();
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
    const supabase = getSupabaseClient();
    
    const { data, error } = await supabase
        .from('feed_posts')
        .select(`
            id,
            content,
            created_at,
            users:user_id ( id, name, avatar_url ),
            songs ( 
                *,
                artists ( id, name ),
                albums ( id, title )
            ), 
            likes ( user_id ),
            comments ( id )
        `)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching feed posts:', error.message);
        return [];
    }

    return (data as unknown as FeedPostFromDB[]) || [];
}

export async function createFeedPost(
    post: FeedPostInsert
): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseClient();

    const { error } = await supabase.from('feed_posts').insert(post);

    if (error) {
        console.error('Error creating feed post:', error.message);
        return { success: false, error: error.message };
    }

    return { success: true };
}


export async function savePlaylist(
    title: string, 
    description: string | null, 
    songs: Song[],
    coverArtUrl?: string | null
): Promise<{ success: boolean; error?: string }> {
    const supabase = getSupabaseClient();

    // Step 1: Create the new playlist
    const { data: playlistData, error: playlistError } = await supabase
        .from('playlists')
        .insert({
            title,
            description,
            is_public: true,
            cover_art_url: coverArtUrl || (songs.length > 0 ? songs[0].coverArt.imageUrl : null),
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


export async function getUsers(): Promise<UserFromDB[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('users')
        .select('*');

    if (error) {
        console.error('Error fetching users:', error);
        return [];
    }

    return data || [];
}
