import styles from './login.module.css'
import carro from '../img/bmw.png';
import React, { useState } from 'react';

function Login(){


  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  function logar(e){
    e.preventDefault();


      console.log('User:', user, ' Password:', password);

  }

    return (
        <body>
            <div className={styles.container} >
      <div className={styles.form_container}>
        <form className={styles.form} onSubmit={logar}>
          <header >
            <h1>Login</h1>
            <span>Seja bem vindo ao CarTrack</span>
        </header>
          <input type="number" placeholder="Usúario"  onChange={(e) => setUser(e.target.value)}/>
          <input type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)}/>
          <a href="/">Esqueceu sua senha?</a>
          <button>Entrar</button>
        </form>
      </div>
      <div>
        <div className={styles.overlay_panel}>
            <img src={carro} alt='Carro'/>
        </div>
      </div>
    </div>
        </body>

    )
}

export default Login