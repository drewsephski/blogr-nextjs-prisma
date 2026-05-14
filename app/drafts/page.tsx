import PostCard, { type PostCardData } from "@/components/post-card";
import { getCurrentUser } from "@/lib/session";
import prisma from "@/lib/prisma";

export default async function DraftsPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="empty-state">
        <p>You need to be signed in to view your drafts.</p>
      </div>
    );
  }

  const drafts = await prisma.post.findMany({
    where: {
      authorId: user.id,
      published: false,
    },
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
        <h1>Drafts</h1>
        <p>Your unpublished posts</p>
      </div>
      {drafts.length ? (
        drafts.map((post: PostCardData) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="empty-state">
          <p>No drafts yet. Start writing something new.</p>
        </div>
      )}
    </div>
  );
}