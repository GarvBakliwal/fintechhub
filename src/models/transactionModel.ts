import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    accountId: {
        type: String
    },
    name: {
        type: String
    },
    amount: {
        type: Number
    },
    date: {
        type: String
    },
    category: {
        type: [String]
    },
    transactionType: {
        type: String
    },
    plaidTransactionId: {
        type: String
    },
});

export const Transaction = mongoose.model('Transaction', transactionSchema);