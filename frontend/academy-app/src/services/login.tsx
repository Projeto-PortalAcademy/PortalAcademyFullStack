import api, { endpoints } from "./api";

/**
 * Realiza o login do usuário via Google.
 * @param payload - Dados contendo o token do Google.
 * @returns {Promise<any>} - Resposta da API.
 */
export function loginWithGoogle(payload: { token: string }) {
  return api.post(endpoints.LOGIN, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}