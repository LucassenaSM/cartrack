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


app.post("/updateSessionToken", async (req, res) => {
  const { username, sessionToken } = req.body;
  const expiryDate = new Date(sessionToken.expiryDate);
  const sqlDatetime = `${expiryDate.getFullYear()}-${
    expiryDate.getMonth() + 1
  }-${expiryDate.getDate()} ${expiryDate.getHours()}:${expiryDate.getMinutes()}:${expiryDate.getSeconds()}`;

  try {
    await pool.query(
      "UPDATE login SET sessionToken = $1, expiryDate = $2 WHERE username = $3",
      [sessionToken.token, sqlDatetime, username]
    );
    res.json({ message: "Session token updated successfully" });
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
});

export default app;