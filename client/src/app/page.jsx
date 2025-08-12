"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  return (
    <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
      {session ? (
        <>
          <p>Welcome, {session.user.email} </p>
          <Button onClick={() => signOut()}>Logout</Button>
        </>
      ) : (
        <>
          <Button onClick={() => router.push("/login")}>Click To Login</Button>
        </>
      )}
    </div>
  );
}
