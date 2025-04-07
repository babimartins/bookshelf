import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import User from '#models/user';

dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;
const JWT_SECRET = process.env.JWT_SECRET;

if (
  !GOOGLE_CLIENT_ID ||
  !GOOGLE_CLIENT_SECRET ||
  !GOOGLE_CALLBACK_URL ||
  !JWT_SECRET
) {
  console.error(
    'FATAL ERROR: Missing required Passport environment variables.',
  );
  process.exit(1);
}

// --- Estratégia Google OAuth 2.0 ---
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleId = profile.id;
      const email = profile.emails?.[0].value;
      const displayName =
        profile.displayName || profile.name?.givenName || 'User';

      if (!email) {
        console.error(
          'Google profile did not contain an email address. Profile:',
          profile,
        );
        return done(new Error('Email not provided by Google'), undefined);
      }

      try {
        let user = await User.findOne({ googleId: googleId });

        if (!user) {
          user = await User.findOne({ email: email });
          if (user) {
            user.googleId = googleId;
            if (!user.displayName || user.displayName === 'User') {
              user.displayName = displayName;
            }
            await user.save();
          } else {
            user = await User.create({
              googleId,
              email,
              displayName,
            });
            console.log(`New user created via Google: ${email}`);
          }
        } else {
          console.log(`User found via Google: ${email}`);
        }

        return done(null, user);
      } catch (err: any) {
        console.error(
          'Error during Google OAuth strategy DB interaction:',
          err,
        );
        return done(err, undefined);
      }
    },
  ),
);

// --- Estratégia JWT (para proteger outras rotas) ---
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);

        if (user) {
          return done(null, user);
        } else {
          console.warn(`JWT valid but user not found in DB: ${jwtPayload.id}`);
          return done(null, false);
        }
      } catch (err) {
        console.error('Error during JWT strategy DB interaction:', err);
        return done(err, false);
      }
    },
  ),
);

export default passport;
