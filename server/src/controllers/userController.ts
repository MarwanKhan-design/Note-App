import { Request, Response } from "express";
import { UserModel } from "../models/User";
import { sendOTPEmail } from '../sendMail/sendMail'
import crypto from 'crypto'

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body as { name?: string; email?: string; };
        if (!name || !email) return res.status(400).json({ message: "name, email are required" });

        const existing = await UserModel.findOne({ email });
        if (existing) return res.status(409).json({ message: "Email already in use" });

        const user = new UserModel({ name, email });
        const otp = [...crypto.randomBytes(6)].map(b => b % 10).join('');
        user.OTP = otp
        await user.save();


        await sendOTPEmail(email, parseInt(otp));
        return res.status(201).json({ message: 'Check Email For OTP' });
    } catch (_error) {
        return res.status(500).json({ message: "Failed to signup" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email } = req.body as { email?: string; };
        const otp = [...crypto.randomBytes(6)].map(b => b % 10).join('');
        if (!email) return res.status(400).json({ message: "email are required" });

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        user.OTP = otp
        user.save()

        await sendOTPEmail(email as string, parseInt(otp))

        return res.status(200).json({ message: "Check Email for OTP" });
    } catch (_error) {
        return res.status(500).json({ message: "Login failed" });
    }
};

export const GetVerified = async (req: Request, res: Response) => {
    const { email, OTP } = req.body

    const user = await UserModel.findOne({ email: email })
    if (!user) {
        return res.json({ message: 'User not Found' })
    }
    if (user.OTP === OTP) {

        const token = (user as any).generateJWT();
        return res.json({ token, user })
    }
    res.json({ message: 'Wrong OTP' })

}

// ... existing code ...

export const checkTokenValidity = async (req: Request, res: Response) => {
    try {
        // The requireAuth middleware already validates the token
        // If we reach this point, the token is valid
        const { email } = req.body;
        const user = await UserModel.findOne({ email }).select('-passwordHash -OTP');
        if (!user) {
            return res.status(401).json({ message: "User not found", isValid: false });
        }

        return res.status(200).json({
            message: "Token is valid",
            isValid: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "Error checking token validity", isValid: false });
    }
};