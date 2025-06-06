// models/bankAccountModel.ts
import mongoose from 'mongoose';

const bankAccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    plaidAccountId: {
        type: String
    },
    name: {
        type: String
    },
    mask: {
        type: String
    },
    type: {
        type: String
    },
    subtype: {
        type: String
    },
    currentBalance: {
        type: Number
    },
    availableBalance: {
        type: Number
    },
    institutionName: {
        type: String
    },
});

export const BankAccount = mongoose.model('BankAccount', bankAccountSchema);