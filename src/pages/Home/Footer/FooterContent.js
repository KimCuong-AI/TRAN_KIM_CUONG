import React from 'react';
import './footer.css'
const FooterContent = () => {
    return (
        <div className='footer__content text-white'>
            <div className='container py-5'>
                <div className='row'>
                    <div className='col-12  col-md-6 col-lg-4 text-center text-md-left'>
                        <h6 className='text-light'>Người thực hiện: Trần Kim Cường </h6>
                        <h6 className='text-light'>SĐT liên hệ: 0967935842</h6>
                        <h6 className='text-light'>trankimcuongabcd@gmail.com</h6>
                    </div>
                    <div className='col-4 footer__company text-center'>
                        <h4 className='text-white'>ĐỐI TÁC</h4>
                        <ul className='px-0 m-2' >
                            <li className='m-1'><img src='./img/imageFooter/bhd.png' alt='logo' style={{ width: '30px', borderRadius: '15px' }} /></li>
                            <li className='m-1'><img src='./img/imageFooter/dongdacinema.png' alt='logo' style={{ width: '30px', borderRadius: '15px' }} /></li>
                            <li className='m-1'><img src='./img/imageFooter/dcine.png' alt='logo' style={{ width: '30px', borderRadius: '15px' }} /></li>
                            <li className='m-1'><img src='./img/imageFooter/laban.png' alt='logo' style={{ width: '30px', borderRadius: '15px' }} /></li>
                            <li className='m-1'><img src='./img/imageFooter/vcb.png' alt='logo' style={{ width: '30px', borderRadius: '15px' }} /></li>
                        </ul>
                        <ul className='px-0 m-2' >
                            <li className='m-1'><img src='./img/imageFooter/bt.jpg' alt='logo' style={{ width: '30px', borderRadius: '15px' }} /></li>
                            <li className='m-1'><img src='./img/imageFooter/cinestar.png' alt='logo' style={{ width: '30px', borderRadius: '15px' }} /></li>
                            <li className='m-1'><img src='./img/imageFooter/cnx.jpg' alt='logo' style={{ width: '30px', borderRadius: '15px' }} /></li>
                            <li className='m-1'><img src='./img/imageFooter/payoo.jpg' alt='logo' style={{ width: '30px', borderRadius: '15px' }} /></li>
                            <li className='m-1'><img src='./img/imageFooter//megags.png' alt='logo' style={{ width: '30px', borderRadius: '15px' }} /></li>
                        </ul>
                    </div>
                    <div className='col-4 text-center mobile__app'>
                        <div className='row'>
                            <div className='col-6 '>
                                <p>MOBILE APP</p>
                                <div className='d-flex justify-content-around '>
                                    <img src='./img/imageFooter/apple-logo.png' width={30} alt='apple logo' />
                                    <img src='./img/imageFooter/android-logo.png' width={30} alt='android logo' />
                                </div>
                            </div>
                            <div className='col-6 '>
                                <p>SOCIAL APP</p>
                                <div className='d-flex justify-content-around'>
                                    <a href='https://www.facebook.com' target='_blank' > <img src='./img/imageFooter/facebook-logo.png' alt='logo facebook' width={30} height={30} /></a>
                                    <a href='https://chat.zalo.me' target='_blank' ><img src='./img/imageFooter/zalo-logo.png' alt='logo zalo' width={30} height={30} /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6  media__icon'>
                        <div className='d-flex justify-content-center'>
                            <a href='https://www.facebook.com' target='_blank' > <img src='./img/imageFooter/facebook-logo.png' alt='logo facebook' width={30} style={{ margin: '20px' }} /> </a>
                            <a href='https://chat.zalo.me' target='_blank' > <img src='./img/imageFooter/zalo-logo.png' alt='logo zalo' width={30} style={{ margin: '20px' }} /></a>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    );
}
export default FooterContent;
