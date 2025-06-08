import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    accountId: { type: String, required: true },
    name: String,
    official_name: String,
    mask: String,
    type: String,
    subtype: String,
    balances: {
        available: Number,
        current: Number,
        iso_currency_code: String,
        limit: Number,
        unofficial_currency_code: String,
    },
    holder_category: String,
    institution_name: String
});

export default mongoose.model('Account', accountSchema);