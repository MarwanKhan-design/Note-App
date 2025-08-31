import { Schema, model, models, InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export interface IUser extends Document {
    googleId: string;
    email: string;
    name: string;
    OTP: number;
}


const userSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        OTP: { type: Number },
        googleId: { type: String, unique: true },
    },
    { timestamps: true }
);





userSchema.methods.generateJWT = function (): string {
    const payload = { sub: this._id.toString(), email: this.email };
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not set");
    const expiresIn = (process.env.JWT_EXPIRES_IN ?? "1h") as import("jsonwebtoken").SignOptions["expiresIn"];
    return jwt.sign(payload, secret, { expiresIn });
};

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = models.User || model("User", userSchema);


