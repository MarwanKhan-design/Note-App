import { Request, Response } from "express";
import { UserModel } from "../models/User";

export const signup = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body as { name?: string; email?: string; password?: string };
        if (!name || !email || !password) return res.status(400).json({ message: "name, email and password are required" });

        const existing = await UserModel.findOne({ email });
        if (existing) return res.status(409).json({ message: "Email already in use" });

        const user = new UserModel({ name, email, passwordHash: password });
        await user.save();

        const token = (user as any).generateJWT();
        const { passwordHash, ...safe } = user.toObject();
        return res.status(201).json({ ...safe, token });
    } catch (_error) {
        return res.status(500).json({ message: "Failed to signup" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as { email?: string; password?: string };
        if (!email || !password) return res.status(400).json({ message: "email and password are required" });

        const user = await UserModel.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const ok = await (user as any).comparePassword(password);
        if (!ok) return res.status(401).json({ message: "Invalid credentials" });

        const token = (user as any).generateJWT();
        const { passwordHash, ...safe } = user.toObject();
        return res.status(200).json({ ...safe, token });
    } catch (_error) {
        return res.status(500).json({ message: "Login failed" });
    }
};


