-- This script seeds the database with initial data, demonstrating a hybrid relational/document model.
-- It adds a 'metadata' jsonb column to the 'songs' table to store flexible, unstructured data.

-- Step 1: Add a jsonb column to the songs table if it doesn't exist
ALTER TABLE public.songs ADD COLUMN IF NOT EXISTS metadata jsonb;

-- Step 2: Clear existing data to prevent conflicts (optional, useful for re-running the script)
-- Be careful running this in a production environment
DELETE FROM public.playlist_songs;
DELETE FROM public.likes;
DELETE FROM public.comments;
DELETE FROM public.feed_posts;
DELETE FROM public.songs;
DELETE FROM public.albums;
DELETE FROM public.playlists;
DELETE FROM public.artists;
DELETE FROM public.users;

-- Step 3: Insert Artists
-- Using specific UUIDs to maintain relationships across tables.
INSERT INTO public.artists (id, name) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Stellar Echoes'),
('b2c3d4e5-f6a7-8901-2345-678901bcdefa', 'Midnight Bloom'),
('c3d4e5f6-a7b8-9012-3456-789012cdefab', 'Solar Flare');

-- Step 4: Insert Users
INSERT INTO public.users (id, name, email, avatar_url) VALUES
('u1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Alex', 'alex@example.com', 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a'),
('u2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'Maria', 'maria@example.com', 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f'),
('u3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8', 'Chris', 'chris@example.com', 'https://images.unsplash.com/photo-1568923637777-4cf6f548fec0');

-- Step 5: Insert Albums (linked to artists)
INSERT INTO public.albums (id, title, artist_id, cover_art_url, release_date) VALUES
('alb1a2b3-c4d5-e6f7-a8b9-c0d1e2f3a4b5', 'Cosmic Drift', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'https://images.unsplash.com/photo-1659905323699-7d7c8e0328d5', '2023-10-26'),
('alb2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Nightshade', 'b2c3d4e5-f6a7-8901-2345-678901bcdefa', 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6', '2024-02-14');

-- Step 6: Insert Songs (linked to artists and albums, with JSONB metadata)
INSERT INTO public.songs (id, title, artist_id, album_id, duration_in_seconds, song_url, metadata) VALUES
(
  's1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
  'Stardust',
  'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  'alb1a2b3-c4d5-e6f7-a8b9-c0d1e2f3a4b5',
  245,
  '/audio/good-times.mp3',
  '{"genre": "Synthwave", "mood": "Nostalgic", "instruments": ["synthesizer", "drum machine"]}'
),
(
  's2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7',
  'Neon Dreams',
  'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  'alb1a2b3-c4d5-e6f7-a8b9-c0d1e2f3a4b5',
  210,
  '/audio/action-sport.mp3',
  '{"genre": "Synthwave", "mood": "Energetic", "bpm": 120}'
),
(
  's3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8',
  'Moonpetal',
  'b2c3d4e5-f6a7-8901-2345-678901bcdefa',
  'alb2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6',
  185,
  'https://cdn.pixabay.com/audio/2023/05/11/audio_a7e8e6b18a.mp3',
  '{"genre": "Lofi", "mood": "Relaxing", "tags": ["study", "chill"]}'
);

-- Step 7: Insert Playlists (linked to users)
INSERT INTO public.playlists (id, title, description, creator_id, cover_art_url) VALUES
('p1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Late Night Drive', 'Synthwave tracks for a drive through the city.', 'u1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'https://images.unsplash.com/photo-1519608487953-e999c86e7455');

-- Step 8: Insert Songs into Playlists (join table)
INSERT INTO public.playlist_songs (playlist_id, song_id) VALUES
('p1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 's1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6'),
('p1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 's2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7');

-- Step 9: Insert Feed Posts (linked to users and songs)
INSERT INTO public.feed_posts (id, user_id, song_id, content) VALUES
('fp1a2b3c-d4e5-f6a7-b8c9-d0e1f2a3b4c5', 'u1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 's1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Loving these chill vibes! Perfect for a relaxed afternoon. ☀️'),
('fp2b3c4d-e5f6-a7b8-c9d0-e1f2a3b4c5d6', 'u2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 's2b3c4d5-e6f7-a8b9-c0d1e2f3a4b5c6d7', 'This track is fire! 🔥 Getting me hyped for the weekend.');

-- Step 10: Insert Likes and Comments (linked to posts and users)
INSERT INTO public.likes (post_id, user_id) VALUES
('fp1a2b3c-d4e5-f6a7-b8c9-d0e1f2a3b4c5', 'u2b3c4d5-e6f7-a8b9-c0d1e2f3a4b5c6d7'),
('fp1a2b3c-d4e5-f6a7-b8c9-d0e1f2a3b4c5', 'u3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8');

INSERT INTO public.comments (post_id, user_id, content) VALUES
('fp1a2b3c-d4e5-f6a7-b8c9-d0e1f2a3b4c5', 'u2b3c4d5-e6f7-a8b9-c0d1d1-e2f3a4b5c6d7', 'Totally agree! Added to my playlist.');

-- End of script
