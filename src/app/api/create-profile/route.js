import { db } from "@/utils/dbConnection";
import { auth } from "@clerk/nextjs/server";

export default async function POST(req) {
  try {
    const { userId } = await auth(req);

    const { username, bio } = await req.json();

    await db.query(
      `
            INSERT INTO profiles (user_id, username, bio)
            VALUES ($1, $2, $3)
            `,
      [userId, username, bio]
    );

    return {
      status: 200,
      body: { message: "Profile created successfully." },
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: { message: error.message },
    };
  }
}
