-- Seed data for artists
INSERT INTO artists (id, name) VALUES
('a1f2e3d4-b5c6-7890-1234-567890abcdef', 'Lexin Music'),
('b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'ZakharValaha'),
('c3d4e5f6-a7b8-9012-3456-7890abcdef2', 'Coma-Media'),
('d4e5f6a7-b8c9-0123-4567-890abcdef3', 'AlexiAction');

-- Seed data for albums
INSERT INTO albums (id, title, artist_id, cover_art_url) VALUES
('f1e2d3c4-b5a6-7890-1234-567890abcdef', 'The Chill-Out Zone', 'a1f2e3d4-b5c6-7890-1234-567890abcdef', 'https://images.unsplash.com/photo-1570077533412-664829f85aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxvY2VhbiUyMHdhdmVzfGVufDB8fHx8MTc1OTA1NzE2Nnww&ixlib=rb-4.1.0&q=80&w=1080'),
('e2d3c4b5-a6f7-8901-2345-67890abcdef1', 'EDM Hits 2024', 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxuZW9uJTIwY2l0eXxlbnwwfHx8fDE3NTkwNDU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080'),
('d3c4b5a6-f7e8-9012-3456-7890abcdef2', 'Acoustic Mornings', 'c3d4e5f6-a7b8-9012-3456-7890abcdef2', 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxmb3Jlc3QlMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzU5MDY3NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080'),
('c4b5a6f7-e8d9-0123-4567-890abcdef3', 'Synthwave Dreams', 'd4e5f6a7-b8c9-0123-4567-890abcdef3', 'https://images.unsplash.com/photo-1514846160150-2cfb150b48ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxyZWNvcmQlMjBwbGF5ZXJ8ZW58MHx8fHwxNzU5MTE3NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080'),
('b5a6f7e8-d9c0-1234-5678-90abcdef45', 'Lofi Beats', 'a1f2e3d4-b5c6-7890-1234-567890abcdef', 'https://images.unsplash.com/photo-1605106702842-01a887a31122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxnZW9tZXRyaWMlMjBwYXR0ZXJufGVufDB8fHx8MTc1OTEzOTcwOXww&ixlib=rb-4.1.0&q=80&w=1080'),
('a6f7e8d9-c0b1-2345-6789-0abcdef567', 'Rock Anthems', 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'https://images.unsplash.com/photo-1666528422152-6ea88c6954ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxndWl0YXIlMjBicmlja3xlbnwwfHx8fDE3NTkxMzk3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080');

-- Seed data for songs
INSERT INTO songs (id, title, artist_id, album_id, duration, song_url) VALUES
('s1a2b3c4-d5e6-f789-0123-456789abcdef', 'Good Times', 'a1f2e3d4-b5c6-7890-1234-567890abcdef', 'f1e2d3c4-b5a6-7890-1234-567890abcdef', '00:03:45', '/audio/good-times.mp3'),
('s2b3c4d5-e6f7-8901-2345-67890abcdef1', 'Action Sport', 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'e2d3c4b5-a6f7-8901-2345-67890abcdef1', '00:02:10', '/audio/action-sport.mp3'),
('s3c4d5e6-f7g8-9012-3456-7890abcdef2', 'Summer Party', 'c3d4e5f6-a7b8-9012-3456-7890abcdef2', 'd3c4b5a6-f7e8-9012-3456-7890abcdef2', '00:03:05', 'https://cdn.pixabay.com/audio/2023/05/11/audio_a7e8e6b18a.mp3'),
('s4d5e6f7-g8h9-0123-4567-890abcdef3', 'Cyberpunk', 'd4e5f6a7-b8c9-0123-4567-890abcdef3', 'c4b5a6f7-e8d9-0123-4567-890abcdef3', '00:04:20', 'https://cdn.pixabay.com/audio/2024/05/23/audio_71b0728741.mp3'),
('s5e6f7g8-h9i0-1234-5678-90abcdef45', 'Lofi Study', 'a1f2e3d4-b5c6-7890-1234-567890abcdef', 'b5a6f7e8-d9c0-1234-5678-90abcdef45', '00:02:50', 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf01a.mp3'),
('s6f7g8h9-i0j1-2345-6789-0abcdef567', 'Powerful Rock', 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'a6f7e8d9-c0b1-2345-6789-0abcdef567', '00:03:15', 'https://cdn.pixabay.com/audio/2023/07/23/audio_53b2d16a59.mp3'),
('s7g8h9i0-j1k2-3456-7890-1abcdef678', 'Chill Abstract', 'a1f2e3d4-b5c6-7890-1234-567890abcdef', 'f1e2d3c4-b5a6-7890-1234-567890abcdef', '00:03:22', 'https://cdn.pixabay.com/audio/2022/08/04/audio_2dde64b24c.mp3'),
('s8h9i0j1-k2l3-4567-8901-2bcdef7890', 'Sport Rock', 'b2c3d4e5-f6a7-8901-2345-67890abcdef1', 'e2d3c4b5-a6f7-8901-2345-67890abcdef1', '00:03:35', 'https://cdn.pixabay.com/audio/2024/02/08/audio_731a896d82.mp3');

-- Seed data for users
INSERT INTO users (id, name, avatar_url) VALUES
('u1a2b3c4-d5e6-f789-0123-456789abcdef', 'Alex', 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTkxMDU0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080'),
('u2b3c4d5-e6f7-8901-2345-67890abcdef1', 'Maria', 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBzbWlsaW5nfGVufDB8fHx8MTc1OTEyNDY1Nnww&ixlib=rb-4.1.0&q=80&w=1080'),
('u3c4d5e6-f7g8-9012-3456-7890abcdef2', 'Chris', 'https://images.unsplash.com/photo-1568923637777-4cf6f548fec0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwZXJzb24lMjBvdXRkb29yfGVufDB8fHx8MTc1OTEyNTc5N3ww&ixlib=rb-4.1.0&q=80&w=1080'),
('u4d5e6f7-g8h9-0123-4567-890abcdef3', 'Jen', 'https://images.unsplash.com/photo-1586344153246-973c5d0d1141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwZXJzb24lMjBnbGFzc2VzfGVufDB8fHx8MTc1OTAzMzYwMnww&ixlib=rb-4.1.0&q=80&w=1080');

-- Seed data for posts
INSERT INTO posts (user_id, song_id, content, likes, comments, created_at) VALUES
('u1a2b3c4-d5e6-f789-0123-456789abcdef', 's1a2b3c4-d5e6-f789-0123-456789abcdef', 'Loving these chill vibes! Perfect for a relaxed afternoon. ☀️', 128, 12, now() - interval '2 hours'),
('u2b3c4d5-e6f7-8901-2345-67890abcdef1', 's2b3c4d5-e6f7-8901-2345-67890abcdef1', 'This EDM track is fire! 🔥 Getting me hyped for the weekend.', 256, 23, now() - interval '5 hours'),
('u4d5e6f7-g8h9-0123-4567-890abcdef3', 's4d5e6f7-g8h9-0123-4567-890abcdef3', 'Driving through the city at night with this synthwave track is a whole mood.', 98, 7, now() - interval '1 day'),
('u3c4d5e6-f7g8-9012-3456-7890abcdef2', 's6f7g8h9-i0j1-2345-6789-0abcdef567', 'The perfect rock anthem to power through my workout! 💪', 312, 31, now() - interval '2 days');
