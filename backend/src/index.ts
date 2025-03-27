import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.ts'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())

// Conectar ao MongoDB
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
})

// Rota de teste
app.get('/', (req, res) => {
  res.send('📚 Welcome to the Bookshelf API!')
})
