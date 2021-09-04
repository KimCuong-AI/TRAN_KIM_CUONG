import React from 'react';
import { Route } from 'react-router';
import Header from '../../components/Header/Header';
import LoadingComponent from '../../components/Loading/LoadingPage';
import FooterContent from '../../pages/Home/Footer/FooterContent';
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop';
const Hometemplate = (props) => {
    return (
        <Route exact path={props.path}  render={(propsRoute) => {
            return <div style={{minHeight:'100vh'}}>
                <LoadingComponent/>
                <Header />
                <div className='pt-5'>
                    <props.component {...propsRoute} />
                </div>
                <FooterContent />
                <ScrollToTop/>
            </div>
        }}
        /> 
    );
}
export default Hometemplate;
 