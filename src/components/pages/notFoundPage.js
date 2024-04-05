import Styles from "./notFoundPage.module.css";
import React, { useState } from "react";

const NotFoundPage = () => {
  const [login, setLogin] = useState(false);

  if (login) {
    return (
      <>
        <div className={Styles.all}>
          <div className={Styles.texts}>
            <h3>404</h3>
            <h1>Página não encontrada</h1>
            <h3>
              Desculpe, não conseguimos localizar a página que você está
              buscando.
            </h3>
          </div>
          <div className={Styles.button}>
            <button>Voltar para a dashboard</button>
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
            <h1>Página não encontrada</h1>
            <h3>
              Desculpe, não conseguimos localizar a página que você está
              buscando.
            </h3>
          </div>
          <div className={Styles.button}>
            <button>Voltar para o Login</button>
            <h4>Ou entre em contato com o administrador</h4>
          </div>
        </div>
      </>
    );
  }
};
export default NotFoundPage;
