import mongoose from "mongoose";

let isConnected = false;

export const connectdb = async (uri: string) => {
    if (isConnected) return;

    try {
        const db = await mongoose.connect(uri, {
            // recommended options
            serverSelectionTimeoutMS: 5000, // fail fast if DB unreachable
            maxPoolSize: 10,                // cap connections
        });

        isConnected = !!db.connections[0].readyState;
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ DB connection error:", err);
        throw new Error("Failed to connect to MongoDB");
    }
};
