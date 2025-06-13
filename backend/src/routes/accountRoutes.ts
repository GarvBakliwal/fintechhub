import express from 'express';
import Account from '../models/bankAccountModel';
import { authenticate, AuthenticatedRequest } from '../middlewares/authMiddleware';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  const userId = (req as AuthenticatedRequest).userId;

  try {
    const accounts = await Account.find({ userId });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch accounts' });
  }
});

export default router;