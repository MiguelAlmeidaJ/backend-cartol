import express from 'express';
import cors from 'cors';
import { routes } from './routes.js';
import { errorMiddleware } from './shared/middlewares/error.middlewares.js';

export const app = express();

app.use(express.json());
app.use(cors());

routes(app);

app.use(errorMiddleware);