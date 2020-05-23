import React, {useState, Fragment} from 'react';

import styled from '@emotion/styled';

const Label = styled.label`
    font-family : 'Bebas Neue', cursive;
    color : #fff;
    text-transform:uppercase;
    font-weight:bold;
    font-size:2.4rem;
    margin-top:2rem;
    display:block;
`;

const Select = styled.select`
    width:100%;
    display: block;
    padding:1rem;
    -webkit-appearance:none;
    border-radius:10px;
    border:none;
`;

const useCripto = (label, stateInicial, opciones) => {

    //console.log(opciones);

    //STATE DEL CUSTOM HOOK
    const [state, setState] = useState(stateInicial);

    const SelectCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={e => setState(e.target.value)}
                value={state}
            >
                <option value="">-- Seleccione --</option>
                {opciones.map(opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    );

    //RETORNAR EL STATE (LA PARTE DEL INTERFAZ) Y FUNCION QUE MOIFICA EL STATE
    return [state, SelectCripto, setState];
};

export default useCripto;
