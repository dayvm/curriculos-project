export type ApiErrorResponse = {
  success: false;
  message: string;
  error?: {
    code?: string;
    details?: unknown[];
  };
};