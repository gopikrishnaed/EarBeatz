-- Seed data for the users table
INSERT INTO users (id, name, avatar_url) VALUES
('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'Alex', 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTkxMDU0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080'),
('6b2b4b9e-6b1a-4b9e-8b1a-6b2b4b9e6b1a', 'Maria', 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBzbWlsaW5nfGVufDB8fHx8MTc1OTEyNDY1Nnww&ixlib=rb-4.1.0&q=80&w=1080'),
('c4b1b3b1-4b1b-4b1b-4b1b-c4b1b3b14b1b', 'Chris', 'https://images.unsplash.com/photo-1568923637777-4cf6f548fec0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwZXJzb24lMjBvdXRkb29yfGVufDB8fHx8MTc1OTEyNTc5N3ww&ixlib=rb-4.1.0&q=80&w=1080'),
('d4b1b3b1-4b1b-4b1b-4b1b-d4b1b3b14b1b', 'Jen', 'https://images.unsplash.com/photo-1586344153246-973c5d0d1141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwZXJzb24lMjBnbGFzc2VzfGVufDB8fHx8MTc1OTAzMzYwMnww&ixlib=rb-4.1.0&q=80&w=1080');

-- Seed data for the artists table
INSERT INTO artists (id, name) VALUES
('a1b2c3d4-e5f6-47b8-9012-34567890abcd', 'Lexin Music'),
('b2c3d4e5-f6a7-4890-1234-567890abcde1', 'ZakharValaha'),
('c3d4e5f6-a7b8-4012-3456-7890abcdef23', 'Coma-Media'),
('d4e5f6a7-b890-4234-5678-90abcdef3456', 'AlexiAction');

-- Seed data for the albums table
INSERT INTO albums (id, title, artist_id, cover_art_url) VALUES
('11a2b3c4-d5e6-47f8-9012-34567890abcd', 'The Chill-Out Zone', 'a1b2c3d4-e5f6-47b8-9012-34567890abcd', 'https://images.unsplash.com/photo-1570077533412-664829f85aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxvY2VhbiUyMHdhdmVzfGVufDB8fHx8MTc1OTA1NzE2Nnww&ixlib=rb-4.1.0&q=80&w=1080'),
('22b3c4d5-e6f7-48a9-0123-4567890abcde', 'EDM Hits 2024', 'b2c3d4e5-f6a7-4890-1234-567890abcde1', 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxuZW9uJTIwY2l0eXxlbnwwfHx8fDE3NTkwNDU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080'),
('33c4d5e6-f7a8-49b0-1234-567890abcdef', 'Acoustic Mornings', 'c3d4e5f6-a7b8-4012-3456-7890abcdef23', 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxmb3Jlc3QlMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzU5MDY3NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080'),
('44d5e6f7-a8b9-40c1-2345-67890abcdef0', 'Synthwave Dreams', 'd4e5f6a7-b890-4234-5678-90abcdef3456', 'https://images.unsplash.com/photo-1659905323699-7d7c8e0328d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxhYnN0cmFjdCUyMGNvbG9yZnVsfGVufDB8fHx8MTc1OTA2NzgyM3ww&ixlib=rb-4.1.0&q=80&w=1080'),
('55e6f7a8-b9c0-41d2-3456-7890abcdef01', 'Lofi Beats', 'a1b2c3d4-e5f6-47b8-9012-34567890abcd', 'https://images.unsplash.com/photo-1605106702842-01a887a31122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxnZW9tZXRyaWMlMjBwYXR0ZXJufGVufDB8fHx8MTc1OTEzOTcwOXww&ixlib=rb-4.1.0&q=80&w=1080'),
('66f7a8b9-c0d1-42e3-4567-890abcdef012', 'Rock Anthems', 'b2c3d4e5-f6a7-4890-1234-567890abcde1', 'https://images.unsplash.com/photo-1666528422152-6ea88c6954ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxndWl0YXIlMjBicmlja3xlbnwwfHx8fDE3NTkxMzk3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080');

-- Seed data for the songs table
INSERT INTO songs (id, title, artist_id, album_id, duration, song_url) VALUES
('a2b3c4d5-e6f7-48a9-0123-4567890abcde', 'Good Times', 'a1b2c3d4-e5f6-47b8-9012-34567890abcd', '11a2b3c4-d5e6-47f8-9012-34567890abcd', '3:45', 'https://cdn.pixabay.com/audio/2022/08/04/audio_2dde64b24c.mp3'),
('b3c4d5e6-f7a8-49b0-1234-567890abcdef', 'Action Sport', 'b2c3d4e5-f6a7-4890-1234-567890abcde1', '22b3c4d5-e6f7-48a9-0123-4567890abcde', '2:10', 'https://cdn.pixabay.com/audio/2024/02/08/audio_731a896d82.mp3'),
('c4d5e6f7-a8b9-40c1-2345-67890abcdef0', 'Summer Party', 'c3d4e5f6-a7b8-4012-3456-7890abcdef23', '33c4d5e6-f7a8-49b0-1234-567890abcdef', '3:05', 'https://cdn.pixabay.com/audio/2023/05/11/audio_a7e8e6b18a.mp3'),
('d5e6f7a8-b9c0-41d2-3456-7890abcdef01', 'Cyberpunk', 'd4e5f6a7-b890-4234-5678-90abcdef3456', '44d5e6f7-a8b9-40c1-2345-67890abcdef0', '4:20', 'https://cdn.pixabay.com/audio/2024/05/23/audio_71b0728741.mp3'),
('e6f7a8b9-c0d1-42e3-4567-890abcdef012', 'Lofi Study', 'a1b2c3d4-e5f6-47b8-9012-34567890abcd', '55e6f7a8-b9c0-41d2-3456-7890abcdef01', '2:50', 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf01a.mp3'),
('f7a8b9c0-d1e2-43f4-5678-90abcdef0123', 'Powerful Rock', 'b2c3d4e5-f6a7-4890-1234-567890abcde1', '66f7a8b9-c0d1-42e3-4567-890abcdef012', '3:15', 'https://cdn.pixabay.com/audio/2023/07/23/audio_53b2d16a59.mp3'),
('08b9c0d1-e2f3-4405-6789-0abcdef01234', 'Chill Abstract', 'a1b2c3d4-e5f6-47b8-9012-34567890abcd', '11a2b3c4-d5e6-47f8-9012-34567890abcd', '3:22', 'https://cdn.pixabay.com/audio/2022/08/04/audio_2dde64b24c.mp3'),
('19c0d1e2-f3a4-4516-7890-bcdef0123456', 'Sport Rock', 'b2c3d4e5-f6a7-4890-1234-567890abcde1', '22b3c4d5-e6f7-48a9-0123-4567890abcde', '3:35', 'https://cdn.pixabay.com/audio/2024/02/08/audio_731a896d82.mp3');

-- Seed data for the posts table
INSERT INTO posts (id, user_id, song_id, content, likes, comments) VALUES
('fedcba98-7654-4321-8765-432109876543', '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'a2b3c4d5-e6f7-48a9-0123-4567890abcde', 'Loving these chill vibes! Perfect for a relaxed afternoon. ☀️', 128, 12),
('edcba987-6543-4210-9876-543210987654', '6b2b4b9e-6b1a-4b9e-8b1a-6b2b4b9e6b1a', 'b3c4d5e6-f7a8-49b0-1234-567890abcdef', 'This EDM track is fire! 🔥 Getting me hyped for the weekend.', 256, 23),
('dcba9876-5432-4109-8765-432109876543', 'd4b1b3b1-4b1b-4b1b-4b1b-d4b1b3b14b1b', 'd5e6f7a8-b9c0-41d2-3456-7890abcdef01', 'Driving through the city at night with this synthwave track is a whole mood.', 98, 7),
('cba98765-4321-4098-7654-321098765432', 'c4b1b3b1-4b1b-4b1b-4b1b-c4b1b3b14b1b', 'f7a8b9c0-d1e2-43f4-5678-90abcdef0123', 'The perfect rock anthem to power through my workout! 💪', 312, 31);
