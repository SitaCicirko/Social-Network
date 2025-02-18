import { db } from "@/utils/dbConnection";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "All Posts",
  description: "Browse through all available posts.",
};

export default async function PostsPage() {
  try {
    const postsQuery = await db.query("SELECT * FROM posts");
    const posts = postsQuery.rows;

    return (
      <div className="min-h-screen flex flex-col items-center p-8 bg-[#1e272e] text-[#d3d9d4]">
        <h1 className="text-4xl text-[#84b8ec] mb-6">All Posts</h1>
        <ul className="w-full max-w-2xl space-y-6">
          {posts.map((post) => (
            <li key={post.id} className="bg-[#3b4b57] p-6 rounded-lg">
              <Link href={`/posts/${post.id}`} className="text-white text-2xl">
                {post.content.slice(0, 100)}...{" "}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    return notFound();
  }
}
