import axios, { AxiosError, AxiosRequestConfig } from "axios";
import {
  AppError,
  NetworkError,
  ValidationError,
  AuthError,
  RateLimitError,
  ServerError,
  retryOperation,
} from "../lib/errorHandling";
import { getToken } from "@/lib";

const api = axios.create({
  baseURL: process.env.connection_url,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) {
      throw new NetworkError("No se pudo conectar con el servidor");
    }

    const { status, data } = error.response;

    const errorData =
      data && typeof data === "object" && !Array.isArray(data)
        ? (data as Record<string, unknown>)
        : null;

    switch (status) {
      case 400:
        throw new ValidationError(
          typeof data === "string" ? data : "Datos inválidos",
          errorData
        );
      case 401:
        throw new AuthError("Sesión expirada");
      case 403:
        throw new AuthError("No tienes permisos para realizar esta acción");
      case 404:
        throw new AppError("Recurso no encontrado", "NOT_FOUND", 404);
      case 429:
        throw new RateLimitError(
          "Demasiadas peticiones. Por favor, espera un momento."
        );
      case 500:
        throw new ServerError("Error interno del servidor");
      default:
        throw new AppError(
          typeof data === "string" ? data : "Error desconocido",
          "UNKNOWN_ERROR",
          status
        );
    }
  }
);

const createApiMethod = <T>(
  method: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>
) => {
  return async (url: string, data?: any, config?: AxiosRequestConfig) => {
    return retryOperation(() => method(url, data, config));
  };
};

export const apiClient = {
  get: createApiMethod((url: string, config?: AxiosRequestConfig) =>
    api.get(url, config).then((res) => res.data)
  ),

  post: createApiMethod(
    (url: string, data?: any, config?: AxiosRequestConfig) =>
      api.post(url, data, config).then((res) => res.data)
  ),

  put: createApiMethod((url: string, data?: any, config?: AxiosRequestConfig) =>
    api.put(url, data, config).then((res) => res.data)
  ),

  delete: createApiMethod((url: string, config?: AxiosRequestConfig) =>
    api.delete(url, config).then((res) => res.data)
  ),

  patch: createApiMethod(
    (url: string, data?: any, config?: AxiosRequestConfig) =>
      api.patch(url, data, config).then((res) => res.data)
  ),
};
