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


app.post("/readSessionToken", async (req, res) => {
  const { sessionToken } = req.body;

  try {
    const { rows } = await pool.query(
      "SELECT expiryDate FROM login WHERE sessionToken = $1",
      [sessionToken.token]
    );

    if (rows.length > 0) {
      res.json({ expiryDate: rows[0].expiryDate });
    } else {
      res.json({ message: "none" });
    }
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

export default app;