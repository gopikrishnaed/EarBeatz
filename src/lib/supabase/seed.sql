-- Add a 'metadata' column to the 'songs' table to store JSONB data
ALTER TABLE public.songs
ADD COLUMN IF NOT EXISTS metadata jsonb;

-- Seed Artists
INSERT INTO public.artists (id, name) VALUES
('8a85f675-3929-472b-9705-342a378d3278', 'Lexin Music'),
('4e94a8c9-25f5-460d-b94a-7845780d3a5a', 'ZakharValaha'),
('b0e6a9a7-4b72-468f-9a74-645391d41f3e', 'Coma-Media'),
('d1e4a0e4-2b7e-4b8c-8e4a-5d1b7f8c1b3a', 'AlexiAction')
ON CONFLICT (id) DO NOTHING;

-- Seed Albums
INSERT INTO public.albums (id, title, artist_id, cover_art_url, release_date) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'The Chill-Out Zone', '8a85f675-3929-472b-9705-342a378d3278', 'https://images.unsplash.com/photo-1570077533412-664829f85aed', '2023-01-15'),
('b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'EDM Hits 2024', '4e94a8c9-25f5-460d-b94a-7845780d3a5a', 'https://images.unsplash.com/photo-1709090083073-d130ac28cc19', '2024-02-20'),
('c3d4e5f6-a7b8-9012-3456-7890abcdef23', 'Acoustic Mornings', 'b0e6a9a7-4b72-468f-9a74-645391d41f3e', 'https://images.unsplash.com/photo-1700951372714-98979a8803a4', '2023-05-10'),
('d4e5f6a7-b8c9-0123-4567-890abcdef345', 'Synthwave Dreams', 'd1e4a0e4-2b7e-4b8c-8e4a-5d1b7f8c1b3a', 'https://images.unsplash.com/photo-1519608487953-e999c86e7455', '2023-09-01'),
('e5f6a7b8-c9d0-1234-5678-90abcdef4567', 'Lofi Beats', '8a85f675-3929-472b-9705-342a378d3278', 'https://images.unsplash.com/photo-1500627345056-c0094b32aaf3', '2022-11-25'),
('f6a7b8c9-d0e1-2345-6789-0abcdef56789', 'Rock Anthems', '4e94a8c9-25f5-460d-b94a-7845780d3a5a', 'https://images.unsplash.com/photo-1666528422152-6ea88c6954ba', '2023-03-30')
ON CONFLICT (id) DO NOTHING;

-- Seed Songs with JSONB metadata
INSERT INTO public.songs (id, title, artist_id, album_id, duration_in_seconds, song_url, metadata) VALUES
('s1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Good Times', '8a85f675-3929-472b-9705-342a378d3278', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 225, '/audio/good-times.mp3', 
  '{ "mood": "chill", "instrumentation": ["guitar", "drums", "bass"], "bpm": 90 }'),
('s2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'Action Sport', '4e94a8c9-25f5-460d-b94a-7845780d3a5a', 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', 130, '/audio/action-sport.mp3',
  '{ "mood": "energetic", "genre_tags": ["electronic", "sports"], "bpm": 128 }'),
('s3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8', 'Summer Party', 'b0e6a9a7-4b72-468f-9a74-645391d41f3e', 'c3d4e5f6-a7b8-9012-3456-7890abcdef23', 185, 'https://cdn.pixabay.com/audio/2023/05/11/audio_a7e8e6b18a.mp3',
  '{ "mood": "happy", "instrumentation": ["acoustic guitar", "vocals", "percussion"], "bpm": 120 }'),
('s4d5e6f7-a8b9-c0d1-e2f3-a4b5c6d7e8f9', 'Cyberpunk', 'd1e4a0e4-2b7e-4b8c-8e4a-5d1b7f8c1b3a', 'd4e5f6a7-b8c9-0123-4567-890abcdef345', 260, 'https://cdn.pixabay.com/audio/2024/05/23/audio_71b0728741.mp3',
  '{ "mood": "intense", "genre_tags": ["synthwave", "electronic"], "bpm": 100, "recommended_for": "driving" }')
ON CONFLICT (id) DO NOTHING;

-- Seed Users
INSERT INTO public.users (id, name, email, avatar_url) VALUES
('u1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Alex', 'alex@example.com', 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a'),
('u2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'Maria', 'maria@example.com', 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f'),
('u3c4d5e6-f7a8-b9c0-d1e2-f3a4b5c6d7e8', 'Chris', 'chris@example.com', 'https://images.unsplash.com/photo-1568923637777-4cf6f548fec0')
ON CONFLICT (id) DO NOTHING;

-- Seed Playlists
INSERT INTO public.playlists (id, title, description, creator_id, is_public) VALUES
('p1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Road Trip Mix', 'The perfect soundtrack for a long drive.', 'u1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', true),
('p2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'Workout Fuel', 'High-energy tracks to keep you moving.', 'u2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', true)
ON CONFLICT (id) DO NOTHING;

-- Seed Playlist_Songs (linking songs to playlists)
INSERT INTO public.playlist_songs (playlist_id, song_id) VALUES
('p1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 's4d5e6f7-a8b9-c0d1-e2f3a4b5c6d7e8f9'),
('p1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 's2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7'),
('p2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 's2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7')
ON CONFLICT (playlist_id, song_id) DO NOTHING;

-- Seed Feed_Posts
INSERT INTO public.feed_posts (id, user_id, song_id, content) VALUES
('fp1', 'u1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 's1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Loving these chill vibes! ☀️'),
('fp2', 'u2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 's2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'This EDM track is fire! 🔥')
ON CONFLICT (id) DO NOTHING;

-- Seed Comments
INSERT INTO public.comments (id, post_id, user_id, content) VALUES
('c1', 'fp1', 'u2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7', 'Totally agree!'),
('c2', 'fp2', 'u1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6', 'Getting me hyped for the weekend!')
ON CONFLICT (id) DO NOTHING;

-- Seed Likes
INSERT INTO public.likes (post_id, user_id) VALUES
('fp1', 'u2b3c4d5-e6f7-a8b9-c0d1-e2f3a4b5c6d7'),
('fp1', 'u3c4d5e6-f7a8-b9c0-d1e2f3a4b5c6d7e8'),
('fp2', 'u1a2b3c4-d5e6-f7a8-b9c0-d1e2f3a4b5c6')
ON CONFLICT (post_id, user_id) DO NOTHING;
