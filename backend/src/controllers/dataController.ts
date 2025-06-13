import { Response } from 'express';
import {User} from '../models/userModel';
import Account from '../models/bankAccountModel';
import Transaction from '../models/transactionModel';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const getData = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(userId);
    const accounts = await Account.find({ userId });
    const transactions = await Transaction.find({ userId });

    res.status(200).json({
      user,
      accounts,
      transactions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};