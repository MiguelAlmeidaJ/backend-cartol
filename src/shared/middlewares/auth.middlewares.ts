import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError.js';
import { env } from '../../config/env.js';

interface TokenPayload {
    sub: string;
}

export function authMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token not provided', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET) as TokenPayload;

        req.user = {
            id: decoded.sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid token', 401);
    }
}