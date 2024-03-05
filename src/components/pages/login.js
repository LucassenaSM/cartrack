import styles from "./login.module.css";
import carro from "../img/bmw.png";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function Login() {
  const [show, setShow] = useState(false);

  function Confirm(props) {
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
            Você está totalmente seguro. Aqui, sua senha é criptografada. Nós,
            da CarTrack, não temos acesso.<br></br>
            {user} Senha: {password}
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function logar(e) {
    e.preventDefault();

    console.log("User:", user, " Password:", password);

    setShow(true);
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
      <Confirm show={show} setShow={setShow} />
    </body>
  );
}

export default Login;
