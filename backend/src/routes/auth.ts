import dotenv from 'dotenv';
import express, { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';

import { IUser } from '#models/user';

dotenv.config();

const router: Router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

if (!JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1);
}

// --- Rota para iniciar o fluxo de autenticação do Google ---
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  }),
);

// --- Rota de Callback do Google ---
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${FRONTEND_URL}/login?error=google_failed`,
    session: false,
  }),
  (req: Request, res: Response) => {
    if (!req.user) {
      console.error(
        'Google authentication succeeded but user object not found in request.',
      );
      return res.redirect(`${FRONTEND_URL}/login?error=auth_failed`);
    }

    const user = req.user as IUser;

    const payload = {
      id: user.id || (user as any)._id,
      email: user.email,
    };

    try {
      const token = jwt.sign(payload, JWT_SECRET!, {
        expiresIn: Number(JWT_EXPIRES_IN || 0),
      });

      res.redirect(`${FRONTEND_URL}/auth/callback#token=${token}`);
    } catch (error) {
      console.error('Error signing JWT:', error);
      res.redirect(`${FRONTEND_URL}/login?error=token_signing_failed`);
    }
  },
);

// --- Rota de exemplo para obter dados do usuário logado (protegida por JWT) ---
router.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({
          message: 'Unauthorized - User not found after JWT validation',
        });
        return;
      }

      const user = req.user as IUser;
      res.status(200).json(user);
    } catch (error) {
      console.error('Error in /me handler:', error);
      next(error);
    }
  },
);

export default router;
