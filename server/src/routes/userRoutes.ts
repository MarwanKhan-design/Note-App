import { Router } from "express";
import { signup, login, GetVerified, checkTokenValidity } from "../controllers/userController";
import { requireAuth } from "../middleware/requireAuth";
import passport from "passport";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/verify', GetVerified)
router.post('/check-token', requireAuth, checkTokenValidity);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect(`${process.env.CLIENT_URL || "http://localhost:3000"}/dashboard`);
});

export default router;


