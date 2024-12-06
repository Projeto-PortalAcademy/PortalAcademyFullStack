/**
 * Decodifica um token JWT para obter as informações do usuário.
 * @param token - Token JWT recebido do Google.
 * @returns {any} - Informações do usuário contidas no token.
 */
export function parseJwt(token: string): any {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erro ao decodificar token JWT:", error);
    return null;
  }
}

/**
 * Realiza o login utilizando o token JWT do Google.
 * @param token - Token JWT fornecido pelo Google.
 * @returns {void}
 */
export function loginWithGoogle(token: string): void {
  try {
    // Decodifica o token JWT para obter informações do usuário
    const userInfo = parseJwt(token);

    if (!userInfo) {
      throw new Error("Falha ao obter informações do usuário.");
    }

    // Armazena as informações do usuário no localStorage
    localStorage.setItem("user_info", JSON.stringify(userInfo));
    console.log("Login realizado com sucesso:", userInfo);
  } catch (error) {
    console.error("Erro ao realizar login com Google:", error);
  }
}
