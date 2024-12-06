"use client";

import "./globals.css";
import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "../components/Sidebar/sidebar";
import Header from "../components/Header/header";
import { GoogleOAuthProvider } from "@react-oauth/google";


const clientId = "26016779977-ncd6go4kfkbfeermarclvbvndp2glaqo.apps.googleusercontent.com";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Verifica se a rota é "/" e ignora o layout padrão
  const isLoginPage = pathname === "/";

  if (isLoginPage) {
    return (
      <html lang="pt-br">
        <body>
          <GoogleOAuthProvider clientId={clientId}>
            {children}
          </GoogleOAuthProvider>
        </body>
      </html>
    );
  }

  return (
    <html lang="pt-br">
      <body className="flex h-screen">
        <GoogleOAuthProvider clientId={clientId}>
          <Sidebar />
          <div className="flex flex-col flex-grow">
            <Header />
            <div className="flex-grow overflow-auto p-4">{children}</div>
          </div>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}