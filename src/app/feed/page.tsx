import MainLayout from "@/components/layout/main-layout";
import { FeedPostCard } from "@/components/feed-post-card";
import { feedPosts } from "@/lib/placeholder-data";

export default function FeedPage() {
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
            {feedPosts.map((post) => (
              <FeedPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
