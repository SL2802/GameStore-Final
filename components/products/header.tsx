"use client";

import { ChevronLeftIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const handleBackClick = () => router.replace("/");
  const handleLogoutClick = () => signOut({ callbackUrl: "/" });

  return (
    <div className="relative h-[100px] w-full">
      <h1 className="text-4xl text-center py-10">Cadastro</h1>
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full"
        onClick={handleLogoutClick}
        >
        <LogOutIcon />
      </Button>
    </div>
  );
};

export default Header;
