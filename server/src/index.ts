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
app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || "supersecret", // 🔒 put in .env
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production", // set true if HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use("/api/auth", userRoutes);
app.use("/api/notes", noteRoutes);
app.get("/health", requireAuth, (_req, res) => {
    res.status(200).json({ ok: true, service: "ts-express-starter" });
});



// Boot
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});

connectdb(process.env.MONGODB_URI as string)
