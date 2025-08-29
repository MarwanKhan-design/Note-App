import mongoose from "mongoose";

export const connectdb = async (URI: string) => {
    try {
        const conn = await mongoose.connect(URI);
        console.log("DB connected", conn.connection.host);
    } catch (error) {
        console.log("Error Connecting to DB", error);
        process.exit(1);
    }
}