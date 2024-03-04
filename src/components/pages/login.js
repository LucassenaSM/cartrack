import styles from './login.module.css'
import carro from '../img/bmw.png';


function Login(){
    return (
        <body>
            <div className={styles.container} >
      <div className={styles.form_container}>
        <form className={styles.form}>
          <header >
            <h1>Login</h1>
            <span>Seja bem vindo ao CarTrack</span>
        </header>
          <input type="number" placeholder="Siape" />
          <input type="password" placeholder="Senha" />
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