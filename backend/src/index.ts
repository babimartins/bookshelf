import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import connectDB from '#config/db';
import authRoutes from '#routes/auth';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
  }),
);
app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Bookshelf API!');
});

// --- Middleware de Tratamento de Erros Global ---
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Error:', err.stack || err);

  const statusCode = 500;

  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: 'Internal Server Error',
  });
});

// --- Conexão com DB e Inicialização do Servidor ---
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to connect to DB, server not started:', err);
    process.exit(1);
  });
