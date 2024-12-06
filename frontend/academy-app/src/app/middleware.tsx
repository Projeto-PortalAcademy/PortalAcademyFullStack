import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const loggedIn = request.cookies.get("user_info"); // Verifica se o cookie `user_info` existe

  // Redireciona para a página de login (/) se o usuário não estiver autenticado
  if (!loggedIn) {
    const loginUrl = new URL("/", request.url); // Redireciona para "/"
    return NextResponse.redirect(loginUrl);
  }

  // Caso autenticado, permite acessar a página
  return NextResponse.next();
}

// Configura as rotas protegidas
export const config = {
  matcher: [
    "/frequencia",
    "/dashboards",
    "/areas",
    "/usuarios",
    "/avaliacao",
  ],
};