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

    const { status, data } = error.response as {
      status: number;
      data: { message: string; error: string; statusCode: number };
    };

    switch (status) {
      case 400:
        throw new ValidationError(data.message ?? "Datos inválidos");
      case 401:
        throw new AuthError("Unauthorized: " + data.message);
      case 403:
        throw new AuthError(
          "No tienes permisos para realizar esta acción: " + data.message
        );
      case 404:
        throw new AppError("Recurso no encontrado", data.error ?? "NOT_FOUND");
      case 409:
        throw new AppError(
          data.message ?? "Error de conflicto: " + data.message,
          data.error ?? "CONFLICT"
        );
      case 429:
        throw new RateLimitError(
          "Demasiadas peticiones. Por favor, espera un momento."
        );
      case 500:
        throw new ServerError("Error interno del servidor: " + data.message);
      default:
        throw new AppError(
          data.message ?? "Error desconocido: " + data.message,
          data.error ?? "UNKNOWN_ERROR: " + data.error,
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
