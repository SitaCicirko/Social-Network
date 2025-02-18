import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function profilePage({ params }) {
  const { username } = params;
  const { userId } = await auth();

  const profile = await db.query(
    `
    SELECT * FROM users
    WHERE username = $1
    `,
    [username]
  );

  if (profile.length === 0) {
    notFound();
  }
}
const wrangledProfile = profile.rows[0];

const posts = await db.query(
  `
    SELECT * FROM posts
    WHERE user_id = $1
    `,
  [wrangledProfile.id]
);

return (
  <>
    <h1>User Profile Page</h1>

    <div>
      <h2>{wrangledProfile.username}</h2>
      <p>About: {wrangledProfile.about || "No bio available."}</p>

      {userId === wrangledProfile.id && (
        <div>
          <Link href={`/posts/${wrangledProfile.id}`}>Add Post</Link>
          <Link href={`/profile`}>Edit Profile</Link>
        </div>
      )}
    </div>

    <h2>All Posts</h2>

    <div>
      {posts.rows.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        posts.rows.map((post) => (
          <div key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </div>
        ))
      )}
    </div>
  </>
);
