import NavBar from "../../components/NavBar/navBar.js";
import Styles from "./estatisticas.module.css";
// import Grafico from "../../components/grafico.js";
import React, { useEffect, useRef, useState } from "react";
import Load from "../../components/Load/load.js";
import Chart from "chart.js/auto";
import { getUsuarios } from "../../api.js";

const Estatisticas = () => {
  const [data, setData] = useState();
  const [load, setLoad] = useState(true);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      await getUsuarios()
      .then((response) => {
        let json = response.data;
        setLoad(false);
        setData(json);
      })
    };
    fetchData();
    setLoad(false);
  }, []);

  const Residentes = (data) => {
    return data.filter((item) => item.Residente).length;
  };

  const dataLength = data ? data.length : 0;
  const numResidentes = data ? Residentes(data) : 0;

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: ["Não residentes", "Residentes"],
          datasets: [
            {
              label: "Número de pessoas",
              data: [dataLength - numResidentes, numResidentes],
              borderWidth: 1,
            },
          ],
        },
      });
    }
  }, [data, numResidentes, dataLength]);

  return (
    <>
      {load && (
        <div className="overlay">
          <Load />
        </div>
      )}
      <div id={Styles.body}>
        <NavBar />
        <div id="allah" className={Styles.Grafico}>
          <canvas ref={chartRef} />
        </div>
      </div>
    </>
  );
};

export default Estatisticas;
