"use client";

import { Button } from "@/components/ui/button";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomeLogin() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleLogoutClick = () => signOut({ callbackUrl: "/" });

  return (
    <>
      {session ? (
        <Button
          variant="secondary"
          className="rounded-md hover:shadow-2xl"
          onClick={handleLogoutClick}
        >
          Logout
          <LogOutIcon className="ml-2" size={18} />
        </Button>
      ) : (
        <Button
          variant="default"
          className="rounded-md hover:shadow-2xl"
          onClick={() => router.push("/login")}
        >
          Login
          <LogInIcon className="ml-2" size={18} />
        </Button>
      )}
    </>
  );
}
