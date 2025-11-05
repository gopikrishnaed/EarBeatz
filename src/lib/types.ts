// These types are for data structures used in the frontend components.

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
  artist?: Artist;
  coverArt: ImagePlaceholder;
  release_date?: string;
};

export type Song = {
  id: string;
  title: string;
  artist: Artist;
  album: Album;
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


// These types represent the data structure as it comes from the Supabase database.
// They are used in server-side data fetching.

export type ArtistFromDB = {
  id: string;
  name: string;
  created_at: string;
};

export type AlbumFromDB = {
  id: string;
  title: string;
  artist_id: string;
  cover_art_url: string | null;
  release_date: string | null;
  created_at: string;
  artists: { name: string } | null;
};

export type SongFromDB = {
  id: string;
  title: string;
  artist_id: string;
  album_id: string;
  duration_in_seconds: number | null;
  song_url: string;
  created_at: string;
  metadata: {
    genre?: string;
    mood?: string;
    instruments?: string[];
  } | null;
  artists: { id: string, name: string } | null;
  albums: { id: string, title: string, cover_art_url: string | null } | null;
};

export type UserFromDB = {
  id: string;
  name: string;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type PlaylistFromDB = {
  id: string;
  title: string;
  description: string | null;
  creator_id: string;
  cover_art_url: string | null;
  is_public: boolean;
  created_at: string;
  users: { name: string } | null;
};

export type FeedPostFromDB = {
  id: string;
  user_id: string;
  song_id: string;
  content: string | null;
  created_at: string;
  users: { id: string, name: string, avatar_url: string | null } | null;
  songs: {
    id: string,
    title: string,
    artists: { name: string } | null,
    albums: { id: string, title: string, cover_art_url: string | null } | null
  } | null;
  likes: { user_id: string }[];
  comments: { id: string }[];
}
