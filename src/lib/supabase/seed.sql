-- This script seeds the database with sample data for the EarBeatz app.
-- It follows a hybrid model, using relational data and jsonb for flexible metadata.

-- Step 1: Add a jsonb column to the songs table for unstructured metadata.
ALTER TABLE public.songs ADD COLUMN IF NOT EXISTS metadata jsonb;

-- Clear existing data to avoid conflicts
DELETE FROM public.playlist_songs;
DELETE FROM public.likes;
DELETE FROM public.comments;
DELETE FROM public.feed_posts;
DELETE FROM public.songs;
DELETE FROM public.playlists;
DELETE FROM public.albums;
DELETE FROM public.artists;
DELETE FROM public.users;


-- Step 2: Insert data into the tables.
-- The order is important to respect foreign key constraints.

-- public.users
INSERT INTO public.users (id, name, email, avatar_url) VALUES
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'Alex', 'alex@example.com', 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a'),
('2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d1e', 'Maria', 'maria@example.com', 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d1e2f', 'Chris', 'chris@example.com', 'https://images.unsplash.com/photo-1568923637777-4cf6f548fec0');

-- public.artists
INSERT INTO public.artists (id, name) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Stellar Wave'),
('b2c3d4e5-f6a7-8901-2345-678901bcdefa', 'Midnight Bloom'),
('c3d4e5f6-a7b8-9012-3456-789012cdefab', 'Neon Specter');

-- public.albums
INSERT INTO public.albums (id, title, artist_id, cover_art_url, release_date) VALUES
('a1b1a2b3-c4d5-e6f7-a8b9-c0d1e2f3a4b5', 'Cosmic Drift', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'https://images.unsplash.com/photo-1659905323699-7d7c8e0328d5', '2023-05-15'),
('b1c1d2e3-f4a5-b6c7-d8e9-f0a1b2c3d4e5', 'City Lights', 'b2c3d4e5-f6a7-8901-2345-678901bcdefa', 'https://images.unsplash.com/photo-1519608487953-e999c86e7455', '2024-01-20');

-- public.songs with jsonb metadata
INSERT INTO public.songs (id, title, artist_id, album_id, duration_in_seconds, song_url, metadata) VALUES
(
  's1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
  'Stardust',
  'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  'a1b1a2b3-c4d5-e6f7-a8b9-c0d1e2f3a4b5',
  245,
  '/audio/good-times.mp3',
  '{"genre": "Synthwave", "mood": "Nostalgic", "instruments": ["synthesizer", "drum machine"]}'
),
(
  's2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7',
  'First Light',
  'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  'a1b1a2b3-c4d5-e6f7-a8b9-c0d1e2f3a4b5',
  210,
  '/audio/action-sport.mp3',
  '{"genre": "Synthwave", "mood": "Hopeful", "instruments": ["synthesizer", "electric guitar"]}'
),
(
  's3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8',
  'Night Drive',
  'b2c3d4e5-f6a7-8901-2345-678901bcdefa',
  'b1c1d2e3-f4a5-b6c7-d8e9-f0a1b2c3d4e5',
  185,
  'https://cdn.pixabay.com/audio/2023/05/11/audio_a7e8e6b18a.mp3',
  '{"genre": "Lofi", "mood": "Chill", "tags": ["relax", "study", "evening"], "bpm": 85}'
);

-- public.playlists
INSERT INTO public.playlists (id, title, description, creator_id, cover_art_url) VALUES
(
  'p1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
  'Late Night Drive',
  'Synthwave and Lofi beats for cruising through the city.',
  '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
  'https://images.unsplash.com/photo-1700951372714-98979a8803a4'
),
(
  'p2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7',
  'Focus Zone',
  'Instrumental tracks to help you concentrate.',
  '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d1e',
  'https://images.unsplash.com/photo-1500627345056-c0094b32aaf3'
);

-- public.playlist_songs (linking songs to playlists)
INSERT INTO public.playlist_songs (playlist_id, song_id) VALUES
('p1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 's1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6'),
('p1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 's3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8'),
('p2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 's2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7');

-- public.feed_posts
INSERT INTO public.feed_posts (id, user_id, song_id, content) VALUES
(
  'f1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
  '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d',
  's1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
  'This track is a journey! Perfect for a late-night drive.'
),
(
  'f2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7',
  '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d1e',
  's3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8',
  'Can''t get enough of these chill lofi vibes. So relaxing.'
);

-- public.comments
INSERT INTO public.comments (id, post_id, user_id, content) VALUES
(
  'c1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
  'f1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
  '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d1e2f',
  'Totally agree! Added to my playlist.'
);

-- public.likes
INSERT INTO public.likes (post_id, user_id) VALUES
('f1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d1e'),
('f1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d1e2f'),
('f2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d');
