import express from 'express';
import authRoutes from './authRoutes';
import plaidRoutes from './plaidRoutes';
import dataRoutes from './dataRoutes';

const router = express.Router();

router.use('/',authRoutes);
router.use('/',plaidRoutes);
router.use('/',dataRoutes);

export default router;