import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { IUser, UserModel } from "./models/User";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: "/api/auth/google/callback"
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: (err: any, user?: any, info?: any) => void
        ) => {
            try {
                let user: IUser | null = await UserModel.findOne({ googleId: profile.id });

                if (!user) {
                    user = await UserModel.create({
                        googleId: profile.id,
                        email: profile.emails?.[0]?.value || "",
                        name: profile.displayName,
                        picture: profile.photos?.[0]?.value
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error, undefined);
            }
        }
    )
);

passport.serializeUser((user: any, done) => {
    done(null, user.id); // only store user ID in session
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user || false);
    } catch (error) {
        done(error, false);
    }
});

export default passport;
