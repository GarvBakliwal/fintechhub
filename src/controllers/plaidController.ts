import { Request, Response } from 'express';
import { plaidClient } from '../lib/plaidClient';
import { Products, CountryCode } from 'plaid';
import { User } from '../models/userModel';

export const createLinkToken = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;

        const products = (process.env.PLAID_PRODUCTS || '').split(',') as Products[];
        const countryCodes = (process.env.PLAID_COUNTRY_CODES || '').split(',') as CountryCode[];
        // console.log('client_id:', process.env.PLAID_CLIENT_ID);
        // console.log('secret:', process.env.PLAID_SECRET);
        const response = await plaidClient.linkTokenCreate({
            user: {
                client_user_id: userId
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

export const exchangePublicToken = async (req: Request, res: Response) => {
    try {
        const { public_token, userId } = req.body;

        const response = await plaidClient.itemPublicTokenExchange({ public_token: public_token });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        // TODO: Store accessToken & itemId securely in DB linked to userId
        console.log(`Access Token: ${accessToken} for User: ${userId}`);
        await User.findByIdAndUpdate(userId, {
            plaidAccessToken: accessToken,
            plaidItemId: itemId
        })
        res.status(200).json({ accessToken, itemId });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: error.message });
        console.error('Plaid token exchange error:', error.response?.data || error.message);
    }
};