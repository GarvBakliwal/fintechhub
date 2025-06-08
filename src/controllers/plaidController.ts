import { Response } from 'express';
import { plaidClient } from '../lib/plaidClient';
import { Products, CountryCode } from 'plaid';
import { User } from '../models/userModel';
import Account from '../models/bankAccountModel';
import Transaction from '../models/transactionModel';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const storeAccounts = async (userId: string, accessToken: string) => {
    const accountsRes = await plaidClient.accountsGet({ access_token: accessToken });
    const accounts = accountsRes.data.accounts;
    const item = accountsRes.data.item;

    await Promise.all(
        accounts.map(acc =>
            Account.findOneAndUpdate(
                { accountId: acc.account_id, userId },
                {
                    userId,
                    accountId: acc.account_id,
                    name: acc.name,
                    official_name: acc.official_name,
                    mask: acc.mask,
                    type: acc.type,
                    subtype: acc.subtype,
                    balances: acc.balances,
                    holder_category: acc.holder_category,
                    institution_name: item.institution_name,
                },
                { upsert: true, new: true }
            )
        )
    );

    console.log(`✔️ Saved ${accounts.length} accounts to DB for user ${userId}`);
};

export const storeTransactions = async (userId: string, accessToken: string) => {
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const response = await plaidClient.transactionsGet({
        access_token: accessToken,
        start_date: thirtyDaysAgo.toISOString().split('T')[0],
        end_date: now.toISOString().split('T')[0],
    });

    const transactions = response.data.transactions;

    await Promise.all(
        transactions.map(async tx => {
            try {
                await Transaction.findOneAndUpdate(
                    { transactionId: tx.transaction_id },
                    {
                        userId,
                        accountId: tx.account_id,
                        transactionId: tx.transaction_id,
                        name: tx.name,
                        merchant_name: tx.merchant_name,
                        website: tx.website,
                        amount: tx.amount,
                        iso_currency_code: tx.iso_currency_code,
                        date: tx.date,
                        authorized_date: tx.authorized_date,
                        category: tx.category,
                        payment_channel: tx.payment_channel,
                        pending: tx.pending,
                        logo_url: tx.logo_url,
                        personal_finance_category: tx.personal_finance_category,
                        counterparties: tx.counterparties?.slice(),
                    },
                    { upsert: true, new: true }
                )

            } catch (err: any) {
                console.error(`❌ Error storing transaction ${tx.transaction_id}:`, err.message);
            }
        })

    );

    console.log(`✔️ Stored ${transactions.length} transactions for user ${userId}`);
};

export const createLinkToken = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        console.log('[CREATE LINK TOKEN] Request received');

        const userId = req.userId;

        console.log('[CREATE LINK TOKEN] userId from token:', userId);

        const products = (process.env.PLAID_PRODUCTS || '').split(',') as Products[];
        const countryCodes = (process.env.PLAID_COUNTRY_CODES || '').split(',') as CountryCode[];

        const response = await plaidClient.linkTokenCreate({
            user: {
                client_user_id: userId || '',
            },
            client_name: 'FintechHub',
            products,
            country_codes: countryCodes,
            language: 'en',
        });

        res.json({ linkToken: response.data.link_token });
    } catch (error: any) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: error.message });
    }
};

export const exchangePublicToken = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        console.log('[EXCHANGE TOKEN] Request received');
        const { public_token } = req.body;
        console.log('[EXCHANGE TOKEN] Body:', req.body);
        const userId = req.userId;
        console.log('[EXCHANGE TOKEN] userId from token:', req.userId);

        const response = await plaidClient.itemPublicTokenExchange({ public_token });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        await User.findByIdAndUpdate(userId, {
            plaidAccessToken: accessToken,
            plaidItemId: itemId,
        });

        await storeAccounts(userId!, accessToken);
        await storeTransactions(userId!, accessToken);

        res.status(200).json({ accessToken, itemId });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};