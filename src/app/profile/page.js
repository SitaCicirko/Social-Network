import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export const metadata = {
  title: "My Profile",
  description: "Manage your profile and posts.",
};

export default async function MyProfilePage() {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.error("User is not authenticated");
      return redirect("/login");
    }

    console.log("Fetching profile for userId:", userId);

    const profileQuery = await db.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (profileQuery.rows.length === 0) {
      console.error("Profile not found for user:", userId);
      return <h1>Profile not found</h1>;
    }

    const wrangledProfile = profileQuery.rows[0];
    console.log("Profile data:", wrangledProfile);

    const postsQuery = await db.query(
      "SELECT * FROM posts WHERE user_id = $1",
      [userId]
    );

    const posts = postsQuery.rows;
    console.log("User posts:", posts);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1e272e] text-[#d3d9d4]">
        <div className="w-full max-w-2xl bg-[#3b4b57] p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl text-[#84b8ec] mb-4">
            {wrangledProfile.username}
          </h1>
          <p className="text-lg">
            <span className="font-semibold">About:</span>{" "}
            {wrangledProfile.about || "No bio available."}
          </p>

          <div className="mt-4">
            <Link
              href={`/posts/${userId}`}
              className="text-[#84b8ec] hover:underline"
            >
              Add Post
            </Link>
            <br />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Your Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-400">No posts available.</p>
        ) : (
          <ul className="w-full max-w-2xl space-y-6">
            {posts.map((post) => (
              <li key={post.id} className="bg-[#3b4b57] p-6 rounded-lg">
                <Link
                  href={`/post/${post.id}`}
                  className="text-white hover:text-[#84b8ec]"
                >
                  {post.title || "Untitled Post"}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex gap-4">
          <Link
            href="/"
            className="p-4 text-xl bg-[#124e66] text-white rounded hover:bg-[#84b8ec] hover:text-[#124e66] transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return notFound();
  }
}
