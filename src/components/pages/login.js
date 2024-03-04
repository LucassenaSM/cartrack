import styles from "./login.module.css";
import carro from "../img/bmw.png";
import { useState } from "react";


function Login() {

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');



  function logar(e){
    e.preventDefault();

  console.log('User:', user, 'senha', password);

  
  }

  return (
    <body>
      <div className={styles.container}>
        <div className={styles.form_container}>
          <form className={styles.form} onSubmit={logar}>
            <header>
              <h1>Login</h1>
              <span>Seja bem vindo ao CarTrack</span>
            </header>
            <label for="user">
              <input type="number" placeholder="Usuário" name="user" onChange={(e) => setUser(e.target.value)}/>
            </label>
            <label for="password">
              <input type="password" placeholder="Senha" name="password" onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <a href="#">Esqueceu sua senha?</a>
            <input type="submit" className={styles.button} value="Entrar" />
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
