import express from "express";
import dotenv from 'dotenv'
import { connectdb } from "./connectdb";
import userRoutes from "./routes/userRoutes";
import noteRoutes from "./routes/noteRoutes";
import { requireAuth } from "./middleware/requireAuth";
import cors from 'cors'

dotenv.config()

const app = express();

// Middlewares
app.use(cors({ origin: '*' }))
app.use(express.json());

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
