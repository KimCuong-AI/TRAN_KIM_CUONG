import React from 'react';
import { Route } from 'react-router';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import FooterContent from '../../pages/Home/Footer/FooterContent';
const UserTemplate = (props) => {
    return (
        <div>
            <Route path={props.path} exact render={(propsRoute) => {
                return <div style={{minHeight:'100vh'}}>
                    <Loading/>
                    <Header />
                    <div style={{padding:' 80px 0px'}}>
                        <props.component {...propsRoute} />
                    </div>
                    <FooterContent/>

                </div>
            }}
            />
        </div>
    );
}
export default UserTemplate;
