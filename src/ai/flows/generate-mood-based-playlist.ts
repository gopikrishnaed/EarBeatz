'use server';

/**
 * @fileOverview Generates a mood-based playlist based on a selected mood.
 *
 * - generateMoodBasedPlaylist - A function that generates a playlist based on mood.
 * - GenerateMoodBasedPlaylistInput - The input type for the generateMoodBasedPlaylist function.
 * - GenerateMoodBasedPlaylistOutput - The return type for the generateMoodBasedPlaylist function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMoodBasedPlaylistInputSchema = z.object({
  mood: z
    .string()
    .describe("The desired mood for the playlist (e.g., 'Happy', 'Chill', 'Energetic')."),
  playlistLength: z.number().describe('The desired length of the playlist in number of songs.'),
});
export type GenerateMoodBasedPlaylistInput = z.infer<
  typeof GenerateMoodBasedPlaylistInputSchema
>;

const GenerateMoodBasedPlaylistOutputSchema = z.object({
  playlistDescription: z.string().describe('A description of the generated playlist.'),
  songs: z.array(z.string()).describe('A list of song titles for the playlist.'),
});
export type GenerateMoodBasedPlaylistOutput = z.infer<
  typeof GenerateMoodBasedPlaylistOutputSchema
>;

export async function generateMoodBasedPlaylist(
  input: GenerateMoodBasedPlaylistInput
): Promise<GenerateMoodBasedPlaylistOutput> {
  return generateMoodBasedPlaylistFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMoodBasedPlaylistPrompt',
  input: {schema: GenerateMoodBasedPlaylistInputSchema},
  output: {schema: GenerateMoodBasedPlaylistOutputSchema},
  prompt: `You are a playlist generation expert. You will be provided a mood and a desired playlist length and you will respond with a playlist consisting of song names that fit the mood.

Mood: {{{mood}}}
Playlist Length: {{{playlistLength}}}

Respond with a playlist description, followed by a list of songs.`,
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
