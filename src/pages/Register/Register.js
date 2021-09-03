
import { useFormik} from 'formik';
import React, { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup'
import { history } from '../../App';
import { dangKyAction } from '../../redux/actions/UserAction';
import './Register.css'
import appBackground from '../../assets/img/backapp.jpg';
import { GROUPID } from '../../util/setting';
const Register = (props) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: GROUPID,
            hoTen: '',
            changepassword: '',
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống!'),
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu tối thiểu 6 - 32 kí tự!').max(32, 'Mật khẩu tối thiểu 6 - 32 kí tự!').matches(/[a-zA-Z]/, 'Mật khẩu phải chứa chữ cái latin .'),
            email: Yup.string().email('Email không hợp lệ').required('Email không được bỏ trống'),
            soDt: Yup.string().required('Số điện thoại không được bỏ trống!').matches(/^[0-9]+$/, 'Số điện thoại tất cả là số'),
            hoTen: Yup.string().required('Họ tên không được bỏ trống'),
            changepassword: Yup.string().required('Bạn cần xác nhận mật khẩu').when("matKhau", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("matKhau")],
                    "xác nhận mật khẩu không khớp"
                )
            })
        }),
        onSubmit: (values) => {
            const valueRegister={
                taiKhoan:values.taiKhoan,
                matKhau:values.matKhau,
                email:values.email,
                soDt:values.soDt,
                hoTen:values.hoTen,
                maNhom:values.maNhom, 
            }
            dispatch(dangKyAction(valueRegister))
        }
    })
    const { handleChange, touched, errors } = formik;
    const [Show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const pageTransition = () => {
        history.push('/login')
    }

    const formikRef = useRef()
    return (
        <div style={{ backgroundImage: `url(${appBackground})`, height: '100vh',width: '100%' }} >
            <Modal className='modal__register' show={Show} onHide={handleClose} backdrop="static" aria-labelledby="contained-modal-title-vcenter" centered dialogClassName="modal__custom__register" >
                <Modal.Header closeButton onClick={()=>{
                    history.goBack()
                }}>
                </Modal.Header>
                <Modal.Body >
                    <form className="container" onSubmit={formik.handleSubmit}>
                        <h2 className='text-center ' style={{ fontFamily: 'fantasy', color: '#fb4226' }}>Đăng ký</h2>
                        <div className="form-group">
                            <h5 >Tài khoản:</h5>
                            <input name="taiKhoan" className="form-control" onChange={handleChange} onBlur={formik.handleBlur} />
                            {touched.taiKhoan && errors.taiKhoan && <p className="text text-danger">{formik.errors.taiKhoan}</p>}
                        </div>
                        <div className="form-group">
                            <h5>Họ tên:</h5>
                            <input name="hoTen" className="form-control" onChange={handleChange} onBlur={formik.handleBlur} />
                            {touched.hoTen && errors.hoTen && <p className="text text-danger">{formik.errors.hoTen}</p>}
                        </div>
                        <div className="form-group" style={{ position: "relative", display: "block" }}>
                            <h5>Mật khẩu:</h5>
                            <input ref={formikRef} name="matKhau" type='password' className="form-control" value={formik.values.matKhau} onChange={handleChange} onBlur={formik.handleBlur} />
                            {touched.matKhau && errors.matKhau && <p className="text text-danger">{formik.errors.matKhau}</p>}
                        </div>
                        <div className="form-group" style={{ position: "relative", display: "block" }}>
                            <h5>Xác nhận mật  khẩu:</h5>
                            <input ref={formikRef} type="password" className="form-control" name="changepassword" onBlur={formik.handleBlur} onChange={handleChange} value={formik.values.changepassword} />
                            {touched.changepassword && errors.changepassword && <p className="text text-danger">{formik.errors.changepassword}</p>}
                        </div>
                        <div className="form-group">
                            <h5>Email:</h5>
                            <input name="email" className="form-control" onChange={handleChange} onBlur={formik.handleBlur} />
                            {touched.email && errors.email && <p className="text text-danger">{formik.errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <h5>Số điện thoại:</h5>
                            <input name="soDt" className="form-control" onChange={handleChange} onBlur={formik.handleBlur} />
                            {touched.soDt && errors.soDt && <p className="text text-danger">{formik.errors.soDt}</p>}
                        </div>
                        <span className='text-success h6' style={{ cursor: 'pointer' }} onClick={pageTransition} >* Đăng Nhập</span>
                        <div className="form-group text-center">
                            <button type="submit" style={{ fontFamily: 'fantasy', fontSize: '20px' }} className="btn btn-success btn__register">Đăng ký</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
export default Register;

