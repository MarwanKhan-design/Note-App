import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    userId?: string;
    userEmail?: string;
}

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Missing auth token" });
        }
        const token = header.slice("Bearer ".length);
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { sub: string; email: string };
        req.userId = payload.sub;
        req.userEmail = payload.email;
        return next();
    } catch (_err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};


