import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1e272e] text-[#d3d9d4]">
      <div className="w-full max-w-md bg-[#3b4b57] p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl text-[#84b8ec] mb-4">
          Sorry, I think you&apos;re lost.
        </h1>
        <Link
          href="/trails"
          className="inline-block px-6 py-3 bg-[#124e66] text-white rounded-lg hover:bg-[#84b8ec] hover:text-[#124e66] transition duration-300"
        >
          Go Back to Trails
        </Link>
      </div>
    </div>
  );
}
