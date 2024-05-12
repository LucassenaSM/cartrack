import Styles from "./notFoundPage.module.css";
import React, { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";
const NotFoundPage = () => {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    let sessionToken = localStorage.getItem('sessionToken');
    sessionToken = JSON.parse(sessionToken);
    if (sessionToken && sessionToken.expiryDate > Date.now()) {
      setLogin(true);
    }else{
      setLogin(false);
    }
  }, []);
  if (login) {
    return (
      <>
        <div className={Styles.all}>
          <div className={Styles.texts}>
          <h3>404</h3>
          <img src={logo} alt="logo CarTrack"/>
            <h1>Página não encontrada</h1>
            <h3>
              Desculpe, não conseguimos localizar a página que você está
              buscando.
            </h3>
          </div>
          <div className={Styles.button}>
            <button onClick={() => {window.location.href = "dashboard";}}>Voltar para a dashboard</button>
            <h4>Ou entre em contato com o administrador</h4>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={Styles.all}>
          <div className={Styles.texts}>
            <h3>404</h3>
            <img src={logo} alt="logo CarTrack"/>
            <h1>Página não encontrada</h1>
            <h3>
              Desculpe, não conseguimos localizar a página que você está
              buscando.
            </h3>
          </div>
          <div className={Styles.button}>
            <button onClick={() => {window.location.href = "login";}}>Voltar para o Login</button>
            <h4>Ou entre em contato com o administrador</h4>
          </div>
        </div>
      </>
    );
  }
};
export default NotFoundPage;
