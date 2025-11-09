
import MainLayout from "@/components/layout/main-layout";
import { FeedPostCard } from "@/components/feed-post-card";
import { getFeedPosts } from "@/lib/supabase/queries";
import { formatDistanceToNow } from 'date-fns';
import type { FeedPost, FeedPostFromDB } from "@/lib/types";

// Type guard to check if a post has the minimum required data
function isValidPost(post: FeedPostFromDB): post is FeedPostFromDB & { users: NonNullable<FeedPostFromDB['users']>, songs: NonNullable<FeedPostFromDB['songs']> & { artists: NonNullable<FeedPostFromDB['songs']['artists']> } } {
  return !!(post && post.users && post.songs && post.songs.artists);
}


export default async function FeedPage() {
  const posts = await getFeedPosts();

  const formattedPosts: FeedPost[] = posts
    .filter(isValidPost)
    .map(post => ({
    id: post.id,
    user: {
      id: post.users.id || '',
      name: post.users.name || 'Unknown User',
      avatar: {
        imageUrl: post.users.avatar_url || '',
      }
    },
    song: {
      id: post.songs.id || '',
      title: post.songs.title || 'Unknown Song',
      songUrl: '', // Not needed for feed card
      artist: {
        id: '', // Not available in simplified query
        name: post.songs.artists.name || 'Unknown Artist', // Safely access artist
      },
      album: {
        id: post.songs.album_id || '', 
        title: '', // Not available
      },
      coverArt: {
        imageUrl: post.songs.cover_art_song || ''
      }
    },
    content: post.content || '',
    likes: post.likes?.length || 0,
    comments: post.comments?.length || 0,
    timestamp: post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) : 'just now',
  }));

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold font-headline tracking-tight">
              Social Feed
            </h1>
            <p className="text-muted-foreground">
              See what your friends are listening to.
            </p>
          </div>

          <div className="space-y-6">
            {formattedPosts.length > 0 ? (
              formattedPosts.map((post) => (
                <FeedPostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-10 border rounded-lg bg-card/50">
                <p className="text-lg font-medium">Your feed is empty</p>
                <p className="text-muted-foreground">
                  Follow friends or check back later for new posts.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
