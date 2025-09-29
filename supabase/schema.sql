-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Artists Table
CREATE TABLE artists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Albums Table
CREATE TABLE albums (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    artist_id UUID REFERENCES artists(id),
    cover_art_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Songs Table
CREATE TABLE songs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    artist_id UUID REFERENCES artists(id),
    album_id UUID REFERENCES albums(id),
    duration VARCHAR(10),
    song_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Posts Table (Social Feed)
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    song_id UUID REFERENCES songs(id),
    content TEXT,
    likes INT DEFAULT 0,
    comments INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- SEED DATA
-- Note: UUIDs are generated here for consistency between tables.
-- In a real application, you might let the database generate them.

-- Artists
INSERT INTO artists (id, name) VALUES
('a1f8e6c2-1b1a-4c9a-8c1c-9e2b1b2f3c4d', 'Lexin Music'),
('b2e7d5b1-2c2b-5d8b-9d2d-8f1a2b3c4d5e', 'ZakharValaha'),
('c3d6c4a0-3d3c-6e7c-ad3e-7e0b1c2d3e4f', 'Coma-Media'),
('d4c5b39f-4e4d-7f6d-be4f-6d9c0d1e2f3a', 'AlexiAction');

-- Users
INSERT INTO users (id, name, avatar_url) VALUES
('u1a2b3c4-5d6e-7f8a-9b0c-1d2e3f4a5b6c', 'Alex', 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTkxMDU0Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080'),
('u2b3c4d5-6e7f-8a9b-0c1d-2e3f4a5b6c7d', 'Maria', 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBzbWlsaW5nfGVufDB8fHx8fDE3NTkxMjQ2NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'),
('u3c4d5e6-7f8a-9b0c-1d2e-3f4a5b6c7d8e', 'Chris', 'https://images.unsplash.com/photo-1568923637777-4cf6f548fec0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxwZXJzb24lMjBvdXRkb29yfGVufDB8fHx8fDE3NTkxMjU3OTd8MA&ixlib=rb-4.1.0&q=80&w=1080'),
('u4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f', 'Jen', 'https://images.unsplash.com/photo-1586344153246-973c5d0d1141?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwZXJzb24lMjBnbGFzc2VzfGVufDB8fHx8fDE3NTkwMzMzNjAyfDA&ixlib=rb-4.1.0&q=80&w=1080');

-- Albums
INSERT INTO albums (id, title, artist_id, cover_art_url) VALUES
('ab1c2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e', 'The Chill-Out Zone', 'a1f8e6c2-1b1a-4c9a-8c1c-9e2b1b2f3c4d', 'https://images.unsplash.com/photo-1570077533412-664829f85aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxvY2VhbiUyMHdhdmVzfGVufDB8fHx8MTc1OTA1NzE2Nnww&ixlib=rb-4.1.0&q=80&w=1080'),
('bc2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f', 'EDM Hits 2024', 'b2e7d5b1-2c2b-5d8b-9d2d-8f1a2b3c4d5e', 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxuZW9uJTIwY2l0eXxlbnwwfHx8fDE3NTkwNDU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080'),
('cd3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7g', 'Acoustic Mornings', 'c3d6c4a0-3d3c-6e7c-ad3e-7e0b1c2d3e4f', 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxmb3Jlc3QlMjBsYW5kc2NhcGV8ZW58MHx8fHwxNzU5MDY3NDY2fDA&ixlib=rb-4.1.0&q=80&w=1080'),
('de4f5a6b-7c8d-9e0f-1a2b-3c4d5e6f7g8h', 'Synthwave Dreams', 'd4c5b39f-4e4d-7f6d-be4f-6d9c0d1e2f3a', 'https://images.unsplash.com/photo-1514846160150-2cfb150b48ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxyZWNvcmQlMjBwbGF5ZXJ8ZW58MHx8fHwxNzU5MTE3NTAyfDA&ixlib=rb-4.1.0&q=80&w=1080'),
('ef5a6b7c-8d9e-0f1a-2b3c-4d5e6f7g8h9i', 'Lofi Beats', 'a1f8e6c2-1b1a-4c9a-8c1c-9e2b1b2f3c4d', 'https://images.unsplash.com/photo-1605106702842-01a887a31122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxnZW9tZXRyaWMlMjBwYXR0ZXJufGVufDB8fHx8MTc1OTEzOTcwOXww&ixlib=rb-4.1.0&q=80&w=1080'),
('fa6b7c8d-9e0f-1a2b-3c4d-5e6f7g8h9i0j', 'Rock Anthems', 'b2e7d5b1-2c2b-5d8b-9d2d-8f1a2b3c4d5e', 'https://images.unsplash.com/photo-1666528422152-6ea88c6954ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxndWl0YXIlMjBicmlja3xlbnwwfHx8fDE3NTkxMzk3MDl8MA&ixlib=rb-4.1.0&q=80&w=1080');

-- Songs
-- NOTE: song_url for the first two songs point to local files in `public/audio`.
-- You must add your own .mp3 files to that directory for them to work.
-- The rest are remote URLs for demonstration.
INSERT INTO songs (id, title, artist_id, album_id, duration, song_url) VALUES
('s1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6', 'Good Times', 'a1f8e6c2-1b1a-4c9a-8c1c-9e2b1b2f3c4d', 'ab1c2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e', '3:45', '/audio/good-times.mp3'),
('s2c3d4e5-f6a7-b8c9-d0e1-f2a3b4c5d6e7', 'Action Sport', 'b2e7d5b1-2c2b-5d8b-9d2d-8f1a2b3c4d5e', 'bc2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f', '2:10', '/audio/action-sport.mp3'),
('s3d4e5f6-a7b8-c9d0-e1f2-a3b4c5d6e7f8', 'Summer Party', 'c3d6c4a0-3d3c-6e7c-ad3e-7e0b1c2d3e4f', 'cd3e4f5a-6b7c-8d9e-0f1a-2b3c4d5e6f7g', '3:05', 'https://cdn.pixabay.com/audio/2023/05/11/audio_a7e8e6b18a.mp3'),
('s4e5f6a7-b8c9-d0e1-f2a3-b4c5d6e7f8g9', 'Cyberpunk', 'd4c5b39f-4e4d-7f6d-be4f-6d9c0d1e2f3a', 'de4f5a6b-7c8d-9e0f-1a2b-3c4d5e6f7g8h', '4:20', 'https://cdn.pixabay.com/audio/2024/05/23/audio_71b0728741.mp3'),
('s5f6a7b8-c9d0-e1f2-a3b4-c5d6e7f8g9h0', 'Lofi Study', 'a1f8e6c2-1b1a-4c9a-8c1c-9e2b1b2f3c4d', 'ef5a6b7c-8d9e-0f1a-2b3c-4d5e6f7g8h9i', '2:50', 'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf01a.mp3'),
('s6a7b8c9-d0e1-f2a3-b4c5-d6e7f8g9h0i1', 'Powerful Rock', 'b2e7d5b1-2c2b-5d8b-9d2d-8f1a2b3c4d5e', 'fa6b7c8d-9e0f-1a2b-3c4d-5e6f7g8h9i0j', '3:15', 'https://cdn.pixabay.com/audio/2023/07/23/audio_53b2d16a59.mp3'),
('s7b8c9d0-e1f2-a3b4-c5d6-e7f8g9h0i1j2', 'Chill Abstract', 'a1f8e6c2-1b1a-4c9a-8c1c-9e2b1b2f3c4d', 'ab1c2d3e-4f5a-6b7c-8d9e-0f1a2b3c4d5e', '3:22', 'https://cdn.pixabay.com/audio/2022/08/04/audio_2dde64b24c.mp3'),
('s8c9d0e1-f2a3-b4c5-d6e7-f8g9h0i1j2k3', 'Sport Rock', 'b2e7d5b1-2c2b-5d8b-9d2d-8f1a2b3c4d5e', 'bc2d3e4f-5a6b-7c8d-9e0f-1a2b3c4d5e6f', '3:35', 'https://cdn.pixabay.com/audio/2024/02/08/audio_731a896d82.mp3');


-- Posts
INSERT INTO posts (user_id, song_id, content, likes, comments) VALUES
('u1a2b3c4-5d6e-7f8a-9b0c-1d2e3f4a5b6c', 's1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6', 'Loving these chill vibes! Perfect for a relaxed afternoon. ☀️', 128, 12),
('u2b3c4d5-6e7f-8a9b-0c1d-2e3f4a5b6c7d', 's2c3d4e5-f6a7-b8c9-d0e1-f2a3b4c5d6e7', 'This EDM track is fire! 🔥 Getting me hyped for the weekend.', 256, 23),
('u4d5e6f7-8a9b-0c1d-2e3f-4a5b6c7d8e9f', 's4e5f6a7-b8c9-d0e1-f2a3-b4c5d6e7f8g9', 'Driving through the city at night with this synthwave track is a whole mood.', 98, 7),
('u3c4d5e6-7f8a-9b0c-1d2e-3f4a5b6c7d8e', 's6a7b8c9-d0e1-f2a3-b4c5-d6e7f8g9h0i1', 'The perfect rock anthem to power through my workout! 💪', 312, 31);
