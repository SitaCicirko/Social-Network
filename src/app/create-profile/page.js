"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");
  const [profileSaved, setProfileSaved] = useState(false);

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const bio = formData.get("bio");

    setUsername(username);
    setLoading(true);
    setError(null);

    const res = await fetch("/api/create-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, bio }),
    });

    if (res.ok) {
      setProfileSaved(true);
    } else {
      const errorData = await res.json();
      setError(errorData.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1e272e] text-[#d3d9d4]">
      <h1 className="text-4xl text-[#84b8ec] mb-6">Create Your Profile</h1>
      {profileSaved ? (
        <div className="text-lg text-[#84b8ec] mb-6">
          Profile created successfully.{" "}
          <Link href={`/profile/${username}`}>
            <a className="text-[#84b8ec] hover:underline">Go to your profile</a>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 rounded bg-[#2d3e50] text-white"
            required
          />
          <textarea
            placeholder="Bio (optional)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 rounded bg-[#2d3e50] text-white"
          />
          <button
            type="submit"
            className="w-full bg-[#124e66] text-white p-2 rounded hover:bg-[#84b8ec] hover:text-[#124e66] transition"
          >
            Create Profile
          </button>
        </form>
      )}
    </div>
  );
}
