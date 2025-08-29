import express from "express";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.get("/health", (_req, res) => {
    res.status(200).json({ ok: true, service: "ts-express-starter" });
});

// Boot
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
