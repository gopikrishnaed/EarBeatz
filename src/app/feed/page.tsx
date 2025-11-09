
import MainLayout from "@/components/layout/main-layout";
import { FeedPostCard } from "@/components/feed-post-card";
import { getFeedPosts, getSongs } from "@/lib/supabase/queries";
import { formatDistanceToNow } from 'date-fns';
import type { FeedPost, FeedPostFromDB, Song, UserFromDB } from "@/lib/types";
import { CreatePostForm } from "@/components/create-post-form";

// Type guard to check if a post has the minimum required data
function isValidPost(post: FeedPostFromDB): post is FeedPostFromDB & { users: NonNullable<FeedPostFromDB['users']>, songs: NonNullable<FeedPostFromDB['songs']> & { artists: NonNullable<FeedPostFromDB['songs']['artists']> } } {
  return !!(post && post.users && post.songs && post.songs.artists);
}


export default async function FeedPage() {
  const posts = await getFeedPosts();
  const songs = await getSongs();

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
      songUrl: post.songs.song_url || '',
      artist: {
        id: post.songs.artists?.id || '',
        name: post.songs.artists?.name || 'Unknown Artist',
      },
      album: {
        id: post.songs.album_id || '',
        title: post.songs.albums?.title || 'Unknown Album',
      },
      coverArt: {
        imageUrl: post.songs.cover_art_song || ''
      },
    } as Song,
    content: post.content || '',
    likes: post.likes?.length || 0,
    comments: post.comments?.length || 0,
    timestamp: post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) : 'just now',
  }));

  // Hardcoded user for now, in a real app this would come from auth
  const currentUser: UserFromDB = {
    id: 'f5e4b3a2-1c9d-4f38-9a6b-7b8c9d0e1f2a',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    created_at: new Date().toISOString(),
    avatar_url: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwZXJzb24lMjBzbWlsaW5nfGVufDB8fHx8MTc1OTEyNDY1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
  }

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

          <CreatePostForm songs={songs} user={currentUser} />

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
