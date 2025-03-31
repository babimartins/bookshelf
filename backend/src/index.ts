import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import connectDB from './config/db.ts';
import router from './routes/auth.ts';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use('/auth', router);

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));

// Conectar ao MongoDB
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Bookshelf API!');
});
