import Link from "next/link";

export type PostCardData = {
  id: string;
  title: string;
  content: string | null;
  author: {
    name: string | null;
  } | null;
};

export default function PostCard({ post }: { post: PostCardData }) {
  const excerpt = post.content
    ? post.content.replace(/[#*_`>\[\]()]/g, "").slice(0, 160).trim()
    : null;

  return (
    <Link className="post-card" href={`/posts/${post.id}`}>
      <h2>{post.title}</h2>
      <p className="meta">By {post.author?.name ?? "Unknown author"}</p>
      {excerpt ? <p className="excerpt">{excerpt}</p> : null}
    </Link>
  );
}