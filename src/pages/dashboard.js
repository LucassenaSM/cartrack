import { useState, useEffect } from "react";
import Styles from "./dashboard.module.css";
import placaImg from "../python/placa.png";
import NavBar from "../components/NavBar/navBar.js";
import sessionToken from "../utils/sessionToken.js";
const Dashboard = () => {
  // const [placa, setPlaca] = useState("Desconhecido");
  useEffect(() => {
    sessionToken({ page: "login" });
  }, []);
 
  let sessionTokenValue = localStorage.getItem("sessionToken");
  if (!sessionTokenValue) {
    return null; 
  }


  const status = "Entrada";
  const nome = "Felipe Ribeiro Carneiro";
  const cargo = "Servidor - Professor";
  const siape = "1324143";
  const residente = "Residente";
  const placa = "AAA1A11";
  const entrada = "20/11/2024 18:40";
  const permanencia = "2 horas e 31 minutos";
  const entradas = "2 vezes";

  return (
    <>
      <div id={Styles.body}>
        <NavBar />
          <div id={Styles.main}>
            <div id={Styles.left}>
              <h1>Identificação</h1>
              <img src={placaImg} alt="Foto da Placa" />
              <div id={Styles.placa}>
                <h2 id={Styles.placaText}>Placa: {placa}</h2>
                <h2 id={Styles.status}>{status}</h2>
              </div>
              <div id={Styles.infos}>
                <h2>{nome}</h2>
                <h3>{cargo}</h3>
                <h3>Siape: {siape}</h3>
                <h4>{residente}</h4>
              </div>
            </div>
            <div id={Styles.right}>
              <h1>Dados Recentes</h1>
              <div className={Styles.dados}>
                <h2>Entrada</h2>
                <h3>{entrada}</h3>
              </div>
              <hr/>
              <div className={Styles.dados}>
                <h2>Saída</h2>
                <h3>{entrada}</h3>
              </div>
              <hr/>
              <div className={Styles.dados}>
                <h2>Permanência</h2>
                <h3>{permanencia}</h3>
              </div>
              <hr/>
              <div className={Styles.dados}>
                <h2>Entradas no dia</h2>
                <h3>{entradas}</h3>
              </div>
            </div>
            <div id={Styles.historico}>
            <h1>Histórico Recentes</h1>
            <div>
              <div className={Styles.cardsHist}>
                <div>
                  <h5>{nome}</h5>
                  <h5>{cargo}</h5>
                </div>
                <div>
                  <h5>Placa: {placa}</h5>
                  <h5>{status}</h5>
                    {/* <button
            onClick={() => {
              fetch("http://localhost:3030/run-python", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Erro na resposta do servidor");
                  }
                  return response.json();
                })
                .then((data) => {
                  if (!data) {
                    console.error("erro");
                  } else {
                    console.log(data.resultado);
                    setPlaca(data.resultado);
                  }
                })
                .catch((error) => {
                  console.error("Erro:", error);
                });
            }}
          >
            Script
          </button> */}
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
    </>
  );
};

export default Dashboard;
