import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "User Profile",
  description: "View user details and posts.",
};

export default async function ProfilePage({ params }) {
  const username = decodeURIComponent(params.username);
  const { userId } = await auth();

  try {
    const profileQuery = await db.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (profileQuery.rows.length === 0) {
      notFound();
    }

    const profile = profileQuery.rows[0];

    const postsQuery = await db.query(
      "SELECT * FROM posts WHERE user_id = $1",
      [profile.id]
    );
    const posts = postsQuery.rows;

    return (
      <div className="min-h-screen flex flex-col items-center p-8 bg-[#1e272e] text-[#d3d9d4]">
        <div className="max-w-2xl w-full bg-[#3b4b57] p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl text-[#84b8ec] mb-4">{profile.username}</h1>
          <p className="text-lg">{profile.about || "No bio available."}</p>

          {userId === profile.id && (
            <div className="mt-4 flex gap-4">
              <Link
                href={`/profile/edit`}
                className="bg-[#84b8ec] hover:bg-[#124e66] text-[#124e66] hover:text-white px-4 py-2 rounded transition duration-300"
              >
                Edit Profile
              </Link>
              <Link
                href={`/posts/new`}
                className="bg-[#84b8ec] hover:bg-[#124e66] text-[#124e66] hover:text-white px-4 py-2 rounded transition duration-300"
              >
                Add Post
              </Link>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-semibold mt-6">All Posts</h2>
        {posts.length > 0 ? (
          <ul className="w-full max-w-2xl space-y-6 mt-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="bg-[#3b4b57] p-6 rounded-lg hover:scale-105 transition-transform"
              >
                <Link
                  href={`/posts/${post.id}`}
                  className="text-white hover:text-[#124e66] text-center text-2xl"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 mt-4">No posts available.</p>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return notFound();
  }
}
