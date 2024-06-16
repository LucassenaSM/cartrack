import express from 'express';
import cors from 'cors';
import { createPool } from '@vercel/postgres';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

app.post("/user", async (req, res) => {
    const { sessionToken } = req.body;
    try {
      const { rows } = await pool.query(
        "SELECT nome FROM login WHERE sessionToken = $1",
        [sessionToken.token]
      );
      if (rows.length > 0) {
        res.json({ name: rows[0].nome });
      } else res.json({ message: "Usuário não encontrado" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  });
  
  export default app;