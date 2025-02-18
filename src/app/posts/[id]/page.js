import { db } from "@/utils/dbConnection";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export const metadata = {
  title: "Post Details",
  description: "View the details of a specific post.",
};

export default async function PostPage({ params }) {
  const postId = params.id;

  try {
    const postQuery = await db.query("SELECT * FROM posts WHERE id = $1", [
      postId,
    ]);

    if (postQuery.rows.length === 0) {
      return notFound();
    }

    const post = postQuery.rows[0];

    return (
      <div className="min-h-screen flex flex-col items-center p-8 bg-[#1e272e] text-[#d3d9d4]">
        <div className="max-w-2xl w-full bg-[#3b4b57] p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl text-[#84b8ec] mb-4">Post Details</h1>
          <p className="text-lg">{post.content}</p>
        </div>

        <Link
          href="/posts"
          className="mt-6 bg-[#124e66] text-white px-4 py-2 rounded"
        >
          Back to Posts
        </Link>
      </div>
    );
  } catch (error) {
    console.error("Error fetching post data:", error);
    return notFound();
  }
}
