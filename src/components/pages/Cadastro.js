import NavBar from "../layout/navBar.js";
import React, { useEffect } from "react";

const Cadastro = () => {
  useEffect(() => {
    let sessionToken = localStorage.getItem("sessionToken");
    try {
      sessionToken = JSON.parse(sessionToken);
    } catch (error) {
      console.error("Erro ao analisar o token de sessão:", error);
      localStorage.removeItem("sessionToken");
    }

    if (!sessionToken || sessionToken.expiryDate < Date.now()) {
      window.location.href = "login";
    }
  }, []);

  return (
    <>
      <NavBar />
    </>
  );
};

export default Cadastro;
