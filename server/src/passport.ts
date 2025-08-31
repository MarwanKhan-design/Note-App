import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { IUser, UserModel } from "./models/User";
import jwt from "jsonwebtoken";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback", // important for Vercel
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: (err: any, user?: any) => void
        ) => {
            try {
                let user: IUser | null = await UserModel.findOne({ googleId: profile.id });

                if (!user) {
                    user = await UserModel.create({
                        googleId: profile.id,
                        email: profile.emails?.[0]?.value || "",
                        name: profile.displayName,
                        picture: profile.photos?.[0]?.value,
                    });
                }

                // ✅ Instead of session, create JWT
                if (user) {
                    const token = jwt.sign(
                        { id: user._id, email: user.email },
                        process.env.JWT_SECRET!,
                        { expiresIn: "7d" }
                    );
                    return done(null, { user, token });
                }
                return done(null, false);
            } catch (error) {
                return done(error, undefined);
            }
        }
    )
);

export default passport;
