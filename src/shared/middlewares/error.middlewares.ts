import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export function errorMiddleware(
    error: Error,
    req: Request,
    res: Response,
    _next: NextFunction,
) {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    console.error('[UNEXPECTED ERROR]', error);

    return res.status(500).json({
        status: 'error',
        message: 'Erro interno no servidor',
    });
}