import express from 'express';
import authRoutes from './authRoutes';
import plaidRoutes from './plaidRoutes';

const router = express.Router();

router.use('/',authRoutes);
router.use('/',plaidRoutes)

export default router;