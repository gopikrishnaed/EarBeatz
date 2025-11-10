
"use client";

import Image from "next/image";
import type { FeedPost } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Heart, MessageCircle, Play, Share2 } from "lucide-react";
import { useMusicPlayer } from "@/context/music-player-context";

export function FeedPostCard({ post }: { post: FeedPost }) {
  const { playSong } = useMusicPlayer();

  // Defensive check in case of unexpected data shape
  if (!post || !post.user || !post.song) {
    return null;
  }

  const handlePlay = () => {
    // The playlist for a single song from the feed is just the song itself.
    playSong(post.song, [post.song]);
  };

  return (
    <Card className="bg-card/60">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={post.user.avatar?.imageUrl} alt={post.user.name} />
            <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.user.name}</p>
            <p className="text-sm text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{post.content}</p>
        <div className="group relative flex items-center gap-4 rounded-lg border p-3 bg-background/50">
          <div className="relative">
            <Image
              src={post.song.coverArt.imageUrl || `https://picsum.photos/seed/${post.song.id}/64/64`}
              alt={post.song.title}
              width={64}
              height={64}
              className="rounded-md object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute inset-0 h-full w-full bg-black/50 opacity-0 group-hover:opacity-100"
              onClick={handlePlay}
            >
              <Play className="h-6 w-6 fill-white text-white" />
            </Button>
          </div>
          <div>
            <p className="font-semibold">{post.song.title}</p>
            <p className="text-sm text-muted-foreground">{post.song.artist.name}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Heart className="w-4 h-4" /> {post.likes}
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4" /> {post.comments}
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center gap-2">
          <Share2 className="w-4 h-4" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
}
