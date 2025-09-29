-- Seed data for artists
INSERT INTO artists (id, name) VALUES
('1a9a71f2-3d4a-4a8d-b6a8-4f8a7b3a4b9c', 'Lexin Music'),
('2b9b82f3-4e5b-5b9e-c7b9-5g9b8c4b5c0d', 'ZakharValaha'),
('3c0c93f4-5f6c-6c0f-d8ca-6h0c9d5c6d1e', 'Coma-Media'),
('4d1d04f5-6g7d-7d1g-e9db-7i1d0e6d7e2f', 'AlexiAction');

-- Seed data for users
INSERT INTO users (id, name, avatar_url, avatar_hint) VALUES
('5e2e15f6-7h8e-8e2h-f0ec-8j2e1f7e8f3g', 'Alex', 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTkxMDU0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080', 'person portrait'),
('6f3f26f7-8i9f-9f3i-g1fd-9k3f2g8f9g4h', 'Maria', 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBzbWlsaW5nfGVufDB8fHx8fDE3NTkxMjQ2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080', 'person smiling'),
('7g4g37f8-9j0g-0g4j-h2ge-0l4g3h9g0h5i', 'Chris', 'https://images.unsplash.com/photo-1568923637777-4cf6f548fec0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwZXJzb24lMjBvdXRkb29yfGVufDB8fHx8fDE3NTkxMjU3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080', 'person outdoor'),
('8h5h48f9-0k1h-1h5k-i3hf-1m5h4i0h1i6j', 'Jen', 'https://images.unsplash.com/photo-1586344153246-973c5d0d1141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwZXJzb24lMjBnbGFzc2VzfGVufDB8fHx8fDE3NTkwMzMzNjAyfDA&ixlib=rb-4.1.0&q=80&w=1080', 'person glasses');

-- Seed data for albums
INSERT INTO albums (id, title, artist_id, cover_art_url, cover_art_hint) VALUES
('9i6i59g0-1l2i-2i6l-j4ig-2n6i5j1i2j7k', 'The Chill-Out Zone', '1a9a71f2-3d4a-4a8d-b6a8-4f8a7b3a4b9c', 'https://images.unsplash.com/photo-1570077533412-664829f85aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxvY2VhbiUyMHdhdmVzfGVufDB8fHx8MTc1OTA1NzE2Nnww&ixlib=rb-4.1.0&q=80&w=1080', 'ocean waves'),
('0j7j60h1-2m3j-3j7m-k5jh-3o7j6k2j3k8l', 'EDM Hits 2024', '2b9b82f3-4e5b-5b9e-c7b9-5g9b8c4b5c0d', 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxuZW9uJTIwY2l0eXxlbnwwfHx8fDE3NTkwNDU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080', 'neon city'),
('1k8k71i2-3n4k-4k8n-l6ki-4p8k7l3k4l9m', 'Acoustic Mornings', '3c0c93f4-5f6c-6c0f-d8ca-6h0c9d5c6d1e', 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxmb3Jlc3QlMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzU5MDY3NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080', 'forest landscape'),
('2l9l82j3-4o5l-5l9o-m7lj-5q9l8m4l5m0n', 'Synthwave Dreams', '4d1d04f5-6g7d-7d1g-e9db-7i1d0e6d7e2f', 'https://images.unsplash.com/photo-1514846160150-2cfb150b48ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxyZWNvcmQlMjBwbGF5ZXJ8ZW58MHx8fHwxNzU5MTE3NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080', 'record player'),
('3m0m93k4-5p6m-6m0p-n8mk-6r0m9n5m6n1o', 'Lofi Beats', '1a9a71f2-3d4a-4a8d-b6a8-4f8a7b3a4b9c', 'https://images.unsplash.com/photo-1605106702842-01a887a31122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxnZW9tZXRyaWMlMjBwYXR0ZXJufGVufDB8fHx8MTc1OTEzOTcwOXww&ixlib=rb-4.1.0&q=80&w=1080', 'geometric pattern'),
('4n1n04l5-6q7n-7n1q-o9nl-7s1n0o6n7o2p', 'Rock Anthems', '2b9b82f3-4e5b-5b9e-c7b9-5g9b8c4b5c0d', 'https://images.unsplash.com/photo-1666528422152-6ea88c6954ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxndWl0YXIlMjBicmlja3xlbnwwfHx8fDE3NTkxMzk3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080', 'guitar brick');

-- Seed data for songs
INSERT INTO songs (id, title, artist_id, album_id, duration, song_url) VALUES
('a1b2c3d4-e5f6-4a1b-ac3d-4e5f6a1b2c3d', 'Good Times', '1a9a71f2-3d4a-4a8d-b6a8-4f8a7b3a4b9c', '9i6i59g0-1l2i-2i6l-j4ig-2n6i5j1i2j7k', '3:45', '/audio/good-times.mp3'),
('b2c3d4e5-f6a7-4b2c-bd4e-5f6a7b2c3d4e', 'Action Sport', '2b9b82f3-4e5b-5b9e-c7b9-5g9b8c4b5c0d', '0j7j60h1-2m3j-3j7m-k5jh-3o7j6k2j3k8l', '2:10', '/audio/action-sport.mp3'),
('c3d4e5f6-a7b8-4c3d-ce5f-6a7b8c3d4e5f', 'Summer Party', '3c0c93f4-5f6c-6c0f-d8ca-6h0c9d5c6d1e', '1k8k71i2-3n4k-4k8n-l6ki-4p8k7l3k4l9m', '3:05', 'https://cdn.pixabay.com/audio/2023/05/11/audio_a7e8e6b18a.mp3'),
('d4e5f6a7-b8c9-4d4e-df6a-7b8c9d4e5f6a', 'Cyberpunk', '4d1d04f5-6g7d-7d1g-e9db-7i1d0e6d7e2f', '2l9l82j3-4o5l-5l9o-m7lj-5q9l8m4l5m0n', '4:20', 'https://cdn.pixabay.com/audio/2024/05/23/audio_71b0728741.mp3'),
('e5f6a7b8-c9d0-4e5f-eg7b-8c9d0e5f6a7b', 'Lofi Study', '1a9a71f2-3d4a-4a8d-b6a8-4f8a7b3a4b9c', '3m0m93k4-5p6m-6m0p-n8mk-6r0m9n5m6n1o', '2:50', 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf01a.mp3'),
('f6a7b8c9-d0e1-4f6a-fh8c-9d0e1f6a7b8c', 'Powerful Rock', '2b9b82f3-4e5b-5b9e-c7b9-5g9b8c4b5c0d', '4n1n04l5-6q7n-7n1q-o9nl-7s1n0o6n7o2p', '3:15', 'https://cdn.pixabay.com/audio/2023/07/23/audio_53b2d16a59.mp3');

-- Seed data for posts
INSERT INTO posts (id, user_id, song_id, content, likes, comments) VALUES
('g7b8c9d0-e1f2-4g7b-gi9d-0e1f2g7b8c9d', '5e2e15f6-7h8e-8e2h-f0ec-8j2e1f7e8f3g', 'a1b2c3d4-e5f6-4a1b-ac3d-4e5f6a1b2c3d', 'Loving these chill vibes! Perfect for a relaxed afternoon. ☀️', 128, 12),
('h8c9d0e1-f2g3-4h8c-hj0e-1f2g3h8c9d0e', '6f3f26f7-8i9f-9f3i-g1fd-9k3f2g8f9g4h', 'b2c3d4e5-f6a7-4b2c-bd4e-5f6a7b2c3d4e', 'This EDM track is fire! 🔥 Getting me hyped for the weekend.', 256, 23),
('i9d0e1f2-g3h4-4i9d-ik1f-2g3h4i9d0e1f', '8h5h48f9-0k1h-1h5k-i3hf-1m5h4i0h1i6j', 'd4e5f6a7-b8c9-4d4e-df6a-7b8c9d4e5f6a', 'Driving through the city at night with this synthwave track is a whole mood.', 98, 7),
('j0e1f2g3-h4i5-4j0e-jl2g-3h4i5j0e1f2g', '7g4g37f8-9j0g-0g4j-h2ge-0l4g3h9g0h5i', 'f6a7b8c9-d0e1-4f6a-fh8c-9d0e1f6a7b8c', 'The perfect rock anthem to power through my workout! 💪', 312, 31);

    