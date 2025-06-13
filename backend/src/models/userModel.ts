import mongoose, { Schema } from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema: Schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Name is Required"],
    },
    lastName: {
        type: String,
        required: [true, "Name is Required"],
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    plaidAccessToken: {
        type: String
    },
    plaidItemId: {
        type: String
    },
    dwollaCustomerId: {
        type: String
    }
});
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(`${this.password}`,12);
    next();
})

export const User = mongoose.model("User", userSchema);