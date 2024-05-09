import express from "express";
import mysql from "mysql";
import cors from "cors";
import { PythonShell } from "python-shell";
const app = new express();

app.use(
  cors({
    origin: "http://localhost:3000",
  }),
  express.json()
);

try {
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "login",
  });
  app.get("/", (req, res) => {
    con.query("SELECT * FROM login", (erro, result) => {
      res.send(result);
      console.log(erro);
    });
  });

  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    // Consulta para selecionar o usuário com o nome de usuário fornecido
    con.query(
      "SELECT * FROM login WHERE Username = ?",
      [username],
      (error, results) => {
        if (error) {
          res.status(500).json({ message: "Erro no servidor" });
        } else if (results.length > 0) {
          const user = results[0];
          console.log(user);
          // Comparar a senha fornecida com a senha do banco de dados
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
          } else {
            res.json({ message: "Usuário não encontrado" });
          }
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
  
    PythonShell.run("app.py", options).then(message => {
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
    nome: 'Felipe Ribeiro Carneir',
    ocupacao: 'Servidor - Professor',
    placa: 'AAA1A11',
    siape: '1324143',
    residente: false,
  },
  {
    nome: 'Felipe Ribeiro Carneiro',
    ocupacao: 'Servidor - Administrativo',
    placa: 'AAA1A11',
    siape: '1324143',
    residente: true,
  },
  {
    nome: 'Felipe Ribeiro Carneiro',
    ocupacao: 'Servidor - Professor',
    placa: 'AAA1A11',
    siape: '1324143',
    residente: true,
  },
  {
    nome: 'Felipe Ribeiro Carneiro',
    ocupacao: 'Servidor - Professor',
    placa: 'AAA1A11',
    siape: '1324143',
    residente: true,
  },
  {
    nome: 'Felipe Ribeiro Carneiro',
    ocupacao: 'Servidor - Professor',
    placa: 'AAA1A11',
    siape: '1324143',
    residente: true,
  },
  {
    nome: 'Felipe Ribeiro Carneiro',
    ocupacao: 'Servidor - Administrativo',
    placa: 'AAA1A11',
    siape: '1324143',
    residente: true,
  },
  {
    nome: 'Felipe Ribeiro Carneiro',
    ocupacao: 'Servidor - Professor',
    placa: 'AAA1A11',
    siape: '1324143',
    residente: true,
  },
  {
    nome: 'Felipe Ribeiro Carneiro',
    ocupacao: 'Servidor - Professor',
    placa: 'AAA1A11',
    siape: '1324143',
    residente: false,
  },
  {
    nome: 'Felipe Ribeiro Carneiro',
    ocupacao: 'Servidor - Professor',
    placa: 'AAA1A11',
    siape: '1324143',
    residente: false,
  },
  {
    nome: 'Felipe Ribeiro Carneiro',
    ocupacao: 'Servidor - Professor',
    placa: 'AAA1A11',
    siape: '1324143',
    residente: false,
  },
  {
    nome: 'Felipe Ribeiro Carneiro',
    ocupacao: 'Servidor - Professor',
    placa: 'AAA1A11',
    siape: '1324143',
    residente: false,
  },
  {
    nome: 'Felipe Ribeiro Carneiro',
    ocupacao: 'Servidor - Professor',
    placa: 'AAA1A11',
    siape: '1324143',
    residente: false,
  },
  {
    nome: 'Felipe Ribeiro Carneiro',
    ocupacao: 'Servidor - Professor',
    placa: 'AAA1A11',
    siape: '1324143',
    residente: false,
  },
];

app.get('/usuarios', (req, res) => {
  res.json(db);
});
