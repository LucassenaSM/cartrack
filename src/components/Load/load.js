import Styles from "./load.module.css";
import React, { useState, useEffect } from "react";
import { Spinner } from "@nextui-org/react";

const Load = () => {
  const [loadingText, setLoadingText] = useState("Carregando a sua página");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText((prevText) => {
        if (prevText.endsWith("...")) {
          return "Carregando a sua página";
        } else {
          return prevText + ".";
        }
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
      <div id={Styles.body}>
        <Spinner label={loadingText} size='lg' id={Styles.spinner}/>
      </div>
  );
}

export default Load;
