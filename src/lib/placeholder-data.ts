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
  { id: "artist-1", name: "Stellar Echoes" },
  { id: "artist-2", name: "Midnight Bloom" },
  { id: "artist-3", name: "Crimson Waves" },
  { id: "artist-4", name: "Neon Prophets" },
];

export const albums: Album[] = [
  { id: "album-1", title: "Cosmic Drift", artist: artists[0], coverArt: getImage("album-1") },
  { id: "album-2", title: "Nocturnal Garden", artist: artists[1], coverArt: getImage("album-2") },
  { id: "album-3", title: "Tidal Force", artist: artists[2], coverArt: getImage("album-3") },
  { id: "album-4", title: "Future Retro", artist: artists[3], coverArt: getImage("album-4") },
  { id: "album-5", title: "Quiet introspection", artist: artists[0], coverArt: getImage("album-5") },
  { id: "album-6", title: "Acoustic Journeys", artist: artists[1], coverArt: getImage("album-6") },
];

export const songs: Song[] = [
  { id: "song-1", title: "Orion's Belt", artist: artists[0], album: albums[0], duration: "3:45" },
  { id: "song-2", title: "Moonpetal", artist: artists[1], album: albums[1], duration: "4:12" },
  { id: "song-3", title: "Scarlet Tide", artist: artists[2], album: albums[2], duration: "2:58" },
  { id: "song-4", title: "Digital Dawn", artist: artists[3], album: albums[3], duration: "5:03" },
  { id: "song-5", title: "Empty Spaces", artist: artists[0], album: albums[4], duration: "4:30" },
  { id: "song-6", title: "Dusty Roads", artist: artists[1], album: albums[5], duration: "3:21" },
  { id: "song-7", title: "Nebula", artist: artists[0], album: albums[0], duration: "4:01" },
  { id: "song-8", title: "First Bloom", artist: artists[1], album: albums[1], duration: "3:55" },
];

export const madeForYou: MusicItem[] = [
  { id: "mfy-1", type: "playlist", title: "Chill Mix", creator: "EarBeatz", coverArt: getImage("album-7") },
  { id: "mfy-2", type: "playlist", title: "Focus Flow", creator: "EarBeatz", coverArt: getImage("album-8") },
  { id: "mfy-3", type: "playlist", title: "Energy Boost", creator: "EarBeatz", coverArt: getImage("album-9") },
  { id: "mfy-4", type: "album", title: "Cosmic Drift", creator: "Stellar Echoes", coverArt: getImage("album-1") },
  { id: "mfy-5", type: "playlist", title: "Indie Hits", creator: "EarBeatz", coverArt: getImage("album-10") },
  { id: "mfy-6", type: "album", title: "Future Retro", creator: "Neon Prophets", coverArt: getImage("album-4") },
];

export const recentlyPlayed: MusicItem[] = [
  { id: "rp-1", type: "album", title: "Tidal Force", creator: "Crimson Waves", coverArt: getImage("album-3") },
  { id: "rp-2", type: "artist", title: "Midnight Bloom", creator: "Artist", coverArt: getImage("album-2") },
  { id: "rp-3", type: "playlist", title: "Road Trip", creator: "Alex", coverArt: getImage("album-11") },
  { id: "rp-4", type: "album", title: "Acoustic Journeys", creator: "Midnight Bloom", coverArt: getImage("album-6") },
  { id: "rp-5", type: "artist", title: "Stellar Echoes", creator: "Artist", coverArt: getImage("album-1") },
  { id: "rp-6", type: "playlist", title: "Late Night Vibes", creator: "Maria", coverArt: getImage("album-12") },
];

export const allMusic: MusicItem[] = [...madeForYou, ...recentlyPlayed];

export const feedPosts: FeedPost[] = [
  {
    id: "post-1",
    user: users[0],
    song: songs[0],
    content: "This track is out of this world! 🚀 Perfect for late-night coding sessions.",
    likes: 128,
    comments: 12,
    timestamp: "2h ago",
  },
  {
    id: "post-2",
    user: users[1],
    song: songs[1],
    content: "Absolutely in love with the vibes on this new album. So dreamy.",
    likes: 256,
    comments: 23,
    timestamp: "5h ago",
  },
  {
    id: "post-3",
    user: users[3],
    song: songs[3],
    content: "Powering through my workout with this absolute banger! 🔥",
    likes: 98,
    comments: 7,
    timestamp: "1d ago",
  },
  {
    id: "post-4",
    user: users[2],
    song: songs[5],
    content: "Just what I needed for a relaxing Sunday morning. ☕️",
    likes: 312,
    comments: 31,
    timestamp: "2d ago",
  },
];
