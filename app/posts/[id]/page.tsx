import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { deletePost, publishPost } from "@/app/actions";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;
  const [user, post] = await Promise.all([
    getCurrentUser(),
    prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    }),
  ]);

  if (!post) {
    notFound();
  }

  const postBelongsToUser = user?.id === post.authorId;

  return (
    <article>
      <div className="article-header">
        {!post.published && <span className="badge">Draft</span>}
        <h1>{post.title}</h1>
        <p className="meta">By {post.author?.name ?? "Unknown author"}</p>
      </div>
      <div className="prose">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      {postBelongsToUser && (
        <div className="actions">
          {!post.published && (
            <form action={publishPost.bind(null, post.id)}>
              <button type="submit">Publish</button>
            </form>
          )}
          <form action={deletePost.bind(null, post.id)}>
            <button className="danger" type="submit">
              Delete
            </button>
          </form>
        </div>
      )}
    </article>
  );
}