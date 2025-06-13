import express from 'express';
import Transaction from '../models/transactionModel';
import { authenticate, AuthenticatedRequest } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  const userId = (req as AuthenticatedRequest).userId;

  try {
    const transactions = await Transaction.find({ userId });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

export default router;