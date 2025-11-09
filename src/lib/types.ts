


// These types are for data structures used in the frontend components.
import type { Database, TablesInsert } from './types/supabase';

export type ImagePlaceholder = {
  imageUrl: string;
  imageHint?: string;
};

export type User = {
  id: string;
  name: string;
  email?: string;
  avatar?: ImagePlaceholder;
};

export type Artist = {
  id: string;
  name: string;
};

export type Album = {
  id: string;
  title: string;
  artist?: Artist; // Artist can be optional
  release_date?: string;
  coverArt?: ImagePlaceholder; // Optional cover art for albums
};

export type Song = {
  id: string;
  title: string;
  artist: Artist;
  album: Omit<Album, 'artist' | 'coverArt'>;
  coverArt: ImagePlaceholder;
  duration?: string; 
  songUrl: string;
  metadata?: {
    genre?: string;
    mood?: string;
    instruments?: string[];
  };
};

export type MusicItem = {
  id: string;
  type: "playlist" | "album" | "artist";
  title: string;
  creator: string;
  coverArt: ImagePlaceholder;
  songs?: Song[]; // Optional: for client-side playlists like mixes
}

export type FeedPost = {
  id: string;
  user: User;
  song: Song;
  content: string;
  likes: number;
  comments: number;
  timestamp: string;
};

export type FeedPostInsert = TablesInsert<'feed_posts'>;


// These types represent the data structure as it comes from the Supabase database.
// They are used in server-side data fetching.
export type ArtistFromDB = Database['public']['Tables']['artists']['Row'];
export type AlbumFromDB = Database['public']['Tables']['albums']['Row'] & {
  artists: { id: string, name: string } | null;
};
export type AlbumWithCoverArt = AlbumFromDB & { coverArtUrl: string | null; songs: { cover_art_song: string | null }[] };

export type SongFromDB = Omit<Database['public']['Tables']['songs']['Row'], 'artist_id' | 'album_id'> & {
  artists: { id: string; name: string; } | null;
  albums: { id: string; title: string; } | null;
};
export type UserFromDB = Database['public']['Tables']['users']['Row'];
export type PlaylistFromDB = Database['public']['Tables']['playlists']['Row'] & {
  users: { name: string } | null;
};
export type FeedPostFromDB = Omit<Database['public']['Tables']['feed_posts']['Row'], 'user_id' | 'song_id'> & {
  users: { id: string, name: string, avatar_url: string | null } | null;
  songs: (SongFromDB) | null;
  likes: { user_id: string }[];
  comments: { id: string }[];
}
