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
    // fetch('https://meuapi.com/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username: user,
    //     password: password,
    //   }),
    // })
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error('Erro na resposta do servidor');
    //   }
    //   return response.json();
    // })
    // .then((data) => {
    //   if (data.ussername === user && data.password === password) {
    //     // Os dados correspondem
    //     console.log('Os dados correspondem');
    // }})
    // .catch((error) => {
    //   console.error('Erro:', error);
    // });
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
            <p><bold>Esqueceu sua senha?<br />Entre em contato com o administrador</bold></p>
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
