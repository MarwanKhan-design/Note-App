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
        const { user, token } = req.user as any // 👈 Destructure properly

        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
        res.redirect(
            `${clientUrl}/auth/success?token=${encodeURIComponent(token)}&id=${encodeURIComponent(user._id)}&name=${encodeURIComponent(user.name)}&email=${encodeURIComponent(user.email)}`
        );
    }
);

export default router;
