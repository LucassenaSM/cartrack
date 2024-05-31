import css from "./login.module.css";
import carro from "../../assets/img/bmw.png";
import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import AlertError from "../../components/AlertError/alertError.js";
import { v4 as uuidv4 } from "uuid";
import sessionToken from "../../utils/sessionToken.js";
import { useNavigate } from "react-router-dom";
import { login, updateSessionToken } from "../../api.js";

function Login() {
  const [showV, setShowV] = useState(false);
  const [showError, setShowError] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    sessionToken({ page: "/dashboard", pageAtual: "login" }, navigate);
  }, [navigate]);

  function generateUniqueSessionToken() {
    const sessionToken = uuidv4();
    const expiryDate = Date.now() + 24 * 60 * 60 * 1000;
    return { token: sessionToken, expiryDate: expiryDate };
  }

  function Validado(props) {
    return (
      <Modal show={props.show} onHide={() => props.setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Efetuado com Sucesso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Aguarde um momento, você será redirecionado automaticamente para
            página principal
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function logar(e) {
    e.preventDefault();
    if (user === "") {
      setShowError(true);
      setTitle("Campo de Usuário está Branco");
      setMessage("Por favor insira o Usuário");
    } else if (password === "") {
      setShowError(true);
      setTitle("Campo da Senha está Branco");
      setMessage("Por favor insira a Senha");
    } else {
      try {
        login(parseInt(user), password)
        .then(response => {
        if (response.data.message === "Os dados correspondem") {
          setShowV(true);
          const sessionToken = generateUniqueSessionToken();
          localStorage.setItem("sessionToken", JSON.stringify(sessionToken));
          updateSessionToken(user, sessionToken);
          if (JSON.parse(localStorage.getItem("sessionToken"))) {
            setTimeout(function () {
              navigate("/dashboard");
            }, 2000);
          }
        } else {
          setShowError(true);
          setTitle("Dados não correspondentes");
          setMessage("O usuário ou senha estão incorretos");
        }
      });
      } catch (error) {
        console.error("Erro:", error);
        setShowError(true);
        setTitle("Erro no Servidor");
        setMessage("Aguarde um momento", error);
      }
    }
  }

  return (
    <div className={css.corpo}>
      <div className={css.container}>
        <div className={css.form_container}>
          <form className={css.form_class} onSubmit={logar}>
            <header className={css.header_class}>
              <h1 className={css.h1_class}>LOGIN</h1>
              <span className={css.span_class}>Seja bem vindo ao CarTrack</span>
            </header>
            <input
              className={css.input_class}
              type="number"
              placeholder="Usuário"
              onChange={(e) => setUser(e.target.value)}
            />
            <input
              className={css.input_class}
              type="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={css.button_class}>Entrar</button>
            <p className={css.p_class}>
              Esqueceu sua senha?
              <br />
              Entre em contato com o administrador
            </p>
          </form>
        </div>
        <div>
          <div className={css.overlay_panel}>
            <img className={css.img_class} src={carro} alt="Carro" />
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
    </div>
  );
}

export default Login;
