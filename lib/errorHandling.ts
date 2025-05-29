export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500,
    public data?: Record<string, unknown> | null,
    public retryable: boolean = false
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string, data?: Record<string, unknown> | null) {
    super(message, "VALIDATION_ERROR", 400, data, false);
    this.name = "ValidationError";
  }
}

export class AuthError extends AppError {
  constructor(message: string) {
    super(message, "AUTH_ERROR", 401, null, true);
    this.name = "AuthError";
  }
}

export class NetworkError extends AppError {
  constructor(message: string) {
    super(message, "NETWORK_ERROR", 503, null, true);
    this.name = "NetworkError";
  }
}

export class RateLimitError extends AppError {
  constructor(message: string) {
    super(message, "RATE_LIMIT_ERROR", 429, null, true);
    this.name = "RateLimitError";
  }
}

export class ServerError extends AppError {
  constructor(message: string) {
    super(message, "SERVER_ERROR", 500, null, true);
    this.name = "ServerError";
  }
}

export const handleError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(error.message, "UNKNOWN_ERROR", 500, null, false);
  }

  return new AppError(
    "An unknown error occurred",
    "UNKNOWN_ERROR",
    500,
    null,
    false
  );
};

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

export const isRetryableError = (error: unknown): boolean => {
  if (!isAppError(error)) return false;
  return error.retryable;
};

export const MAX_RETRIES = 3;
export const RETRY_DELAY = 1000;

export const retryOperation = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = MAX_RETRIES,
  delay: number = RETRY_DELAY
): Promise<T> => {
  let lastError: unknown;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      if (!isRetryableError(error)) {
        throw error;
      }

      if (i < maxRetries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(2, i))
        );
      }
    }
  }

  throw lastError;
};
