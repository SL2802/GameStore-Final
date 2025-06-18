"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeftIcon } from "lucide-react";

export default function LoginPage() {
  const handleBackClick = () => router.replace("/");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/products");
    } else {
      alert("Credenciais inválidas");
    }
  }

  return (
    <>
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <form onSubmit={handleLogin} className="pt-24 max-w-sm mx-auto">
        <h2 className="text-xl mb-4">Login</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 border w-full p-2"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 border w-full p-2"
        />
        <Button type="submit" className="px-4 py-2">
          Entrar
        </Button>
      </form>
    </>
  );
}
