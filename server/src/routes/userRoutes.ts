import { Router } from "express";
import { signup, login, GetVerified, checkTokenValidity } from "../controllers/userController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post('/verify', GetVerified)
router.post('/check-token', requireAuth, checkTokenValidity);

export default router;


