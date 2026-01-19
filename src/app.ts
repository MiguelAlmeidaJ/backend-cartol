import express from 'express';
import cors from 'cors';
import { routes } from './routes';
import { errorMiddleware } from './shared/middlewares/error.middlewares';

export const app = express();

app.use(express.json());
app.use(cors());

routes(app);

app.use(errorMiddleware);