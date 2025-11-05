-- Clear existing data
TRUNCATE public.users, public.artists, public.albums, public.songs, public.playlists, public.playlist_songs, public.feed_posts, public.comments, public.likes RESTART IDENTITY CASCADE;

-- Seed Users
INSERT INTO public.users (id, name, email, avatar_url) VALUES
('4b3b3b4b-3b4b-4b3b-4b3b-4b3b3b4b3b4b', 'Alex', 'alex@earbeatz.com', 'https://picsum.photos/seed/101/200'),
('5c4c4c5c-4c5c-5c5c-5c5c-5c4c4c5c4c5c', 'Maria', 'maria@earbeatz.com', 'https://picsum.photos/seed/102/200'),
('6d5d5d6d-5d6d-6d6d-6d6d-6d5d5d6d5d6d', 'Chris', 'chris@earbeatz.com', 'https://picsum.photos/seed/103/200');

-- Seed Artists
INSERT INTO public.artists (id, name) VALUES
('a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'Starlight Cruisers'),
('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', 'Echo Chambers'),
('c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3', 'Neon Bloom');

-- Seed Albums
INSERT INTO public.albums (id, title, artist_id, cover_art_url, release_date) VALUES
('d4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4', 'Galaxy Drifters', 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'https://picsum.photos/seed/201/500', '2023-05-15'),
('e5e5e5e5-e5e5-e5e5-e5e5-e5e5e5e5e5e5', 'Midnight Reflections', 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', 'https://picsum.photos/seed/202/500', '2022-11-20'),
('f6f6f6f6-f6f6-f6f6-f6f6-f6f6f6f6f6f6', 'Electric Dreams', 'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3', 'https://picsum.photos/seed/203/500', '2024-01-30');

-- Seed Songs
INSERT INTO public.songs (id, title, artist_id, album_id, duration_in_seconds, song_url) VALUES
('11111111-1111-1111-1111-111111111111', 'Cosmic Ride', 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'd4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4', 210, 'https://cdn.pixabay.com/audio/2023/05/11/audio_a7e8e6b18a.mp3'),
('22222222-2222-2222-2222-222222222222', 'Stardust', 'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a1a1', 'd4d4d4d4-d4d4-d4d4-d4d4-d4d4d4d4d4d4', 185, 'https://cdn.pixabay.com/audio/2022/08/04/audio_2dde64b24c.mp3'),
('33333333-3333-3333-3333-333333333333', 'Lost in the Echo', 'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b2b2', 'e5e5e5e5-e5e5-e5e5-e5e5-e5e5e5e5e5e5', 240, 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf01a.mp3'),
('44444444-4444-4444-4444-444444444444', 'Future City', 'c3c3c3c3-c3c3-c3c3-c3c3-c3c3c3c3c3c3', 'f6f6f6f6-f6f6-f6f6-f6f6-f6f6f6f6f6f6', 280, 'https://cdn.pixabay.com/audio/2024/05/23/audio_71b0728741.mp3');

-- Seed Playlists
INSERT INTO public.playlists (id, title, description, creator_id, cover_art_url) VALUES
('7a7a7a7a-7a7a-7a7a-7a7a-7a7a7a7a7a7a', 'Chill Vibes', 'Perfect for a relaxed afternoon.', '4b3b3b4b-3b4b-4b3b-4b3b-4b3b3b4b3b4b', 'https://picsum.photos/seed/301/500'),
('8b8b8b8b-8b8b-8b8b-8b8b-8b8b8b8b8b8b', 'Workout Beats', 'High-energy tracks to get you moving.', '5c4c4c5c-4c5c-5c5c-5c5c-5c4c4c5c4c5c', 'https://picsum.photos/seed/302/500');

-- Seed Playlist Songs (linking songs to playlists)
INSERT INTO public.playlist_songs (playlist_id, song_id) VALUES
('7a7a7a7a-7a7a-7a7a-7a7a-7a7a7a7a7a7a', '22222222-2222-2222-2222-222222222222'),
('7a7a7a7a-7a7a-7a7a-7a7a-7a7a7a7a7a7a', '33333333-3333-3333-3333-333333333333'),
('8b8b8b8b-8b8b-8b8b-8b8b-8b8b8b8b8b8b', '11111111-1111-1111-1111-111111111111'),
('8b8b8b8b-8b8b-8b8b-8b8b-8b8b8b8b8b8b', '44444444-4444-4444-4444-444444444444');

-- Seed Feed Posts
INSERT INTO public.feed_posts (id, user_id, song_id, content) VALUES
('feed-1010-1010-1010-101010101010', '4b3b3b4b-3b4b-4b3b-4b3b-4b3b3b4b3b4b', '22222222-2222-2222-2222-222222222222', 'Can''t get enough of this track! So good.'),
('feed-2020-2020-2020-202020202020', '5c4c4c5c-4c5c-5c5c-5c5c-5c4c4c5c4c5c', '44444444-4444-4444-4444-444444444444', 'This is my new anthem!');

-- Seed Comments
INSERT INTO public.comments (id, post_id, user_id, content) VALUES
('comm-1111-1111-1111-111111111111', 'feed-1010-1010-1010-101010101010', '6d5d5d6d-5d6d-6d6d-6d6d-6d5d5d6d5d6d', 'Totally agree! On repeat.'),
('comm-2222-2222-2222-222222222222', 'feed-2020-2020-2020-202020202020', '4b3b3b4b-3b4b-4b3b-4b3b-4b3b3b4b3b4b', 'Yes! Great choice.');

-- Seed Likes
INSERT INTO public.likes (post_id, user_id) VALUES
('feed-1010-1010-1010-101010101010', '5c4c4c5c-4c5c-5c5c-5c5c-5c4c4c5c4c5c'),
('feed-1010-1010-1010-101010101010', '6d5d5d6d-5d6d-6d6d-6d6d-6d5d5d6d5d6d'),
('feed-2020-2020-2020-202020202020', '4b3b3b4b-3b4b-4b3b-4b3b-4b3b3b4b3b4b');
