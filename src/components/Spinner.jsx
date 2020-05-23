import React, {Fragment} from 'react';

import styled from '@emotion/styled';

import '../css/Spinner.css';

const Parrafo = styled.p`
    color:#fff;
    text-align:center;
`;

const Spinner = () => {
    return ( 
        <Fragment>
            <div className="sk-chase">
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
                <div className="sk-chase-dot"></div>
            </div>
            <Parrafo>Cotizando...</Parrafo>
        </Fragment> 
    );
}
 
export default Spinner;