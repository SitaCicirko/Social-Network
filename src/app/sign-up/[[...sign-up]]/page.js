import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/create-profile");
  }, [router]);

  return <SignUp />;
}
