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
  { id: "artist-1", name: "Taylor Swift" },
  { id: "artist-2", name: "The Weeknd" },
  { id: "artist-3", name: "Billie Eilish" },
  { id: "artist-4", name: "Drake" },
];

export const albums: Album[] = [
  { id: "album-1", title: "Midnights", artist: artists[0], coverArt: getImage("album-1") },
  { id: "album-2", title: "After Hours", artist: artists[1], coverArt: getImage("album-2") },
  { id: "album-3", title: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?", artist: artists[2], coverArt: getImage("album-3") },
  { id: "album-4", title: "Certified Lover Boy", artist: artists[3], coverArt: getImage("album-4") },
  { id: "album-5", title: "Folklore", artist: artists[0], coverArt: getImage("album-5") },
  { id: "album-6", title: "Starboy", artist: artists[1], coverArt: getImage("album-6") },
];

export const songs: Song[] = [
  { id: "song-1", title: "Anti-Hero", artist: artists[0], album: albums[0], duration: "3:20" },
  { id: "song-2", title: "Blinding Lights", artist: artists[1], album: albums[1], duration: "3:20" },
  { id: "song-3", title: "bad guy", artist: artists[2], album: albums[2], duration: "3:14" },
  { id: "song-4", title: "Way 2 Sexy", artist: artists[3], album: albums[3], duration: "4:17" },
  { id: "song-5", title: "cardigan", artist: artists[0], album: albums[4], duration: "3:59" },
  { id: "song-6", title: "Starboy", artist: artists[1], album: albums[5], duration: "3:50" },
  { id: "song-7", title: "Lavender Haze", artist: artists[0], album: albums[0], duration: "3:22" },
  { id: "song-8", title: "Save Your Tears", artist: artists[1], album: albums[1], duration: "3:35" },
];

export const madeForYou: MusicItem[] = [
  { id: "mfy-1", type: "playlist", title: "Chill Mix", creator: "EarBeatz", coverArt: getImage("album-7") },
  { id: "mfy-2", type: "playlist", title: "Focus Flow", creator: "EarBeatz", coverArt: getImage("album-8") },
  { id: "mfy-3", type: "playlist", title: "Energy Boost", creator: "EarBeatz", coverArt: getImage("album-9") },
  { id: "mfy-4", type: "album", title: "Midnights", creator: "Taylor Swift", coverArt: getImage("album-1") },
  { id: "mfy-5", type: "playlist", title: "Indie Hits", creator: "EarBeatz", coverArt: getImage("album-10") },
  { id: "mfy-6", type: "album", title: "Certified Lover Boy", creator: "Drake", coverArt: getImage("album-4") },
];

export const recentlyPlayed: MusicItem[] = [
  { id: "rp-1", type: "album", title: "WHEN WE ALL FALL ASLEEP, WHERE DO WE GO?", creator: "Billie Eilish", coverArt: getImage("album-3") },
  { id: "rp-2", type: "artist", title: "The Weeknd", creator: "Artist", coverArt: getImage("album-2") },
  { id: "rp-3", type: "playlist", title: "Road Trip", creator: "Alex", coverArt: getImage("album-11") },
  { id: "rp-4", type: "album", title: "Starboy", creator: "The Weeknd", coverArt: getImage("album-6") },
  { id: "rp-5", type: "artist", title: "Taylor Swift", creator: "Artist", coverArt: getImage("album-1") },
  { id: "rp-6", type: "playlist", title: "Late Night Vibes", creator: "Maria", coverArt: getImage("album-12") },
];

export const allMusic: MusicItem[] = [...madeForYou, ...recentlyPlayed];

export const feedPosts: FeedPost[] = [
  {
    id: "post-1",
    user: users[0],
    song: songs[0],
    content: "This new Taylor Swift track is everything! 🚀 Can't stop listening.",
    likes: 128,
    comments: 12,
    timestamp: "2h ago",
  },
  {
    id: "post-2",
    user: users[1],
    song: songs[1],
    content: "The Weeknd never misses. 'After Hours' is a masterpiece.",
    likes: 256,
    comments: 23,
    timestamp: "5h ago",
  },
  {
    id: "post-3",
    user: users[3],
    song: songs[3],
    content: "Powering through my workout with this absolute banger from Drake! 🔥",
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
