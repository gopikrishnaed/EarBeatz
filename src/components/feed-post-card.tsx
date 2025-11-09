
import Image from "next/image";
import type { FeedPost } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export function FeedPostCard({ post }: { post: FeedPost }) {
  // Defensive check in case of unexpected data shape
  if (!post || !post.user || !post.song) {
    return null;
  }

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
        <div className="flex items-center gap-4 rounded-lg border p-3 bg-background/50">
          <Image
            src={post.song.coverArt.imageUrl || `https://picsum.photos/seed/${post.song.id}/64/64`}
            alt={post.song.title}
            width={64}
            height={64}
            className="rounded-md object-cover"
          />
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
