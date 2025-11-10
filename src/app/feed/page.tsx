

import MainLayout from "@/components/layout/main-layout";
import { FeedPostCard } from "@/components/feed-post-card";
import { getFeedPosts, getSongs, getUsers } from "@/lib/supabase/queries";
import { formatDistanceToNow } from 'date-fns';
import type { FeedPost, Song, UserFromDB } from "@/lib/types";
import { CreatePostForm } from "@/components/create-post-form";

export default async function FeedPage() {
  const posts = await getFeedPosts();
  const songs = await getSongs();
  const users = await getUsers();

  const formattedPosts: FeedPost[] = posts
    .map(post => {
      const user = post.users ? {
        id: post.users.id,
        name: post.users.name || 'Unknown User',
        avatar: {
          imageUrl: post.users.avatar_url || '',
        }
      } : {
        id: 'unknown-user',
        name: 'Unknown User',
        avatar: { imageUrl: '' }
      };

      const song = post.songs ? {
        id: post.songs.id,
        title: post.songs.title || 'Unknown Song',
        songUrl: post.songs.song_url || '',
        artist: {
          id: post.songs.artists?.id || '',
          name: post.songs.artists?.name || 'Unknown Artist',
        },
        album: {
          id: post.songs.albums?.id || '',
          title: post.songs.albums?.title || 'Unknown Album',
        },
        coverArt: {
          imageUrl: post.songs.cover_art_song || ''
        },
        duration: post.songs.duration_in_seconds ? `${Math.floor(post.songs.duration_in_seconds / 60)}:${String(post.songs.duration_in_seconds % 60).padStart(2, '0')}` : '0:00',
        metadata: post.songs.metadata as Song['metadata'] || {}
      } : null;

      // Only include posts that have a song attached
      if (!song) {
        return null;
      }

      return {
        id: post.id,
        user: user,
        song: song,
        content: post.content || '',
        likes: post.likes?.length || 0,
        comments: post.comments?.length || 0,
        timestamp: post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) : 'just now',
      }
    })
    .filter((post): post is FeedPost => post !== null);

  const currentUser = users.length > 0 ? users[0] : null;

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">
              Social Feed
            </h1>
            <p className="text-muted-foreground">
              See what your friends are listening to and share your own tunes.
            </p>
          </div>

          {currentUser ? (
            <CreatePostForm songs={songs} user={currentUser} />
          ) : (
             <div className="text-center py-10 border rounded-lg bg-card/50">
                <p className="text-lg font-medium">Cannot Create Post</p>
                <p className="text-muted-foreground">
                  No users found in the database to post as.
                </p>
              </div>
          )}


          <div className="space-y-6">
            {formattedPosts.length > 0 ? (
              formattedPosts.map((post) => (
                <FeedPostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-10 border rounded-lg bg-card/50">
                <p className="text-lg font-medium">Your feed is empty</p>
                <p className="text-muted-foreground">
                  Be the first to share a song!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
