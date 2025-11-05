-- Clear existing data in reverse order of creation due to foreign key constraints.
DELETE FROM public.playlist_songs;
DELETE FROM public.likes;
DELETE FROM public.comments;
DELETE FROM public.feed_posts;
DELETE FROM public.songs;
DELETE FROM public.playlists;
DELETE FROM public.albums;
DELETE FROM public.artists;
DELETE FROM public.users;

-- Add a jsonb column to the songs table if it doesn't exist, to support the hybrid model.
ALTER TABLE public.songs ADD COLUMN IF NOT EXISTS metadata jsonb;

-- Insert sample data
-- Note: UUIDs are hardcoded to ensure relationships between tables are maintained.

-- Users
INSERT INTO public.users (id, name, email, avatar_url) VALUES
('1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'Alex', 'alex@example.com', 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a'),
('2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'Maria', 'maria@example.com', 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f'),
('3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f', 'Chris', 'chris@example.com', 'https://images.unsplash.com/photo-1568923637777-4cf6f548fec0');

-- Artists
INSERT INTO public.artists (id, name) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Starlight Echoes'),
('b2c3d4e5-f6a7-8901-2345-678901bcdefa', 'Midnight Bloom'),
('c3d4e5f6-a7b8-9012-3456-789012cdefab', 'Neon Nomad');

-- Albums
INSERT INTO public.albums (id, title, artist_id, cover_art_url, release_date) VALUES
('1a2b3c4d-5e6f-7a8b-9c0d-e2f3a4b5c6d1', 'Galactic Tides', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'https://images.unsplash.com/photo-1659905323699-7d7c8e0328d5', '2023-05-15'),
('2b3c4d5e-6f7a-8b9c-0d1e-f3a4b5c6d7e2', 'City of Dreams', 'b2c3d4e5-f6a7-8901-2345-678901bcdefa', 'https://images.unsplash.com/photo-1519608487953-e999c86e7455', '2024-01-20'),
('3c4d5e6f-7a8b-9c0d-1e2f-a4b5c6d7e8f3', 'Forest Hymns', 'c3d4e5f6-a7b8-9012-3456-789012cdefab', 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6', '2023-11-01');

-- Songs with JSONB metadata
INSERT INTO public.songs (id, title, artist_id, album_id, duration_in_seconds, song_url, metadata) VALUES
('1a2b3c4d-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Stardust', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', '1a2b3c4d-5e6f-7a8b-9c0d-e2f3a4b5c6d1', 245, '/audio/good-times.mp3', '{"genre": "Synthwave", "mood": "Nostalgic", "instruments": ["synthesizer", "drum machine"]}'),
('2b3c4d5e-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'Neon Nights', 'b2c3d4e5-f6a7-8901-2345-678901bcdefa', '2b3c4d5e-6f7a-8b9c-0d1e-f3a4b5c6d7e2', 190, '/audio/action-sport.mp3', '{"genre": "Pop", "mood": "Energetic", "instruments": ["vocals", "bass", "synth"]}'),
('3c4d5e6f-f7a8-b9c0-d1e2-f3a4b5c6d7e8', 'Whispering Pines', 'c3d4e5f6-a7b8-9012-3456-789012cdefab', '3c4d5e6f-7a8b-9c0d-1e2f-a4b5c6d7e8f3', 210, 'https://cdn.pixabay.com/audio/2022/08/04/audio_2dde64b24c.mp3', '{"genre": "Acoustic", "mood": "Calm", "instruments": ["acoustic guitar", "piano"]}');

-- Playlists
INSERT INTO public.playlists (id, title, description, creator_id, cover_art_url) VALUES
('1a2b3c4d-5e6f-7a8b-9c0d-d1e2f3a4b5c1', 'Chill Vibes', 'Perfect for a relaxed afternoon.', '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', 'https://images.unsplash.com/photo-1570077533412-664829f85aed'),
('2b3c4d5e-6f7a-8b9c-0d1e-e2f3a4b5c6d2', 'Workout Fuel', 'High-energy tracks to keep you going.', '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'https://images.unsplash.com/photo-1709090083073-d130ac28cc19');

-- Playlist Songs junction table
INSERT INTO public.playlist_songs (playlist_id, song_id) VALUES
('1a2b3c4d-5e6f-7a8b-9c0d-d1e2f3a4b5c1', '3c4d5e6f-f7a8-b9c0-d1e2-f3a4b5c6d7e8'),
('1a2b3c4d-5e6f-7a8b-9c0d-d1e2f3a4b5c1', '1a2b3c4d-d5e6-f7a8-b9c0-d1e2f3a4b5c6'),
('2b3c4d5e-6f7a-8b9c-0d1e-e2f3a4b5c6d2', '2b3c4d5e-e6f7-a8b9-c0d1-e2f3a4b5c6d7');

-- Feed Posts
INSERT INTO public.feed_posts (id, user_id, song_id, content) VALUES
('1a2b3c4d-5e6f-7a8b-9c0d-f3a4b5c6d7e8', '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d', '1a2b3c4d-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Loving these synthwave vibes!'),
('2b3c4d5e-6f7a-8b9c-0d1e-a4b5c6d7e8f9', '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', '2b3c4d5e-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'This song is my new anthem!');

-- Comments
INSERT INTO public.comments (id, post_id, user_id, content) VALUES
('1a2b3c4d-5e6f-7a8b-9c0d-b5c6d7e8f9a0', '1a2b3c4d-5e6f-7a8b-9c0d-f3a4b5c6d7e8', '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e', 'Totally agree! Such a classic sound.');

-- Likes
INSERT INTO public.likes (post_id, user_id) VALUES
('1a2b3c4d-5e6f-7a8b-9c0d-f3a4b5c6d7e8', '2b3c4d5e-6f7a-8b9c-0d1e-2f3a4b5c6d7e'),
('1a2b3c4d-5e6f-7a8b-9c0d-f3a4b5c6d7e8', '3c4d5e6f-7a8b-9c0d-1e2f-3a4b5c6d7e8f'),
('2b3c4d5e-6f7a-8b9c-0d1e-a4b5c6d7e8f9', '1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d');
