import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import './Loading.css'
import loader from '../../assets/img/transparent-background.gif'
const LoadingCheckout = () => {
    const isLoadingCheckout  = useSelector(state => state.LoadingReducer.isLoadingCheckout)
    return (
        <Fragment>
            {isLoadingCheckout ? <div className="loading">
                <img src={loader} with={200} height={200} alt='loading' />
            </div > : ''
            }
        </Fragment>
        
    );
}
export default LoadingCheckout;
 