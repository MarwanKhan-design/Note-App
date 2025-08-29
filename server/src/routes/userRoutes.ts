import { Router } from "express";
import { signup, login } from "../controllers/userController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.post("/user", signup);
router.post("/user/login", login);

export default router;


