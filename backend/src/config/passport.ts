import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import User from '#models/user';

dotenv.config();

// --- Estratégia Google OAuth 2.0 ---
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      const googleId = profile.id;
      const email = profile.emails?.[0].value;
      const displayName = profile.displayName;

      if (!email) {
        console.error('Google profile did not contain an email address.');
        return done(new Error('Email not provided by Google'), false);
      }

      try {
        let user = await User.findOne({ googleId });

        if (!user) {
          user = await User.create({
            googleId,
            displayName,
            email,
          });
        }

        return done(null, user);
      } catch (err: any) {
        return done(err, false);
      }
    },
  ),
);

// --- Estratégia JWT (para proteger outras rotas) ---
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET!,
    },
    async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

export default passport;
