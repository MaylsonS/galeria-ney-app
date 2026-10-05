import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// NOVO: Interceptor de Resposta
api.interceptors.response.use(
  (response) => {
    // Caminho feliz: apenas devolve a resposta para o fluxo normal
    return response;
  },
  (error) => {
    // Captura global de erros de segurança (Token ausente, inválido ou expirado)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {

      // 1. Destrói os dados da sessão local
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // 2. Feedback visual (pode ser substituído por um Toast da sua biblioteca preferida)
      alert("A sua sessão expirou ou você não tem permissão. Faça login novamente.");

      // 3. Força o redirecionamento para a tela de login
      window.location.href = "/login";
    }

    // Repassa o erro para que o componente saiba que a requisição falhou
    return Promise.reject(error);
  }
);

export default api;