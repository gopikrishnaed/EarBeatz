"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  generateMoodBasedPlaylist,
  type GenerateMoodBasedPlaylistOutput,
} from "@/ai/flows/generate-mood-based-playlist";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ListMusic, Loader2, Music, ServerCrash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  mood: z.string().min(1, "Please select a mood."),
  playlistLength: z.coerce.number().min(5, "Must be at least 5 songs.").max(20, "Must be 20 songs or less."),
});

type FormValues = z.infer<typeof formSchema>;

const moods = ["Happy", "Chill", "Energetic", "Melancholic", "Upbeat", "Focused", "Romantic"];

export function PlaylistGenerator() {
  const [playlist, setPlaylist] = useState<GenerateMoodBasedPlaylistOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: "",
      playlistLength: 10,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setPlaylist(null);
    try {
      const result = await generateMoodBasedPlaylist(values);
      setPlaylist(result);
    } catch (error) {
      console.error("Failed to generate playlist:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating your playlist. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Playlist Details</CardTitle>
          <CardDescription>
            Select a mood and how many songs you want.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="mood"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mood</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a mood" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {moods.map((mood) => (
                          <SelectItem key={mood} value={mood}>
                            {mood}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="playlistLength"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Songs</FormLabel>
                    <FormControl>
                      <Input type="number" min="5" max="20" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && (
         <Card className="mt-6 text-center">
            <CardContent className="p-10">
                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium">Crafting your playlist...</p>
                <p className="text-muted-foreground">The AI is picking the perfect tracks.</p>
            </CardContent>
         </Card>
      )}

      {playlist && (
        <Card className="mt-6">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ListMusic className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>{form.getValues("mood")} Playlist</CardTitle>
                <CardDescription>{playlist.playlistDescription}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {playlist.songs.map((song, index) => (
                <li key={index} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50">
                  <Music className="w-4 h-4 text-muted-foreground" />
                  <span>{song}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </>
  );
}
