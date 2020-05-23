import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import styled from '@emotion/styled';

import {timeConverter} from '../helpers/helpers';

const Titulo = styled.h1`
  font-family:'Bebas Neue', cursive;
  color:#fff;
  text-align:left;
  font-weight:700;
  font-size:20px;
  margin-bottom:50px;
  margin-top:15px;

  &::after{
    content:'';
    width:100px;
    height:6px;
    background-color:#66a2fe;
    display:block;
  }
`;

const Boton = styled.button`
    margin-top:5px;
    font-weight:bold;
    font-size:15px;
    padding:5px;
    background-color:#66a2fe;
    border:none;
    width:25%;
    border-radius:10px;
    color:#fff;
    margin: 0 auto;
    transition:all .3s ease;

    &:hover{
        background-color:#326ac0;
        cursor:pointer;
    }
`;

const Chart = ({resultadoTiempo}) => {

  const chartConfig = {
    type: "line",
    data: {
      labels: ['', '', '', '', '', '', '', '', '', '', ''],
      datasets: [
        {
          label: "Cotizacion de los ultimos 10 Dias",
          data: [],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 0, 0, 0.2)",
            "rgba(243, 0, 255, 0.2)",
            "rgba(0, 27, 255, 0.2)",
            "rgba(232, 255, 0, 0.2)",
            "rgba(0, 0, 0, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 0, 0, 1)",
            "rgba(243, 0, 255, 1)",
            "rgba(0, 27, 255, 1)",
            "rgba(232, 255, 0, 1)",
            "rgba(0, 0, 0, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  };

  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

    //OBTENER Y RECORRER LOS TIEMPOS DE CADA VALOR
    const tiempo = [];

    Array.from(resultadoTiempo).map(i => {
      tiempo.push(timeConverter(i.time));    
    })

    //OBTENER Y RECORRER CADA PRECIO
    const precios = [];

    Array.from(resultadoTiempo).map(i => {
      precios.push(i.close);    
    })

    //AGREGANDO LOS VALORES A LA GRAFICA
    function addData() {
      chartInstance.data.labels[0] = tiempo[0];
      chartInstance.data.datasets[0].data[0] = precios[0];

      chartInstance.data.labels[1] = tiempo[1];
      chartInstance.data.datasets[0].data[1] = precios[1];

      chartInstance.data.labels[2] = tiempo[2];
      chartInstance.data.datasets[0].data[2] = precios[2];

      chartInstance.data.labels[3] = tiempo[3];
      chartInstance.data.datasets[0].data[3] = precios[3];

      chartInstance.data.labels[4] = tiempo[4];
      chartInstance.data.datasets[0].data[4] = precios[4];

      chartInstance.data.labels[5] = tiempo[5];
      chartInstance.data.datasets[0].data[5] = precios[5];

      chartInstance.data.labels[6] = tiempo[6];
      chartInstance.data.datasets[0].data[6] = precios[6];

      chartInstance.data.labels[7] = tiempo[7];
      chartInstance.data.datasets[0].data[7] = precios[7];
      
      chartInstance.data.labels[8] = tiempo[8];
      chartInstance.data.datasets[0].data[8] = precios[8];

      chartInstance.data.labels[9] = tiempo[9];
      chartInstance.data.datasets[0].data[9] = precios[9];

      chartInstance.data.labels[10] = tiempo[10];
      chartInstance.data.datasets[0].data[10] = precios[10];

    chartInstance.update();
    }

  return (
    <div>
      <Titulo>Cotizacion de los Ultimos 10 Dias</Titulo>
      <Boton onClick={addData}>Graficar</Boton>
      {(resultadoTiempo === {}) ? null : <canvas ref={chartContainer} />}
    </div>
  );
};

export default Chart;