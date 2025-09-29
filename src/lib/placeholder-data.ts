import type { ImagePlaceholder } from "./placeholder-images";
import { PlaceHolderImages } from "./placeholder-images";

const getImage = (id: string) => PlaceHolderImages.find((img) => img.id === id) as ImagePlaceholder;

export type User = {
  id: string;
  name: string;
  avatar: ImagePlaceholder;
};

export type Artist = {
  id: string;
  name: string;
};

export type Album = {
  id: string;
  title: string;
  artist: Artist;
  coverArt: ImagePlaceholder;
};

export type Song = {
  id: string;
  title: string;
  artist: Artist;
  album: Album;
  duration: string;
  songUrl: string;
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

export const users: User[] = [
  { id: "user-1", name: "Alex", avatar: getImage("avatar-1") },
  { id: "user-2", name: "Maria", avatar: getImage("avatar-2") },
  { id: "user-3", name: "Chris", avatar: getImage("avatar-3") },
  { id: "user-4", name: "Jen", avatar: getImage("avatar-4") },
];

export const artists: Artist[] = [
  { id: "artist-1", name: "Lexin Music" },
  { id: "artist-2", name: "ZakharValaha" },
  { id: "artist-3", name: "Coma-Media" },
  { id: "artist-4", name: "AlexiAction" },
];

export const albums: Album[] = [
  { id: "album-1", title: "The Chill-Out Zone", artist: artists[0], coverArt: getImage("album-7") },
  { id: "album-2", title: "EDM Hits 2024", artist: artists[1], coverArt: getImage("album-2") },
  { id: "album-3", title: "Acoustic Mornings", artist: artists[2], coverArt: getImage("album-3") },
  { id: "album-4", title: "Synthwave Dreams", artist: artists[3], coverArt: getImage("album-4") },
  { id: "album-5", title: "Lofi Beats", artist: artists[0], coverArt: getImage("album-5") },
  { id: "album-6", title: "Rock Anthems", artist: artists[1], coverArt: getImage("album-6") },
];

// To use your own song files:
// 1. Add your .mp3 files to the `public/audio` directory.
// 2. Update the `songUrl` to point to your local file, e.g., `/audio/your-song-filename.mp3`.
export const songs: Song[] = [
  // This song points to a local file in `public/audio`. 
  // Replace 'good-times.mp3' with your actual filename.
  { id: "song-1", title: "Good Times", artist: artists[0], album: albums[0], duration: "3:45", songUrl: "/audio/good-times.mp3" }, 
  { id: "song-2", title: "Action Sport", artist: artists[1], album: albums[1], duration: "2:10", songUrl: "/audio/action-sport.mp3" },
  // These songs are still pointing to remote URLs for demonstration purposes.
  { id: "song-3", title: "Summer Party", artist: artists[2], album: albums[2], duration: "3:05", songUrl: "https://cdn.pixabay.com/audio/2023/05/11/audio_a7e8e6b18a.mp3" },
  { id: "song-4", title: "Cyberpunk", artist: artists[3], album: albums[3], duration: "4:20", songUrl: "https://cdn.pixabay.com/audio/2024/05/23/audio_71b0728741.mp3" },
  { id: "song-5", title: "Lofi Study", artist: artists[0], album: albums[4], duration: "2:50", songUrl: "https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf01a.mp3" },
  { id: "song-6", title: "Powerful Rock", artist: artists[1], album: albums[5], duration: "3:15", songUrl: "https://cdn.pixabay.com/audio/2023/07/23/audio_53b2d16a59.mp3" },
  { id: "song-7", title: "Chill Abstract", artist: artists[0], album: albums[0], duration: "3:22", songUrl: "https://cdn.pixabay.com/audio/2022/08/04/audio_2dde64b24c.mp3" },
  { id: "song-8", title: "Sport Rock", artist: artists[1], album: albums[1], duration: "3:35", songUrl: "https://cdn.pixabay.com/audio/2024/02/08/audio_731a896d82.mp3" },
];

export const allSongs = songs;

export const madeForYou: MusicItem[] = [
  { id: "album-1", type: "album", title: "The Chill-Out Zone", creator: "Lexin Music", coverArt: getImage("album-7") },
  { id: "album-2", type: "album", title: "EDM Hits 2024", creator: "ZakharValaha", coverArt: getImage("album-8") },
  { id: "album-3", type: "album", title: "Acoustic Mornings", creator: "Coma-Media", coverArt: getImage("album-9") },
  { id: "album-4", type: "album", title: "Synthwave Dreams", creator: "AlexiAction", coverArt: getImage("album-1") },
  { id: "album-5", type: "album", title: "Lofi Beats", creator: "Lexin Music", coverArt: getImage("album-10") },
  { id: "album-6", type: "album", title: "Rock Anthems", creator: "ZakharValaha", coverArt: getImage("album-4") },
];

export const recentlyPlayed: MusicItem[] = [
  { id: "album-3", type: "album", title: "Acoustic Mornings", creator: "Coma-Media", coverArt: getImage("album-3") },
  { id: "artist-2", type: "artist", title: "ZakharValaha", creator: "Artist", coverArt: getImage("album-2") },
  { id: "rp-3", type: "playlist", title: "Road Trip", creator: "Alex", coverArt: getImage("album-11") },
  { id: "album-6", type: "album", title: "Rock Anthems", creator: "ZakharValaha", coverArt: getImage("album-6") },
  { id: "artist-1", type: "artist", title: "Lexin Music", creator: "Artist", coverArt: getImage("album-1") },
  { id: "rp-6", type: "playlist", title: "Late Night Vibes", creator: "Maria", coverArt: getImage("album-12") },
];

export const allMusic: MusicItem[] = [...madeForYou, ...recentlyPlayed];

export const feedPosts: FeedPost[] = [
  {
    id: "post-1",
    user: users[0],
    song: songs[0],
    content: "Loving these chill vibes! Perfect for a relaxed afternoon. ☀️",
    likes: 128,
    comments: 12,
    timestamp: "2h ago",
  },
  {
    id: "post-2",
    user: users[1],
    song: songs[1],
    content: "This EDM track is fire! 🔥 Getting me hyped for the weekend.",
    likes: 256,
    comments: 23,
    timestamp: "5h ago",
  },
  {
    id: "post-3",
    user: users[3],
    song: songs[3],
    content: "Driving through the city at night with this synthwave track is a whole mood.",
    likes: 98,
    comments: 7,
    timestamp: "1d ago",
  },
  {
    id: "post-4",
    user: users[2],
    song: songs[5],
    content: "The perfect rock anthem to power through my workout! 💪",
    likes: 312,
    comments: 31,
    timestamp: "2d ago",
  },
];
