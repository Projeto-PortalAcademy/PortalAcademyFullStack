"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem("user_info");

    if (!userInfo) {
      router.push("/"); // Redireciona para a página de login se não autenticado
    }
  }, [router]);

  return <>{children}</>; // Renderiza os filhos apenas se autenticado
}