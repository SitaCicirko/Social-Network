import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1e272e] text-[#d3d9d4]">
        <h1 className="text-4xl text-[#84b8ec] mb-6">Sign Up Please</h1>
        <SignIn />
      </div>
    </>
  );
}
