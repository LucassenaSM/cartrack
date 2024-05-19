import Logo from "../../assets/img/logo.png";
import Style from "../NavBar/navBar.module.css";
import React, { useEffect, useState } from "react";
import { FaHome, FaRegUserCircle } from "react-icons/fa";
import { FaRegFileArchive } from "react-icons/fa";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { GiCctvCamera } from "react-icons/gi";
import { IoArrowBackOutline } from "react-icons/io5";
import AlertError from "../AlertError/alertError.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const [nome, setNome] = useState("");
  const [nomeOriginal, setNomeOriginal] = useState("");
  const [show, setShow] = useState(false);
  const [showError, setShowError] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [isFlex, setIsFlex] = useState(false);
  const [confirm, setConfirm] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (nome === "Deseja sair?") {
      timer = setTimeout(() => {
        setNome(nomeOriginal);
        setConfirm(false);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [nome, nomeOriginal]);

  const handleClick = () => {
    setConfirm(!confirm);
    if (nome !== "Deseja sair?") {
      setNome("Deseja sair?");
    } else {
      setNome(nomeOriginal);
      localStorage.removeItem("sessionToken");
      navigate('/login');
    }
  };

  const handleClickFlex = () => {
    setIsFlex(!isFlex);
  };
  useEffect(() => {
    const sessionToken = JSON.parse(localStorage.getItem("sessionToken"));
    axios.post("http://localhost:3030/user", {
      sessionToken: sessionToken,
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Erro na resposta do servidor");
        }
        if (response.data.name) {
          setNome(response.data.name);
          setNomeOriginal(response.data.name);
        } else {
          setShowError(true);
          setTitle("Erro no usuário");
          setMessage("Recarregue a pagina, não foi possivel achar o usuário");
          setNome("Usuário não Encontrado");
          setNomeOriginal("Usuário não Encontrado");
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
        setShowError(true);
        setTitle("Error no Servidor");
        setMessage("Aguarde um momento");
        setNome("Usuário não encontrado");
        setNomeOriginal("Usuário não Encontrado");
      });
  }, []);

  if (show) {
    return (
      <>
        <div id={Style.content}>
          <p></p>
        </div>
        <div className={Style.all}>
          <div className={Style.header}>
            <div>
              <img src={Logo} alt="Logo CarTrack" className={Style.logo} />
              <h1>CarTrack</h1>
            </div>
            <IoArrowBackOutline
              onClick={() => setShow(false)}
              className={Style.arrow}
            />
          </div>
          <ol className={Style.nav}>
            <div className={Style.pages} onClick={() => navigate('/dashboard')}>
              <FaHome size={32} />
              <li className={Style.page}>Dashboard</li>
            </div>
            <div className={Style.pages}>
              <FaRegFileArchive size={32} />
              <li className={Style.page}>Histórico</li>
            </div>
            <div className={Style.pages}>
              <TbDeviceDesktopAnalytics size={32} />
              <li className={Style.page}>Estatísticas</li>
            </div>
            <div className={Style.pages} onClick={() => navigate('/cadastro')}>
              <FaRegUserCircle size={32} />
              <li className={Style.page}>Usuários</li>
            </div>
            <div className={Style.pages}>
              <GiCctvCamera size={32} />
              <li className={Style.page}>Câmera</li>
            </div>
          </ol>
          <div onClick={handleClick} className={Style.profile}>
            <img
              src="https://media.licdn.com/dms/image/D4D03AQGBSWCdI2cnbA/profile-displayphoto-shrink_800_800/0/1678651276903?e=2147483647&v=beta&t=KYvT9bOa5dU2leD2AD4ezUikGD1lbuVpD-lYwvJmSeQ"
              alt="Foto do Perfil"
              className={Style.imgProfile}
            />
            <h1 className={confirm ? Style.red : Style.black}>{nome}</h1>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div id={Style.content}></div>
        <div className={Style.allOff}>
          <div className={Style.headerOff}>
            <img src={Logo} alt="Logo CarTrack" className={Style.logo} />
            <IoArrowBackOutline
              style={{ transform: "scaleX(-1)", cursor: "pointer" }}
              onClick={() => setShow(true)}
            />
          </div>
          <ol className={Style.navOff}>
            <div className={Style.pagesOff} onClick={() => navigate('/dashboard')}>
              <FaHome size={32} />
            </div>
            <div className={Style.pagesOff}>
              <FaRegFileArchive size={32} />
            </div>
            <div className={Style.pagesOff}>
              <TbDeviceDesktopAnalytics size={32} />
            </div>
            <div className={Style.pagesOff} onClick={() => navigate('/cadastro')}>
              <FaRegUserCircle size={32} />
            </div>
            <div className={Style.pagesOff}>
              <GiCctvCamera size={32} />
            </div>
          </ol>
          <div onClick={handleClickFlex} className={Style.profileOff}>
            <img
              src="https://media.licdn.com/dms/image/D4D03AQGBSWCdI2cnbA/profile-displayphoto-shrink_800_800/0/1678651276903?e=2147483647&v=beta&t=KYvT9bOa5dU2leD2AD4ezUikGD1lbuVpD-lYwvJmSeQ"
              alt="Foto do Perfil"
              className={Style.imgProfileOff}
            />
          </div>
          <div
            className={`${Style.profileOptionsOff} ${
              isFlex ? Style.flexOff : ""
            }`}
          >
            <button
              className={Style.logout_button}
              onClick={() => {
                localStorage.removeItem("sessionToken");
                window.location.href = "login";
              }}
            >
              Sair
            </button>
          </div>
        </div>
        <AlertError
          Title={title}
          Message={message}
          show={showError}
          setShow={setShowError}
          onDismiss={() => setShowError(false)}
        />
      </>
    );
  }
};

export default NavBar;