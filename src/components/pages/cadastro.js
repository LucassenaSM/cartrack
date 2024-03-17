import styles from "./login.module.css";
import carro from "../img/bmw.png";

const Cadastro = () => {
    return (
       <body>
        <div className={styles.container}>
        <div className={styles.form_container}>
          <form className={styles.form} /*onSubmit={logar}*/>
            <header>
              <h1>Cadastro</h1>
              <span>Seja bem vindo ao CarTrack</span>
            </header>
            <input
              type="number"
              placeholder="Usuário"
              //onChange={(e) => setUser(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              //onChange={(e) => setPassword(e.target.value)}
            />
            <p>
              <bold>
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
       </body>
    )
}

export default Cadastro;