'use server';

/**
 * @fileOverview Generates a mood-based playlist based on a selected mood.
 *
 * - generateMoodBasedPlaylist - A function that generates a playlist based on mood.
 * - GenerateMoodBasedPlaylistInput - The input type for the generateMoodBasedPlaylist function.
 * - GenerateMoodBasedPlaylistOutput - The return type for the generateMoodBasedPlaylist function.
 */

import {ai} from '@/ai/genkit';
import { getSongs } from '@/lib/supabase/queries';
import {z} from 'genkit';
import type { Song } from '@/lib/types';

const GenerateMoodBasedPlaylistInputSchema = z.object({
  mood: z
    .string()
    .describe("The desired mood for the playlist (e.g., 'Happy', 'Chill', 'Energetic')."),
  playlistLength: z.number().describe('The desired length of the playlist in number of songs.'),
});
export type GenerateMoodBasedPlaylistInput = z.infer<
  typeof GenerateMoodBasedPlaylistInputSchema
>;

const SongSchema = z.object({
  id: z.string(),
  title: z.string(),
  artist: z.object({
    id: z.string(),
    name: z.string(),
  }),
  album: z.object({
    id: z.string(),
    title: z.string(),
    coverArt: z.object({
      imageUrl: z.string(),
    }),
  }),
  songUrl: z.string(),
  duration: z.string().optional(),
  metadata: z
    .object({
      genre: z.string().optional(),
      mood: z.string().optional(),
      instruments: z.array(z.string()).optional(),
    })
    .optional(),
});


const GenerateMoodBasedPlaylistOutputSchema = z.object({
  playlistDescription: z.string().describe('A description of the generated playlist.'),
  songs: z.array(SongSchema).describe('A list of song objects for the playlist.'),
});
export type GenerateMoodBasedPlaylistOutput = z.infer<
  typeof GenerateMoodBasedPlaylistOutputSchema
>;

export async function generateMoodBasedPlaylist(
  input: GenerateMoodBasedPlaylistInput
): Promise<GenerateMoodBasedPlaylistOutput> {
  return generateMoodBasedPlaylistFlow(input);
}

const getAvailableSongs = ai.defineTool(
  {
    name: 'getAvailableSongs',
    description: 'Get a list of all available songs in the music library.',
    inputSchema: z.object({}),
    outputSchema: z.array(SongSchema),
  },
  async () => {
    const songs = await getSongs();
    return songs;
  }
);


const prompt = ai.definePrompt({
  name: 'generateMoodBasedPlaylistPrompt',
  input: {schema: GenerateMoodBasedPlaylistInputSchema},
  output: {schema: GenerateMoodBasedPlaylistOutputSchema},
  tools: [getAvailableSongs],
  prompt: `You are a playlist generation expert. Your task is to create a playlist based on a user's specified mood and desired length.

You MUST use the 'getAvailableSongs' tool to fetch the list of songs from the user's library.
From this list, you will select songs that perfectly match the requested mood. You CANNOT suggest any song that is not present in the provided list.

Use the genre and mood from the song's metadata to make a better selection.

Mood: {{{mood}}}
Playlist Length: {{{playlistLength}}}

Respond with a creative playlist description, followed by the list of song objects you selected. Ensure the songs you return are the full song objects provided by the tool.`,
});

const generateMoodBasedPlaylistFlow = ai.defineFlow(
  {
    name: 'generateMoodBasedPlaylistFlow',
    inputSchema: GenerateMoodBasedPlaylistInputSchema,
    outputSchema: GenerateMoodBasedPlaylistOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
