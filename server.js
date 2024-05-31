import express from "express";
import RateLimit from 'express-rate-limit';
import mysql from "mysql";
import cors from "cors";
import dotenv from 'dotenv';
import { PythonShell } from "python-shell";
const app = new express();
dotenv.config();

var limiter = RateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
});

app.use(limiter, cors({
  origin: "http://localhost:3000"
}), express.json());


try {
  const con = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

  con.connect(err => {
    if (err) throw err;
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  });

  app.get("/", (req, res) => {
    con.query("SELECT * FROM login", (erro, result) => {
      res.send(result);
      console.log(erro);
    });
  });

  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    con.query(
      "SELECT * FROM login WHERE Username = ?",
      [username],
      (error, results) => {
        if (error) {
          res.status(500).json({ message: "Erro no servidor" });
        } else if (results.length > 0) {
          const user = results[0];
          if (password === user.password) {
            res.json({ message: "Os dados correspondem" });
          } else {
            res.json({ message: "Senha incorreta" });
          }
        } else {
          res.json({ message: "Usuário não encontrado" });
        }
      }
    );
  });

  app.post("/updateSessionToken", (req, res) => {
    const { username, sessionToken } = req.body;
    const expiryDate = new Date(sessionToken.expiryDate);
    const sqlDatetime = `${expiryDate.getFullYear()}-${
      expiryDate.getMonth() + 1
    }-${expiryDate.getDate()} ${expiryDate.getHours()}:${expiryDate.getMinutes()}:${expiryDate.getSeconds()}`;
    con.query(
      "UPDATE login SET sessionToken = ?, expiryDate = ? WHERE username = ?",
      [sessionToken.token, sqlDatetime, username],
      (error, results) => {
        if (error) {
          console.error("Erro:", error);
          res.status(500).json({ message: "Erro no servidor" });
        } else {
          res.json({ message: "Session token updated successfully" });
        }
      }
    );
  });

  app.post("/readSessionToken", (req, res) => {
    const { sessionToken } = req.body;
    if (sessionToken) {
      con.query(
        "SELECT expiryDate FROM login WHERE sessionToken= ?",
        [sessionToken.token],
        (error, results) => {
          if (error) {
            console.error("Erro:", error);
            res.status(500).json({ message: "Erro no servidor" });
          } else {
            if (results.length > 0) {
              res.json({ expiryDate: results[0].expiryDate });
            } else {
              res.json({ message: "none" });
            }
          }
        }
      );
    }
  });

  app.post("/user", (req, res) => {
    const { sessionToken } = req.body;
    con.query(
      "SELECT nome FROM login WHERE sessionToken = ?",
      [sessionToken.token],
      (error, results) => {
        if (error) {
          res.status(500).json({ message: "Erro no servidor" });
        } else {
          if (results.length > 0) {
            res.json({ name: results[0].nome });
          } else res.json({ message: "Usuário não encontrado" });
        }
      }
    );
  });

  app.post("/run-python", (req, res) => {
    let options = {
      mode: "text",
      pythonOptions: ["-u"],
      scriptPath: "C:/Users/lucas/Documentos/Cartrack/src/python/",
    };

    PythonShell.run("app.py", options).then((message) => {
      console.log("Resulta:" + message);
      res.json({ resultado: message });
    });
  });

  app.listen("3030", () => {
    console.log("Servidor Pronto!");
  });
} catch (e) {
  console.error(e.message);
}

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
