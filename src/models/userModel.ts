import { NextFunction } from "express";
import mongoose, { Schema } from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema: Schema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Name is Required"],
        // length: [20, "Name Cannot exceed 20 Characters"]
    },
    lastName: {
        type: String,
        required: [true, "Name is Required"],
        // length: [20, "Name Cannot exceed 20 Characters"]
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true
    },
    // address: {
    //     type: String,
    //     required: [true,"Address is Required"],
    // },
    // city: {
    //     type: String,
    //     required: [true,"City is Required"]
    // },
    // state: {
    //     type: String,
    //     required: [true,"State is Required"]
    // },
    // dateOfBirth: {
    //     type: String,
    //     required: [true,"Date of Birth is Required"]
    // },
    // postalCode : {
    //     type: String,
    //     required:[true,"Postal Code is Required"]
    // },
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