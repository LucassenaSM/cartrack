  const sessionToken = (props) => {
    let sessionToken = localStorage.getItem("sessionToken");
    if (!sessionToken && props.pageAtual !== "login") {
      window.location.href = props.page;
      return;
    } else {
      try {
        sessionToken = JSON.parse(sessionToken);
      } catch (error) {
        console.error("Erro ao analisar o token de sessão:", error);
        localStorage.removeItem("sessionToken");
      }
      fetch("http://localhost:3030/readSessionToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionToken: sessionToken,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          let validade = new Date(data.expiryDate).getTime();

          if (
            !sessionToken ||
            (validade > Date.now() && props.pageAtual === "login")
          ) {
            window.location.href = props.page;
          }
          if (
            !sessionToken ||
            (validade < Date.now() && props.pageAtual !== "login")
          ) {
            window.location.href = props.page;
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
        });
    }
  };

  export default sessionToken;
