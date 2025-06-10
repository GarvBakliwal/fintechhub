import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from './lib/dbConnection';
import routes from './routes/index'
import cors from 'cors'
dotenv.config();

const app = express();
app.use(cors({
    origin: ['http://localhost:3000', `${process.env.SITE_URL}`],
    credentials: true
}));
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
    res.send('HOMEPAGE')
});
app.use('/api', routes);
connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});