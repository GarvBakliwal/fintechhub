import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel"
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/jwt";
export const signUp = async (req: Request, res: Response) => {
    try {
        const newUser = new User(req.body);
        const { email, password } = newUser;
        const isExistingUser = await User.findOne({ email });
        if (isExistingUser) {
            throw new Error("User Already Exists");
        }
        const saveUser = await newUser.save();
        const token = generateToken(`${newUser._id}`);
        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: `${newUser._id}`,
                firstName: `${newUser.firstName}`,
                lastName: `${newUser.lastName}`,
                email: `${newUser.email}`
            }
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Something went wrong" });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = new User(req.body);
        const isExistingUser = await User.findOne({ email });
        if (!isExistingUser) {
            throw new Error("User does not Exist!");
        }
        const isMatch = await bcrypt.compare(`${password}`, `${isExistingUser.password}`);
        if (!isMatch) {
            throw new Error("Password does not Match!");
        }
        const token = generateToken(`${isExistingUser._id}`);
        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: `${isExistingUser._id}`,
                firstName: `${isExistingUser.firstName}`,
                lastName: `${isExistingUser.lastName}`,
                email: `${isExistingUser.email}`
            }
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Something went Wrong" })
    }
}