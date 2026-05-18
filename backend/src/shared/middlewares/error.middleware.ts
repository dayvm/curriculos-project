import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { ErrorCode } from "../errors/error-code.js";

export function errorHandlerMiddleware(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: {
        code: err.errorCode,
        details: err.details ?? null,
      },
    });
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Erro interno do servidor.",
    error: {
      code: ErrorCode.INTERNAL_SERVER_ERROR,
      details: null,
    },
  });
}
