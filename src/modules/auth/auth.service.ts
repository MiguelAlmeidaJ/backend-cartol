import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '../../config/prisma.js';
import { AppError } from '../../shared/errors/AppError.js';
import { RegistroDTO, LoginDTO } from './auth.dto.js';
import { env } from '../../config/env.js';

export class AuthService {
    async register(data: RegistroDTO) {
        const userExists = await prisma.user.findUnique({
            where: { email: data.email }
        });

        if (userExists) {
            throw new AppError('Email já está em uso', 409);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            }
        });

        const token = this.generateToken(user.id);

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token
        };
    }

    async login(data: LoginDTO) {
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            throw new AppError('Email ou senha incorretos', 401);
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
            throw new AppError('Senha não é compativel', 401);
        }

        const token = this.generateToken(user.id);

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        };
    }

    private generateToken(userId: string) {
        return jwt.sign({}, env.JWT_SECRET, {
            subject: userId,
            expiresIn: '7d',
        });
    }
}