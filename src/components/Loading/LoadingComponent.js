import React, { useEffect, useState } from 'react';
import './Loading.css';
import hinhdongdatve from '../../assets/img/hinhdongdatve.gif'

const LoadingComponent = () => {
    const [state, setState] = useState({ Loading: false })
    useEffect(() => {
        setState({ Loading: true })
        setTimeout(() => {
            setState({ Loading: false });
        }, 600)
    },[])
    return (
        <div>
            {state.Loading ? <div className='bgLoading'> 
            <img src={hinhdongdatve} alt='loading' />
             </div> :''}
        </div>
    );
}

export default LoadingComponent;
