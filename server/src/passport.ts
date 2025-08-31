import GoogleStrategy from 'passport-google-oauth20'
import passport from 'passport'

const googleStrategy = GoogleStrategy.Strategy

passport.use(new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Here you would typically:
        // 1. Check if user exists in your database
        // 2. Create new user if they don't exist
        // 3. Return the user object

        const user = {
            googleId: profile.id,
            email: profile.emails?.[0]?.value,
            name: profile.displayName,
            picture: profile.photos?.[0]?.value
        }

        return done(null, user)
    } catch (error) {
        return done(error as Error, false)
    }
}))

passport.serializeUser((user: any, done) => {
    done(null, user)
})

passport.deserializeUser((user: any, done) => {
    done(null, user || false)
})

export default passport