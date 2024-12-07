"use client";
import React, { useState } from "react";
import Image from "next/image";
import bgLogin from "../../../public/images/bg-login.png";
import { FaGithub } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import { loginWithGoogle } from "../../services/login";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;

      // Enviar o token para o back-end
      const res = await loginWithGoogle({ token });
      console.log("Login bem-sucedido:", res.data);

      // Exemplo: armazenar o token no localStorage ou redirecionar o usuário
      localStorage.setItem("user_info", JSON.stringify(res.data.user_info));
    } catch (err: any) {
      console.error("Erro ao realizar login com Google:", err.response || err);
      setError("Erro ao realizar login com Google.");
    }
  };

  const handleGoogleLoginFailure = (error: any) => {
    console.error("Erro ao tentar autenticar com Google:", error);
    setError("Falha no login com Google.");
  };

  return (
    <div className="relative flex w-full items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-600 h-screen">
      {/* Background Section */}
      <div className="absolute inset-0">
        <Image src={bgLogin} alt="Background" quality={100} fill priority />
      </div>

      {/* Login Form */}
      <div className="m-6 relative z-10 flex w-2/6 items-center justify-center p-6 md:p-12 bg-white bg-opacity-85 shadow-lg rounded-3xl">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-blue-900">Bem-vindo!</h2>
          <p className="mt-2 text-sm text-gray-600">
            Faça login para acessar sua conta
          </p>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

          <form className="mt-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full rounded-md bg-slate-100 bg-opacity-40 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Digite seu e-mail"
            />

            <label
              htmlFor="password"
              className="mt-4 block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full rounded-md bg-slate-100 bg-opacity-40 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Digite sua senha"
            />

            <div className="mt-4 flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-600"
              >
                Lembrar de mim
              </label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Esqueci minha senha
            </a>

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />

            <button
              type="button"
              className="mt-4 w-full flex items-center justify-center rounded-md border bg-white py-2 text-gray-600 hover:bg-gray-50"
            >
              <FaGithub size={20} className="mr-2" />
              Continuar com o GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}