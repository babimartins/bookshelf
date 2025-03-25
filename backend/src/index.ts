import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "@config/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Para interpretar JSON no corpo das requisições
app.use(cors()); // Para permitir requisições de diferentes origens

// Conectar ao MongoDB
connectDB().then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

// Rota de teste
app.get("/", (req, res) => {
    res.send("📚 Welcome to the Bookshelf API!");
});
