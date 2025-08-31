import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import { connectdb } from "./connectdb";
import userRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";
import { requireAuth } from "./middleware/requireAuth";
import cors from 'cors'
import passport from 'passport'
import './passport' // Import passport configuration
import session from 'express-session'


const app = express();


// Middlewares
app.use(cors({ origin: 'https://note-app-frontend-livid.vercel.app/' }))
app.use(express.json());


app.use(passport.initialize());


// Routes
app.use("/api/auth", userRoutes);
app.use("/api/notes", noteRoutes);
app.get("/health", requireAuth, (_req, res) => {
    res.status(200).json({ ok: true, service: "ts-express-starter" });
});



// Boot


connectdb(process.env.MONGODB_URI as string)

export default app