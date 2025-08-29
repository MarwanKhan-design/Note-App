import { Router } from "express";
import { requireAuth } from "../middleware/requireAuth";
import { createNote, getNotes, getNoteById, updateNote, deleteNote } from "../controllers/noteController";

const router = Router();

router.post("/", requireAuth, createNote);
router.get("/", requireAuth, getNotes);
router.get("/:id", requireAuth, getNoteById);
router.patch("/:id", requireAuth, updateNote);
router.delete("/:id", requireAuth, deleteNote);

export default router;


