import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import styled from '@emotion/styled';

import {timeConverter, addData} from '../helpers/helpers';

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
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          backgroundColor: "rgba(57, 225, 20, 0.2)",
          borderColor: "rgba(57, 225, 20, 1)",
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

    if(tiempo != [] || precios != []){
      setTimeout(() => {
        document.getElementById('graficar').click();        
      }, 3500)
    }

    const handleClick = () => {
      addData(chartInstance, tiempo, precios);
    }


  return (
    <div>
      <Titulo>Cotizacion de los Ultimos 10 Dias</Titulo>
      <Boton hidden="true" id="graficar" onClick={handleClick}>Graficar</Boton>
      <canvas ref={chartContainer}/>
    </div>
  );
};

export default Chart;