import { Schema, model, models, InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        passwordHash: { type: String, required: true }
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    const user = this as any;
    if (!user.isModified("passwordHash")) return next();
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
        next();
    } catch (err) {
        next(err as any);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.passwordHash);
};

userSchema.methods.generateJWT = function (): string {
    const payload = { sub: this._id.toString(), email: this.email };
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET not set");
    const expiresIn = (process.env.JWT_EXPIRES_IN ?? "1h") as import("jsonwebtoken").SignOptions["expiresIn"];
    return jwt.sign(payload, secret, { expiresIn });
};

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = models.User || model("User", userSchema);


