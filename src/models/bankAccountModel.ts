import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    accountId: { type: String, required: true },
    // type: String,
    name: String,
    official_name: String,
    mask: String,
    subtype: String,
    current_balance: {
        type : String
    },
    holder_category: String,
    institution_name: String
});

export default mongoose.model('Account', accountSchema);