-- This file demonstrates how to modify (UPDATE) JSONB data in your PostgreSQL table.
-- You can run these commands in your Supabase SQL Editor to see the effects.

-- Example 1: Update an existing value inside the JSONB object.
-- This changes the 'mood' for the song 'Stardust' from 'Nostalgic' to 'Dreamy'.
UPDATE public.songs
SET metadata = jsonb_set(
  metadata,
  '{mood}',
  '"Dreamy"'::jsonb
)
WHERE title = 'Stardust';


-- Example 2: Add a new key-value pair to a JSONB object.
-- This adds a "vibe" key to the song 'Neon Nights'.
UPDATE public.songs
SET metadata = metadata || '{"vibe": "futuristic"}'::jsonb
WHERE title = 'Neon Nights';


-- After running these, you can verify the changes with a SELECT query:
-- SELECT title, metadata FROM public.songs;
