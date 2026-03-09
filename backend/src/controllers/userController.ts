import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel"
import bcrypt from 'bcryptjs'
import { generateToken } from "../lib/jwt";

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none" as const,
    path: "/",
    maxAge: 24 * 60 * 60 * 1000
};

export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const isExistingUser = await User.findOne({ email });
        if (isExistingUser) {
            throw new Error("User Already Exists");
        }
        const newUser = new User({
            email,
            password,
            firstName,
            lastName,
        });
        const saveUser = await newUser.save();
        const token = generateToken(`${saveUser._id}`);
        res.cookie("token", token, cookieOptions);
        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: `${saveUser._id}`,
                firstName: `${saveUser.firstName}`,
                lastName: `${saveUser.lastName}`,
                email: `${saveUser.email}`
            }
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message || "Something went wrong" });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;
        const isExistingUser = await User.findOne({ email });
        if (!isExistingUser) {
            throw new Error("User does not Exist!");
        }
        const isMatch = await bcrypt.compare(`${password}`, `${isExistingUser.password}`);
        if (!isMatch) {
            throw new Error("Password does not Match!");
        }
        const token = generateToken(`${isExistingUser._id}`);

        res.cookie("token", token, cookieOptions);

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


export const logoutUser = (req: Request, res: Response) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    });

    res.status(200).json({
        message: "Logged out successfully",
    });
};