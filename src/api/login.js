import express from 'express';
import cors from 'cors';
import { createPool } from '@vercel/postgres';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const corsOptions = {
  origin: 'https://cartrack-rosy.vercel.app', 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json());

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const { rows } = await pool.sql`
      SELECT * FROM login WHERE username = ${username};
    `;

    if (rows.length > 0) {
      const user = rows[0];
      if (password === user.password) {
        res.json({ message: "Os dados correspondem" });
      } else {
        res.json({ message: "Senha incorreta" });
      }
    } else {
      res.json({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
});

export default app;