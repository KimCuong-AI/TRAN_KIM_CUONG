import { useFormik } from 'formik';
import React, {useRef, useState } from 'react';
import {  Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { history } from '../../App';
import { dangNhapAction } from '../../redux/actions/UserAction';
import './login.css'
import appBackground from '../../assets/img/backapp.jpg'
import universalImage from '../../assets/img/universal.jpg'
import ReactPasswordToggleIcon from 'react-password-toggle-icon';
const Login = (props) => { 
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {  
            taiKhoan: '',
            matKhau: '',
        },
        onSubmit: (values) => {
            dispatch(dangNhapAction(values))
        }
    })
    const [Show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const closeLogin = () => {
        history.push("/")
    }
    const PageTransition = () => {
        history.push('/register', { from: 'Login' })
    }
    const formikRef = useRef()
    const hideIcon = () => <i className="fa fa-eye-slash" aria-hidden="true"></i>
    const showIcon = () => <i className="fa fa-eye" aria-hidden="false"></i>;
    return (
        <div style={{backgroundImage: `url(${appBackground})`, height: '100vh', width: '100%' }} >
            <Modal className='modal__login' show={Show} onHide={handleClose} backdrop="static" aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal-custom-login" >
                <Modal.Header closeButton onClick={closeLogin}>
                </Modal.Header>
                <Modal.Body >
                    <div className="container">
                        <div className='text-center' >
                            <img src={universalImage} height='70' width='70' alt='...' className='rounded-circle' />
                        </div>
                        <h4 className='text-center pb-4 pt-1' style={{ fontFamily: '-moz-initial', color: '#fb4226', fontWeight: 'bolder' }}>Thế Giới Phim Trên Đầu Ngón Tay</h4>
                        <form className="form" onSubmit={formik.handleSubmit}>
                            <div className="form-group">
                                <h5>Tài khoản</h5>
                                <input className="form-control" name="taiKhoan" onChange={formik.handleChange} />
                            </div>
                            <div className="form-group" style={{ position: "relative", display: "block" }}>
                                <h5>Mật khẩu </h5>
                                <input ref={formikRef} type="password" className="form-control" name="matKhau" onChange={formik.handleChange} />
                                <ReactPasswordToggleIcon style={{ top: '50%',color:'#212529' }}
                                    inputRef={formikRef}
                                    hideIcon={hideIcon}
                                    showIcon={showIcon}
                                />
                            </div>
                            <span className='text-success h6' style={{ cursor: 'pointer' }} onClick={PageTransition}>* Đăng ký</span>
                            <div className="form-group text-center">
                                <button style={{ fontFamily: 'fantasy', fontSize: '18px' }} className="btn btn__dangNhap">Đăng nhập</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default Login;
