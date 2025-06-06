import { NextFunction, Request, Response } from "express";
import { User } from "../models/userModel"

export const signUp = async (req: Request, res: Response) => {
    try {
        const newUser = new User(req.body);
        const { email } = newUser;
        const isExistingUser = await User.findOne({ email });
        if (isExistingUser) {
            throw new Error("User Already Exists");
        }
        const saveUser = await newUser.save();
        res.status(201).json(saveUser);
    } catch (error: any) {
           res.status(500).json({ message: error.message || "Something went wrong" });
    }
}

export async function login (req:Request,res: Response) {
    try {
        const {email , password} = new User(req.body);
        const isExistingUser = await User.findOne({ email });
        if (!isExistingUser) {
            throw new Error("User does not Exist!");
        }
        if (password!=isExistingUser.password) {
            throw new Error("Password does not Match!");
        }
        res.status(200).json({message : "Login Successful"})
    } catch (error : any) {
        res.status(500).json({message : error.message || "Something went Wrong"})
    }
}