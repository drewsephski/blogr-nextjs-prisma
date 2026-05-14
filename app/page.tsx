import PostCard, { type PostCardData } from "@/components/post-card";
import prisma from "@/lib/prisma";

export const revalidate = 10;

export default async function FeedPage() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: { id: "desc" },
  });

  return (
    <div className="stack-lg">
      <div className="feed-header">
        <h1>Feed</h1>
        <p>Published posts from the community</p>
      </div>
      {feed.length ? (
        feed.map((post: PostCardData) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="empty-state">
          <p>No published posts yet.</p>
        </div>
      )}
    </div>
  );
}