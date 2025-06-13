import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/dbConnection';
import routes from './routes/index'
import cors from 'cors'
import helmet from 'helmet';
dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:3000', `${process.env.SITE_URL}`,'https://fintechhub.site','http://fintechhub.site'],
    credentials: true
}));
app.use(helmet());
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.send('HOMEPAGE')
});
app.use('/api', routes);
connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});