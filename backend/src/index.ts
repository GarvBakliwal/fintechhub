import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/dbConnection';
import routes from './routes/index'
import cors from 'cors'
import helmet from 'helmet';
import path from 'path';
dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:3000', `${process.env.SITE_URL}`,`${process.env.SITE_URL}:3000`,'https://fintechhub.site','http://fintechhub.site'],
    credentials: true
}));


app.use(
    '/',
    helmet({
        contentSecurityPolicy: false,
    })
);
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

app.use('/api', helmet());
app.use('/api', routes);

app.get('/docs', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "public"));
});
connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
