import express from 'express';
import { createLinkToken, exchangePublicToken } from '../controllers/plaidController';

const router = express.Router();

router.post('/create-link-token', createLinkToken);
router.post('/exchange-public-token', exchangePublicToken);

export default router;