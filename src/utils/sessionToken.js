import axios from "axios";

const sessionToken = (props, navigate) => {
  let sessionToken = localStorage.getItem("sessionToken");
  if (!sessionToken && props.pageAtual !== "login") {
    navigate(props.page);
    return;
  } else {
    try {
      sessionToken = JSON.parse(sessionToken);
    } catch (error) {
      console.error("Erro ao analisar o token de sessão:", error);
      localStorage.removeItem("sessionToken");
    }
    axios.post("http://localhost:3030/readSessionToken", {
      sessionToken: sessionToken,
    })
      .then((response) => {
        let validade = new Date(response.data.expiryDate).getTime();

        if (
          !sessionToken ||
          (validade > Date.now() && props.pageAtual === "login")
        ) {
          navigate(props.page);
        }
        if (
          !sessionToken ||
          (validade < Date.now() && props.pageAtual !== "login")
        ) {
          navigate(props.page);
        }
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }
};

export default sessionToken;
