import { Request, Response } from "express";
import { NoteModel } from "../models/Note";
import { AuthenticatedRequest } from "../middleware/requireAuth";

export const createNote = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { title, content } = req.body as { title?: string; content?: string };
        if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
        if (!title) return res.status(400).json({ message: "title is required" });
        const note = await NoteModel.create({ user: req.userId, title, content: content ?? "" });
        return res.status(201).json(note);
    } catch (_err) {
        return res.status(500).json({ message: "Failed to create note" });
    }
};

export const getNotes = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
        const notes = await NoteModel.find({ user: req.userId }).sort({ updatedAt: -1 });
        return res.status(200).json(notes);
    } catch (_err) {
        return res.status(500).json({ message: "Failed to fetch notes" });
    }
};

export const getNoteById = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
        const note = await NoteModel.findOne({ _id: req.params.id, user: req.userId });
        if (!note) return res.status(404).json({ message: "Note not found" });
        return res.status(200).json(note);
    } catch (_err) {
        return res.status(400).json({ message: "Invalid note id" });
    }
};
export const getNoteByUserId = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
        const note = await NoteModel.find({ user: req.userId });
        if (!note) return res.status(404).json({ message: "Notes not found" });
        return res.status(200).json(note);
    } catch (_err) {
        return res.status(400).json({ message: "No Notes Found" });
    }
};

export const updateNote = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
        const { title, content } = req.body as { title?: string; content?: string };
        const updated = await NoteModel.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { $set: { ...(title !== undefined ? { title } : {}), ...(content !== undefined ? { content } : {}) } },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Note not found" });
        return res.status(200).json(updated);
    } catch (_err) {
        return res.status(400).json({ message: "Invalid note id" });
    }
};

export const deleteNote = async (req: AuthenticatedRequest, res: Response) => {
    try {
        if (!req.userId) return res.status(401).json({ message: "Unauthorized" });
        const deleted = await NoteModel.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!deleted) return res.status(404).json({ message: "Note not found" });
        return res.status(200).json(deleted);
    } catch (_err) {
        return res.status(400).json({ message: "Invalid note id" });
    }
};


