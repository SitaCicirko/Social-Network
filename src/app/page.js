import Link from "next/link";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Social Network",
  description: "A social network app",
};

export default async function Home() {
  const session = await getServerSession();
  const username = session?.user?.username || "guest";
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1e272e] text-[#d3d9d4]">
      <h1 className="text-4xl text-[#84b8ec] mb-6">
        Welcome to the Social Network
      </h1>
      <Link
        href={`/profile/${username}`}
        className="mt-4 px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#84b8ec] hover:text-[#124e66] transition"
      >
        Go to Profile
      </Link>
      <Link
        href={"/create-profile"}
        className="mt-4 px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#84b8ec] hover:text-[#124e66] transition"
      >
        Create Profile
      </Link>
    </div>
  );
}
