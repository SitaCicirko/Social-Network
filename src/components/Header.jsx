import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="w-full bg-[#1e272e] text-[#d3d9d4] p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#84b8ec]">Social Network</h1>

        <div>
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-6">
              <div className="text-lg">
                <h2 className="text-gray-300">If you have an account:</h2>
                <SignInButton>
                  <button className="mt-2 px-4 py-2 bg-[#124e66] text-white rounded-lg hover:bg-[#84b8ec] hover:text-[#124e66] transition duration-300">
                    Sign In
                  </button>
                </SignInButton>
              </div>

              <div className="text-lg">
                <h2 className="text-gray-300">New here? Create an account:</h2>
                <SignUpButton>
                  <button className="mt-2 px-4 py-2 bg-[#124e66] text-white rounded-lg hover:bg-[#84b8ec] hover:text-[#124e66] transition duration-300">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </div>
          </SignedOut>
        </div>
      </div>
    </header>
  );
}
