import express from "express";
import cors from "cors";
import { createPool } from "@vercel/postgres";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3030;

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
  express.json()
);

const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

app.use(express.json());

app.post("/login", async (req, res) => {
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

app.post("/readSessionToken", async (req, res) => {
  const { sessionToken } = req.body;
  try {
    if (sessionToken){
    const { rows } = await pool.query(
      "SELECT expiryDate FROM login WHERE sessionToken = $1",
      [sessionToken.token]
    );

    if (rows.length > 0) {
      res.json({ expiryDate: rows[0].expirydate });
    } else {
      res.json({ message: "none" });
    }}
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ message: "Erro no servidor" });
  }
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const db = [
  {
    Nome: "Felipe Ribeiro Carneir",
    Ocupacão: "Servidor - Professor",
    Placa: "AAA1A11",
    Siape: "1324143",
    Residente: false,
  },
  {
    Nome: "Felipe Ribeiro Carneiro",
    Ocupacão: "Servidor - Administrativo",
    Placa: "AAA1A11",
    Siape: "1324143",
    Residente: true,
  },
  {
    Nome: "Felipe Ribeiro Carneiro",
    Ocupacão: "Servidor - Professor",
    Placa: "AAA1A11",
    Siape: "1324143",
    Residente: true,
  },
  {
    Nome: "Lucas Sena",
    Ocupacão: "Servidor - Professor",
    Placa: "2131232",
    Siape: "1324143",
    Residente: true,
  },
  {
    Nome: "Felipe Ribeiro Carneiro",
    Ocupacão: "Servidor - Professor",
    Placa: "AAA1A11",
    Siape: "1324143",
    Residente: true,
  },
  {
    Nome: "Felipe Ribeiro Carneiro",
    Ocupacão: "Servidor - Administrativo",
    Placa: "AAA1A11",
    Siape: "1324143",
    Residente: true,
  },
  {
    Nome: "Felipe Ribeiro Carneiro",
    Ocupacão: "Servidor - Professor",
    Placa: "AAA1A11",
    Siape: "1324143",
    Residente: true,
  },
  {
    Nome: "Felipe Ribeiro Carneiro",
    Ocupacão: "Servidor - Professor",
    Placa: "AAA1A11",
    Siape: "1324143",
    Residente: true,
  },
  {
    Nome: "Felipe Ribeiro Carneiro",
    Ocupacão: "Servidor - Professor",
    Placa: "AAA1A11",
    Siape: "1324143",
    Residente: false,
  },
  {
    Nome: "Felipe Ribeiro Carneiro",
    Ocupacão: "Servidor - Professor",
    Placa: "AAA1A11",
    Siape: "1324143",
    Residente: false,
  },
  {
    Nome: "Felipe Ribeiro Carneiro",
    Ocupacão: "Servidor - Professor",
    Placa: "AAA1A11",
    Siape: "1324143",
    Residente: false,
  },
  {
    Nome: "Felipe Ribeiro Carneiro",
    Ocupacão: "Servidor - Professor",
    Placa: "AAA1A11",
    Siape: "1324143",
    Residente: false,
  },
  {
    Nome: "Felipe Ribeiro Carneiro",
    Ocupacão: "Servidor - Professor",
    Placa: "AAA1A11",
    Siape: "1324143",
    Residente: false,
  },
];

app.get("/usuarios", (req, res) => {
  res.json(db);
});
