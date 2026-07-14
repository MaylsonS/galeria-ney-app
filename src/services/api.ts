import axios from "axios";

// Uma única instância do Axios pra toda a aplicação.
// baseURL vem da variável de ambiente — em produção você só troca o .env,
// nunca precisa tocar no código.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Interceptor: roda ANTES de toda requisição saída.
// Se existir um token salvo, anexa o header Authorization automaticamente —
// assim nenhum componente precisa lembrar de fazer isso manualmente.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
