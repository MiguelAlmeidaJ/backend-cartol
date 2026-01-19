import 'dotenv/config';

function getEnv(key: string, required = true): string {
    const value = process.env[key];

    if (!value && required) {
        throw new Error(`Variável de ambiente ${key} não definida.`)
    }

    return value as string;
}

export const env = {
    NODE_ENV: getEnv('NODE_ENV', false) ?? 'development',
    PORT: Number(getEnv('PORT', false) ?? 3333),

    DATABASE_URL: getEnv('DATABASE_URL'),

    JWT_SECRET: getEnv('JWT_SECRET'),
    JWT_EXPIRES_IN: getEnv('JWT_EXPIRES_IN', false) ?? '7d',
}