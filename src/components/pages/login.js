import styles from "./login.module.css";
import carro from "../img/bmw.png";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import AlertError from "../layout/AlertError/alertError.js";

function Login() {
  const [showV, setShowV] = useState(false);
  const [showError, setShowError] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  function Validado(props) {
    return (
      <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Efetuado com Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
            Aguarde um momento, você será redirecionado automaticamente para
            página principal
          </h6>
          <hr></hr>
          <p>
            Você está totalmente adksakdsadakpd. Aqui, sua senha é criptografada. <br />
            Nós, da CarTrack, não temos acesso.
            <br />
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function logar(e) {
    e.preventDefault();
    if (user === ""){
      setShowError(true);
      setTitle("Campo de Usuário está Branco");
      setMessage("Por favor insira o Usuário");
    } else if (password ===""){
      setShowError(true);
      setTitle("Campo da Senha está Branco");
      setMessage("Por favor insira a Senha");
    } else{
    fetch("http://localhost:3030/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: parseInt(user),
        password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na resposta do servidor");
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "Os dados correspondem") {
          setShowV(true);
        } else {
          setShowError(true);
          setTitle("Dados não correspondentes");
          setMessage("O usuário ou senha estão incorretos");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        setShowError(true);
        setTitle("Error no Servidor");
        setMessage("Aguarde um momento");
      });
    }
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
            <p>
              <bold>
                Esqueceu sua senha?
                <br />
                Entre em contato com o administrador
              </bold>
            </p>
            <button>Entrar</button>
          </form>
        </div>
        <div>
          <div className={styles.overlay_panel}>
            <img src={carro} alt="Carro" />
          </div>
        </div>
      </div>
      <Validado show={showV} setShow={setShowV} />
      <AlertError
        Title={title}
        Message={message}
        show={showError}
        setShow={setShowError}
        onDismiss={() => setShowError(false)}
      />
    </body>
  );
}

export default Login;
