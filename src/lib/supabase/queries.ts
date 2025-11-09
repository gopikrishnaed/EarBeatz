
'use server';

import { createClient as createServerClient } from './server-client';
import { createClient as createBrowserClient } from './client';
import type { AlbumFromDB, AlbumWithCoverArt, FeedPostFromDB, PlaylistFromDB, Song, SongFromDB } from '@/lib/types';

// Use a client that doesn't rely on the cookie store for server-side queries
// to avoid issues with Next.js server component rendering.
const getSupabaseClient = () => {
  if (typeof window === 'undefined') {
    return createServerClient();
  }
  return createBrowserClient();
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
            id,
            title,
            song_url,
            duration_in_seconds,
            metadata,
            cover_art_song,
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
    
    const songs: Song[] = (data as SongFromDB[]).map(mapSongData);

    return songs;
}


export async function getSongsByAlbum(albumId: string): Promise<SongFromDB[]> {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
        .from('songs')
        .select(`
            id,
            title,
            song_url,
            duration_in_seconds,
            cover_art_song,
            metadata,
            album_id,
            artists ( id, name )
        `)
        .eq('album_id', albumId);

    if (error && Object.keys(error).length > 0) {
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
                id,
                title,
                song_url,
                duration_in_seconds,
                metadata,
                cover_art_song,
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

export async function getAlbumById(albumId: string): Promise<AlbumFromDB | null> {
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
    const { data: albums, error: albumsError } = await supabase
        .from('albums')
        .select(`
            *,
            artists ( name )
        `);
    
    if (albumsError) {
        console.error('Error fetching albums:', albumsError);
        return [];
    }
    if (!albums) return [];

    const albumsWithCovers = await Promise.all(
        albums.map(async (album) => {
            const { data: songs, error: songsError } = await supabase
                .from('songs')
                .select('cover_art_song')
                .eq('album_id', album.id)
                .not('cover_art_song', 'is', null) // Ensure we only get songs with cover art
                .limit(10); // Fetch a few songs to choose from

            if (songsError || !songs || songs.length === 0) {
                return { ...album, coverArtUrl: null };
            }
            
            // Randomly select one of the song's cover arts for the album
            const randomSong = songs[Math.floor(Math.random() * songs.length)];
            return { ...album, coverArtUrl: randomSong.cover_art_song };
        })
    );

    return albumsWithCovers;
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
            users ( id, name, avatar_url ),
            songs ( 
                id, 
                title,
                artist_id,
                album_id,
                cover_art_song
            ), 
            likes ( user_id ),
            comments ( id )
        `)
        .order('created_at', { ascending: false });

    if (error && Object.keys(error).length > 0) {
        console.error('Error fetching feed posts:', error);
        return [];
    }

    const postsWithDetails = await Promise.all(
        (data || []).map(async (post) => {
            if (!post.songs) return post;

            const { data: artistData, error: artistError } = await supabase
                .from('artists')
                .select('name')
                .eq('id', post.songs.artist_id || '')
                .single();

            if (artistError) console.error('Artist fetch error:', artistError.message);

            return {
                ...post,
                songs: {
                    ...post.songs,
                    artists: artistData || { name: 'Unknown Artist' },
                }
            };
        })
    );

    return postsWithDetails as FeedPostFromDB[];
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
