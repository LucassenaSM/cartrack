import styles from "./login.module.css";
import carro from "../img/bmw.png";
import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';



function Login() {

    function Confirm() {
        const [show, setShow] = useState(true);
      
        return (
          <>
            <Alert show={show} variant="success">
              <Alert.Heading>Login Efetuado com Sucesso</Alert.Heading>
              <p>
                Aguarde um momento, Voce será redirecionado automaticamente para página principal 
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={() => setShow(false)} variant="outline-success">
                  Fechar
                </Button>
              </div>
            </Alert>
      
            {!show && <Button onClick={() => setShow(true)}>Mostrar Alerta</Button>}
          </>
        );
      }

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function logar(e) {
    e.preventDefault();

    console.log("User:", user, " Password:", password);
    Confirm()
  }
  return (
    <body>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={logar}>
            <header>
              <h1>LOGIN</h1>
              <span>Seja bem vindo ao CarTrack</span>
            </header>
            <input
              type="number"
              placeholder="Usuário"
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="/">Esqueceu sua senha?</a>
            <button>Entrar</button>
          </form>
        </div>
        <div>
          <div className={styles.overlay_panel}>
            <img src={carro} alt="Carro" />
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
