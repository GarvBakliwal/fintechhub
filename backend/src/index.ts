import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/dbConnection';
import routes from './routes/index'
import cors from 'cors'
import helmet from 'helmet';
import path from 'path';
import healthRoutes from "./routes/healthRoutes";
import cookieParser from "cookie-parser";
import logger from './lib/logger';
import morganMiddleware from './middlewares/loggerMiddleware';

dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:3000', `${process.env.SITE_URL}`, `${process.env.SITE_URL}:3000`, 'https://fintechhub.site', 'http://fintechhub.site'],
    credentials: true
}));


app.use(
    '/',
    helmet({
        contentSecurityPolicy: false,
    })
);

app.use(express.static(path.join(process.cwd(), "public")));

app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);
app.use('/api', helmet());
app.use('/api', routes);

app.get('/health', healthRoutes);

app.get('/', (req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "public", "index.html"));
});
connectDB();
app.listen(process.env.PORT, () => {
    logger.info(`Server is running on port ${process.env.PORT}`);
});
