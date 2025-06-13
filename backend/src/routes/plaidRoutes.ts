import express from 'express';
import { createLinkToken, exchangePublicToken } from '../controllers/plaidController';
import authenticate from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/create-link-token', authenticate, createLinkToken);
router.post('/exchange-public-token', authenticate, exchangePublicToken);

export default router;