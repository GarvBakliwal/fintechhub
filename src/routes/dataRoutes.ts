import express, { RequestHandler } from 'express';
import { getData } from '../controllers/dataController';
import authenticate from '../middlewares/authMiddleware';
const router = express.Router();

router.get('/data',authenticate, getData as RequestHandler);

export default router;