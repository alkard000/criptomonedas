import React, {useEffect, useState} from 'react';
import axios from 'axios';

import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import useMoneda from '../hooks/useMoneda';
import useCripto from '../hooks/useCripto';

import Error from '../components/Error';

const Boton = styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#66a2fe;
    border:none;
    width:100%;
    border-radius:10px;
    color:#fff;
    transition:all .3s ease;

    &:hover{
        background-color:#326ac0;
        cursor:pointer;
    }
`;

const Formulario = ({setMoneda, setCripto}) => {

    //STATE DEL LISTADO DE CRIPTOS
    const [criptomoneda, setCriptomoneda] = useState([]);
    const [error, setError] = useState(false);

    //MONEDAS
    const MONEDAS = [
        {codigo : 'USD', nombre : 'Dolar Americano'},
        {codigo : 'MXN', nombre : 'Peso Mexicano'},
        {codigo : 'EUR', nombre : 'Euro'},
        {codigo : 'GBP', nombre : 'Libra Esterlina'},
        {codigo : 'CLP', nombre : 'Peso Chileno'},
    ];
    //CRIPTOMONEDAS

    //USAR EL CUSTOM HOOK DE USEMONEDA
    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', MONEDAS);
    //USAR EL CUSTOM HOOK DE CRIPTOMONEDAS
    const [cripto, SelectCripto] = useCripto('Elige tu Criptomoneda', '', criptomoneda);

    //EJECUTAR LLAMADO A LA API
    useEffect( ()=> {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            setCriptomoneda(resultado.data.Data);
        }
        consultarApi();
    }, []);

    //CUANDO SE HACE SUBMIT, SE COTIZA LA MONEDA
    const cotizarMoneda = e => {
        e.preventDefault();
        
        //VALIDAR SI AMBOS CAMPO ESTAN LLENOS O VACIOS
        if(moneda === '' || cripto === ''){
            setError(true);
            return;
        }

        //PASA LOS DATOS AL COMPONENTE PRINCIPAL
        setError(false);    
        setMoneda(moneda);
        setCripto(cripto);    
    }

    return (  
        <form
            onSubmit={cotizarMoneda}
        >
            {error ?  <Error mensaje='Hubo un error'/> : null }
            <SelectMoneda/>
            <SelectCripto/>
            <Boton
                type="submit"
                value='Calcular'
            />
        </form>
    );
}

Formulario.propTypes = {
    setMoneda : PropTypes.func.isRequired,
    setCripto : PropTypes.func.isRequired
}
 
export default Formulario;