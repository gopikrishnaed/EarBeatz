import MainLayout from "@/components/layout/main-layout";
import { FeedPostCard } from "@/components/feed-post-card";
import { getFeedPosts } from "@/lib/supabase/queries";
import { formatDistanceToNow } from 'date-fns';

export default async function FeedPage() {
  const posts = await getFeedPosts();

  const formattedPosts = posts.map(post => ({
    id: post.id,
    user: {
      id: post.users?.id || '',
      name: post.users?.name || 'Unknown User',
      avatar: {
        imageUrl: post.users?.avatar_url || '',
      }
    },
    song: {
      id: post.songs?.id || '',
      title: post.songs?.title || 'Unknown Song',
      artist: {
        name: post.songs?.artists?.name || 'Unknown Artist',
      },
      album: {
        id: post.songs?.albums?.id || '',
        title: post.songs?.albums?.title || '',
        coverArt: {
          imageUrl: post.songs?.albums?.cover_art_url || '',
        },
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
            {formattedPosts.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
