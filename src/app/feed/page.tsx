

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
      // Ensure post.users is not an array and has the correct shape
      const postUser = Array.isArray(post.users) ? post.users[0] : post.users;

      const user = postUser ? {
        id: postUser.id,
        name: postUser.name || 'Unknown User',
        avatar: {
          imageUrl: postUser.avatar_url || '',
        }
      } : {
        id: 'unknown-user',
        name: 'Unknown User',
        avatar: { imageUrl: '' }
      };

      const postSong = Array.isArray(post.songs) ? post.songs[0] : post.songs;
      
      const song = postSong ? {
        id: postSong.id,
        title: postSong.title || 'Unknown Song',
        songUrl: postSong.song_url || '',
        artist: {
          id: postSong.artists?.id || 'unknown-artist',
          name: postSong.artists?.name || 'Unknown Artist',
        },
        album: {
          id: postSong.albums?.id || 'unknown-album',
          title: postSong.albums?.title || 'Unknown Album',
        },
        coverArt: {
          imageUrl: postSong.cover_art_song || ''
        },
        duration: postSong.duration_in_seconds ? `${Math.floor(postSong.duration_in_seconds / 60)}:${String(postSong.duration_in_seconds % 60).padStart(2, '0')}` : '0:00',
        metadata: postSong.metadata as Song['metadata'] || {}
      } : null;

      // Now, we create the post object but will rely on the Card to handle null songs
      return {
        id: post.id,
        user: user,
        song: song!, // Assert that song is not null, FeedPostCard will handle it.
        content: post.content || '',
        likes: post.likes?.length || 0,
        comments: post.comments?.length || 0,
        timestamp: post.created_at ? formatDistanceToNow(new Date(post.created_at), { addSuffix: true }) : 'just now',
      }
    })
    .filter(Boolean); // Filter out any potential nulls from map if needed, though we handle it inside

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
