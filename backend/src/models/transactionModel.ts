import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountId: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  name: String,
  amount: Number,
  date: String,
  payment_channel: String,
  pending: Boolean,
  category: {
    type: String
  },
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);