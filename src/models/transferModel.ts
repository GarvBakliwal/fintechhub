import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sourceDwollaId: {
        type: String
    },
    destinationDwollaId: {
        type: String
    },
    amount: {
        type: Number
    },
    currency: {
        type: String,
        default: 'USD'
    },
    status: {
        type: String
    },
    transferId: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

export const Transfer = mongoose.model('Transfer', transferSchema);