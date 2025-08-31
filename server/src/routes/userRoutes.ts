import { Router } from "express";
import { signup, login, GetVerified, checkTokenValidity } from "../controllers/userController";
import { requireAuth } from "../middleware/requireAuth";
import passport from "passport";
import jwt from 'jsonwebtoken'

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/verify', GetVerified)
router.post('/check-token', requireAuth, checkTokenValidity);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    (req: any, res) => {
        const user = req.user;

        // Create JWT
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        // Instead of cookies, redirect with token in query
        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
        // Use & as separator for query params
        res.redirect(
            `${clientUrl}/auth/success?token=${encodeURIComponent(token)}&id=${encodeURIComponent(user._id)}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`
        );
    }
);

export default router;
