import Logo from "./logo.png";
import Style from "./navBar.module.css";
import React, { useState } from "react";
import { FaHome, FaRegUserCircle } from "react-icons/fa";
import { FaRegFileArchive } from "react-icons/fa";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { GiCctvCamera } from "react-icons/gi";
import { IoArrowBackOutline } from "react-icons/io5";
import AlertError from "../AlertError/alertError.js";

const NavBar = () => {
    const [nome, setNome] = useState("");
    const [show, setShow] = useState(false);
    const [showError, setShowError] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    fetch("http://localhost:3030/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        //   name, // assuming this is the first name
        //   surname // assuming you have the surname available
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na resposta do servidor");
          }
          return response.json();
        })
        .then((data) => {
          if (data.name !== "" && data.surname !== "") {
              setNome(`${data.name} ${data.surname}`);
          } else {
            setShowError(true);
            setTitle("Erro no usuário");
            setMessage("Recarregue a pagina, não foi possivel achar o usuário");
            setNome("Usuário não Encontrado")
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
          setShowError(true);
          setTitle("Error no Servidor");
          setMessage("Aguarde um momento");
          setNome("Usuário não encontrado")
        });


    if(show){
    return (
    <>
      <div className={Style.all}>
        <div className={Style.header}>
          <img src={Logo} alt="Logo CarTrack" className={Style.logo} />
          <IoArrowBackOutline onClick={() => setShow(false)}/>
        </div>
        <ol className={Style.nav}>
          <div className={Style.pages}>
            <FaHome size={32} />
            <li className={Style.page}>Início</li>
          </div>
          <div className={Style.pages}>
            <FaRegFileArchive size={32} />
            <li className={Style.page}>Histórico</li>
          </div>
          <div className={Style.pages}>
            <TbDeviceDesktopAnalytics size={32} />
            <li className={Style.page}>Estatísticas</li>
          </div>
          <div className={Style.pages}>
            <FaRegUserCircle size={32} />
            <li className={Style.page}>Usuários</li>
          </div>
          <div className={Style.pages}>
            <GiCctvCamera size={32} />
            <li className={Style.page}>Câmera</li>
          </div>
        </ol>
        <div className={Style.profile}>
          <img
            src="https://media.licdn.com/dms/image/D4D03AQGBSWCdI2cnbA/profile-displayphoto-shrink_800_800/0/1678651276903?e=2147483647&v=beta&t=KYvT9bOa5dU2leD2AD4ezUikGD1lbuVpD-lYwvJmSeQ"
            alt="Foto do Perfil"
            className={Style.imgProfile}
          />
          <h1>{nome}</h1>
        </div>
      </div>
    </>
  );
}else{
    return(
<>
      <div className={Style.allOff}>
        <div className={Style.headerOff}>
          <img src={Logo} alt="Logo CarTrack" className={Style.logo} />
          <IoArrowBackOutline style={{ transform: 'scaleX(-1)' }} onClick={() => setShow(true)}/>
        </div>
        <ol className={Style.navOff}>
          <div className={Style.pagesOff}>
            <FaHome size={32} />
          </div>
          <div className={Style.pagesOff}>
            <FaRegFileArchive size={32} />
          </div>
          <div className={Style.pagesOff}>
            <TbDeviceDesktopAnalytics size={32} />
          </div>
          <div className={Style.pagesOff}>
            <FaRegUserCircle size={32} />
          </div>
          <div className={Style.pagesOff}>
            <GiCctvCamera size={32} />
          </div>
        </ol>
        <div className={Style.profileOff}>
          <img
            src="https://media.licdn.com/dms/image/D4D03AQGBSWCdI2cnbA/profile-displayphoto-shrink_800_800/0/1678651276903?e=2147483647&v=beta&t=KYvT9bOa5dU2leD2AD4ezUikGD1lbuVpD-lYwvJmSeQ"
            alt="Foto do Perfil"
            className={Style.imgProfile}
          />
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
    )
};
};

export default NavBar;
