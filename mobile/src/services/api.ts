import axios from "axios";
import { getToken, removeToken } from "./storage";

const api = axios.create({
  baseURL: "https://pet-production-1cb0.up.railway.app",

  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getToken();

      if (token) {
        config.headers = config.headers || {};

        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.log("Erro ao obter token:", error);

      return config;
    }
  },

  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log("Erro API:", error?.response?.data || error);

    if (error.response?.status === 401) {
      await removeToken();

      console.log("Token expirado — usuário deslogado");
    }

    return Promise.reject(error);
  },
);

export default api;
