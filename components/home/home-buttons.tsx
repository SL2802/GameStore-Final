"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HomeButtons() {
  const { data: session } = useSession();
  const router = useRouter();

  function handleClick() {
    if (session) {
      router.push("/products");
    } else {
      router.push("/login");
    }
  }

  return (
    <>
      <div className="mt-12 justify-center items-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex">
        <Button
          variant="outline"
          onClick={handleClick}
          className="px-10 w-full block sm:w-auto hover:shadow-2xl"
        >
          Administrar Produtos
        </Button>
        <Link href="/catalogo">
          <Button className="px-10 w-full duration-300 block sm:w-auto hover:shadow-2xl">
            Catálogo Público
          </Button>
        </Link>
      </div>
    </>
  );
}
