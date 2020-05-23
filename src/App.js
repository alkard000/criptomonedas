import React, {useState, useEffect} from 'react';
import styled from '@emotion/styled';

import axios from 'axios';

import imagen from './cryptomonedas.png';

import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';
import Chart from './components/Chart';

const Contenedor = styled.div`
  max-width:900px;
  margin : 0 auto;
  @media (min-width:992px){
    display:grid;
    grid-template-columns : repeat(2, 1fr);
    column-gap : 2rem;
  }
`;

const Imagen = styled.img`
  max-width:100%;
  margin-top:5rem;
`;

const Heading = styled.h1`
  font-family:'Bebas Neue', cursive;
  color:#fff;
  text-align:left;
  font-weight:700;
  font-size:50px;
  margin-bottom:50px;
  margin-top:80px;

  &::after{
    content:'';
    width:100px;
    height:6px;
    background-color:#66a2fe;
    display:block;
  }
`;

function App() {

  const [moneda, setMoneda] = useState('');
  const [cripto, setCripto] = useState('');
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando] = useState(false);
  const [cargaGrafico, setCargaGrafico] = useState(false)
  const [resultadoTiempo, setResultadoTiempo] = useState({});

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      if(moneda === '') return;

      //CONSULTAR LA API
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      //MOSTRAR SPINNER
      setCargando(true);
      setTimeout(() => {
        //CAMBIAR ESTADO
        setCargando(false);
        setResultado(resultado.data.DISPLAY[cripto][moneda]);
      }, 3000);
    }
    cotizarCriptomoneda();
  }, [moneda, cripto]);

  useEffect(() => {

    const graficarCripto = async () => {
      if(moneda === '') return;

      //CONSULTAR LA API
      const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${cripto}&tsym=${moneda}&limit=10`;
      const resultadoTiempo = await axios.get(url);

      //MOSTRAR SPINNER
      setCargaGrafico(true);
      setTimeout(() => {
        //CAMBIAR ESTADO
        setCargaGrafico(false);
        setResultadoTiempo(resultadoTiempo.data.Data.Data);
      }, 3000);
    }
    graficarCripto();
  }, [moneda, cripto]);
  
  //MOSTRAR SPINNER
  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado}/>;
  

  return (
    <Contenedor>
      <div>
        <Imagen
          src={imagen}
          alt='Imagen Cripto'
        />
        {(moneda === '') ? null :  <Chart resultadoTiempo={resultadoTiempo}/>}
      </div>
      <div>
        <Heading>
          Cotiza Criptomonedas al instante
        </Heading>
        <Formulario
          setMoneda={setMoneda}
          setCripto={setCripto}
        />
        {componente}
      </div>
    </Contenedor>
  )
}

export default App;
