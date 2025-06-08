import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountId: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  name: String,
  merchant_name: String,
  website: String,
  amount: Number,
  iso_currency_code: String,
  date: String,
  authorized_date: String,
  category: [String],
  payment_channel: String,
  pending: Boolean,
  logo_url: String,
  personal_finance_category: {
    primary: String,
    detailed: String,
    confidence_level: String
  },
  counterparties: [
    {
      name: String,
      type: String,
      confidence_level: String,
      entity_id: String,
      logo_url: String,
      phone_number: String,
      website: String
    }
  ]
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);