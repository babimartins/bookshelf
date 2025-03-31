import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../types';

dotenv.config();

const router = express.Router();

// Rota para iniciar login com Google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

// Rota de callback após login bem-sucedido
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const user = req.user as User;
    // Gerar um token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' },
    );
    // Enviar o token para o frontend via query param (ou cookie)
    res.redirect(`${process.env.FRONTEND_URL}/auth?token=${token}`);
  },
);

export default router;
