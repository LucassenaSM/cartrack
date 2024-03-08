import express from "express";
import mysql from "mysql";
import cors from "cors";
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
    con.query("SELECT * FROM login WHERE Username = ?", [username], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro no servidor' });
      } else 
    if (results.length > 0) {
        const user = results[0];
        console.log(user);
        // Comparar a senha fornecida com a senha do banco de dados
        if (password === user.password) {
          res.json({ message: 'Os dados correspondem' });
        } else {
          res.json({ message: 'Senha incorreta' });
        }
      } else {
        res.json({ message: 'Usuário não encontrado' });
      }
    });
  });

  app.listen("3030", () => {
    console.log("Running server");
  });
} catch (e) {
  console.error(e.message);
}
