import styles from "./login.module.css";
import carro from "../img/bmw.png";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function Login() {
  const [showV, setShowV] = useState(false);
  const [showI, setShowI] = useState(false);

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
            Você está totalmente seguro. Aqui, sua senha é criptografada. <br /> Nós,
            da CarTrack, não temos acesso.<br/>
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  function Invalidado(props) {
    return (
      <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Dados não correspondentes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>
              O usuário ou senha estão incorretos 
          </h6>
          <hr></hr>
          <p>
            Você está totalmente seguro. Aqui, sua senha é criptografada.<br />Nós,
            da CarTrack, não temos acesso.<br/>
          </p>
        </Modal.Body>
      </Modal>
    );
  }


  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function logar(e) {
    e.preventDefault();
  fetch('http://localhost:3030/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    username: parseInt(user),
    password: password,
  }),
})
.then(response => {
  if (!response.ok) {
    throw new Error('Erro na resposta do servidor');
  }
  return response.json();
})
.then(data => {
  if (data.message === 'Os dados correspondem') {
    setShowV(true);
    console.log('Os dados correspondem');
  } else {
    console.log('Os dados não correspondem');
    setShowI(true);
  }
})
.catch(error => {
  console.error('Erro:', error);
});
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
      <Validado show={showV} setShow={setShowV} />
      <Invalidado show={showI} setShow={setShowI}/>
    </body>
  );
}

export default Login;
