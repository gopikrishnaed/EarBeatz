
'use server';

import { createClient as createServerClient } from './server-client';
import { createClient as createBrowserClient } from './client';
import { serviceRoleClient } from './service-role';
import bcrypt from 'bcryptjs';

import type {
  AlbumFromDB,
  AlbumWithCoverArt,
  FeedPostFromDB,
  PlaylistFromDB,
  Song,
  SongFromDB,
  FeedPostInsert,
  UserFromDB,
  UserInsert
} from '@/lib/types';

/**
 * Client for components/server actions that need session-aware access.
 * Never expose serviceRoleClient to the browser.
 */
const getSupabaseClient = () => {
  if (typeof window === 'undefined') {
    return createServerClient();
  }
  return createBrowserClient();
};

/**
 * LOGIN (custom users table with hashed passwords)
 */
export async function loginUser(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  // Server-only: uses service role so RLS is bypassed safely in server actions.
  const supabase = serviceRoleClient;

  const { data, error } = await supabase
    .from('users')
    .select('id, password_hash')
    .eq('email', email)
    .single();

  if (error || !data) {
    console.error('Login error:', error?.message);
    return { success: false, error: 'User not found.' };
  }

  const ok = await bcrypt.compare(password, data.password_hash || '');
  if (!ok) {
    return { success: false, error: 'Invalid password.' };
  }

  // If you want a session/cookie, use Supabase Auth. This function only validates.
  return { success: true };
}

/**
 * SIGNUP (hash the password before insert)
 */
export async function signupUser(
  user: Omit<UserInsert, 'id' | 'created_at' | 'avatar_url' | 'password_hash'> & { password: string }
): Promise<{ success: boolean; error?: string }> {
  const supabase = serviceRoleClient;

  // Ensure uniqueness by email
  const { data: existingUser, error: existingUserError } = await supabase
    .from('users')
    .select('id')
    .eq('email', user.email)
    .maybeSingle();

  if (existingUserError && existingUserError.code !== 'PGRST116') {
      console.error('Error checking for existing user:', existingUserError.message);
      return { success: false, error: 'Database error checking for user.' };
  }

  if (existingUser) {
    return { success: false, error: 'A user with this email already exists.' };
  }

  // Hash the password (cost 10 is a good default)
  const password_hash = await bcrypt.hash(user.password, 10);

  const { error } = await supabase.from('users').insert({
    name: user.name,
    email: user.email,
    password_hash
  });

  if (error) {
    console.error('Error signing up user:', error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

/**
 * Song mapping helper
 */
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
      title: songData.albums?.title || 'Unknown Album'
    },
    coverArt: {
      imageUrl: songData.cover_art_song || ''
    },
    duration: songData.duration_in_seconds
      ? `${Math.floor(songData.duration_in_seconds / 60)}:${String(
          songData.duration_in_seconds % 60
        ).padStart(2, '0')}`
      : '3:00',
    metadata: (songData.metadata as Song['metadata']) || {}
  };
}

/**
 * Data fetchers (unchanged except minor safe-guards)
 */
export async function getSongs(): Promise<Song[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('songs')
    .select(
      `
      *,
      artists ( id, name ),
      albums  ( id, title )
    `
    );

  if (error && Object.keys(error).length > 0) {
    console.error('Error fetching songs:', error.message);
    return [];
  }
  if (!data) return [];
  return (data as unknown as SongFromDB[]).map(mapSongData);
}

export async function getSongsByAlbum(albumId: string): Promise<SongFromDB[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('songs')
    .select(
      `
      *,
      artists ( id, name )
    `
    )
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
    .select(
      `
      songs (
        *,
        artists ( id, name ),
        albums  ( id, title )
      )
    `
    )
    .eq('playlist_id', playlistId);

  if (error) {
    console.error('Error fetching songs by playlist:', error);
    return [];
  }
  const songData = (data || [])
    .map((item) => item.songs)
    .filter(Boolean) as SongFromDB[];
  return songData.map(mapSongData);
}

export async function getAlbumById(
  albumId: string
): Promise<(AlbumFromDB & { artists: { id: string; name: string } | null }) | null> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('albums')
    .select(
      `
      *,
      artists ( id, name )
    `
    )
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
    .select(
      `
      *,
      artists ( name )
    `
    );

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
    .select(
      `
      *,
      artists ( id, name ),
      songs   ( cover_art_song )
    `
    );

  if (error) {
    console.error('Error fetching albums with cover art:', error);
    return [];
  }
  if (!data) return [];

  const albumsWithCovers = data.map((album: any) => {
    const firstSongWithCover = (album.songs || []).find(
      (song: any) => song.cover_art_song
    );
    return {
      ...album,
      coverArtUrl: firstSongWithCover?.cover_art_song || null
    };
  });

  return albumsWithCovers as AlbumWithCoverArt[];
}

export async function getPlaylists(): Promise<PlaylistFromDB[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('playlists')
    .select(
      `
      *,
      users ( name )
    `
    );

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
    .select(
      `
      id,
      content,
      created_at,
      users:user_id ( id, name, avatar_url ),
      songs ( 
        *,
        artists ( id, name ),
        albums  ( id, title )
      ), 
      likes    ( user_id ),
      comments ( id )
    `
    )
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

  // 1) create
  const { data: playlistData, error: playlistError } = await supabase
    .from('playlists')
    .insert({
      title,
      description,
      is_public: true,
      cover_art_url:
        coverArtUrl || (songs.length > 0 ? songs[0].coverArt.imageUrl : null)
      // creator_id: set this to the authed user id when you wire up Supabase Auth
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

  // 2) link songs
  const playlistSongs = songs.map((song) => ({
    playlist_id: playlistData.id,
    song_id: song.id
  }));

  const { error: playlistSongsError } = await supabase
    .from('playlist_songs')
    .insert(playlistSongs);

  if (playlistSongsError) {
    console.error('Error saving playlist songs:', playlistSongsError.message);
    // optional cleanup
    await supabase.from('playlists').delete().eq('id', playlistData.id);
    return { success: false, error: playlistSongsError.message };
  }

  return { success: true };
}

export async function getUsers(): Promise<UserFromDB[]> {
  const supabase = getSupabaseClient();

  // Do not expose password hashes in selects.
  const { data, error } = await supabase
    .from('users')
    .select('id, name, email, avatar_url, created_at');

  if (error) {
    console.error('Error fetching users:', error);
    return [];
  }
  return (data as UserFromDB[]) || [];
}
