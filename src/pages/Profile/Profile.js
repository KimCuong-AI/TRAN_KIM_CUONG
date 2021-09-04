import { useFormik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userImgae from '../../assets/img/userImage.jpg'
import { layThongTinTaiKhoanAction, updateTaiKhoan } from '../../redux/actions/UserAction';
import { USER_LOGIN } from '../../util/setting';
import ReactPasswordToggleIcon from 'react-password-toggle-icon';
import * as Yup from 'yup'
import './profile.css'
import { history } from '../../App';
import History from './History';
const Profile = (props) => {
    const hideIcon = () => <i className="fa fa-eye-slash" aria-hidden="true"></i>
    const showIcon = () => <i className="fa fa-eye" aria-hidden="false"></i>;
    let [tabs, setTabs] = useState('thongtin')
    const dispatch = useDispatch()
    let thongTinTK = useSelector(state => state.UserReducer.thongTin)
    //dispatch lấy thông tin tài khoản
    const thongtin = JSON.parse(localStorage.getItem(USER_LOGIN));
    useEffect(() => {
        dispatch(layThongTinTaiKhoanAction(thongtin.taiKhoan));
    }, [])

    const formikRef = useRef()
    const formik = useFormik({ 
        enableReinitialize: true,
        initialValues: { //Khai báo các thuộc tính trên form
            taiKhoan: thongTinTK.taiKhoan,
            matKhau: thongTinTK.matKhau,
            email: thongTinTK.email,
            soDT: thongTinTK.soDT,
            hoTen: thongTinTK.hoTen,
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống!'),
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu tối thiểu 6 - 32 kí tự!').max(32, 'Mật khẩu tối thiểu 6 - 32 kí tự!'),
            email: Yup.string().email('Email không hợp lệ').required('Email không được bỏ trống'),
            soDT: Yup.string().matches(/^[0-9]+$/, 'Số điện thoại tất cả là số').required('số điện thoại không được bỏ trống'),
            hoTen: Yup.string().required('Họ tên không được bỏ trống')
        }),
        onSubmit: (values) => { //values là object chứa giá trị của các input
            let value = {
                taiKhoan: values.taiKhoan,
                matKhau: values.matKhau,
                hoTen: values.hoTen,
                soDt: values.soDT,
                email: values.email,
                maLoaiNguoiDung: thongtin.maLoaiNguoiDung,
                maNhom: thongtin.maNhom,
            }
            dispatch(updateTaiKhoan(value))
        }
    })
    const { handleChange, touched, errors } = formik;

    const renderInfo = () => {
        return (
            <div className='info'>
                <form className="container " onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <p >Tài khoản</p>
                        <input disabled name="taiKhoan" value={formik.values.taiKhoan} className="form-control" onChange={handleChange} onBlur={formik.handleBlur} />
                        {touched.taiKhoan && errors.taiKhoan && <p className="text text-danger">{formik.errors.taiKhoan}</p>}
                    </div>
                    <div className="form-group">
                        <p>Họ tên</p>
                        <input name="hoTen" value={formik.values.hoTen} className="form-control" onChange={handleChange} onBlur={formik.handleBlur} />
                        {touched.hoTen && errors.hoTen && <p className="text text-danger">{formik.errors.hoTen}</p>}

                    </div>
                    <div className="form-group" style={{ position: "relative", display: "block" }}>
                        <p>Mật khẩu</p>
                        <input ref={formikRef} type='password' name="matKhau" value={formik.values.matKhau} className="form-control" onChange={handleChange} onBlur={formik.handleBlur} />
                        <ReactPasswordToggleIcon style={{ top: '55%' }}
                            inputRef={formikRef}
                            hideIcon={hideIcon}
                            showIcon={showIcon}
                        />
                    </div>
                    {touched.matKhau && errors.matKhau && <p className="text text-danger">{formik.errors.matKhau}</p>}

                    <div className="form-group">
                        <p>Email</p>
                        <input name="email" value={formik.values.email} className="form-control " onChange={handleChange} onBlur={formik.handleBlur} />
                        {touched.email && errors.email && <p className="text text-danger">{formik.errors.email}</p>}

                    </div>
                    <div className="form-group">
                        <p >Số điện thoại</p>
                        <input name="soDT" value={formik.values.soDT} className="form-control" onChange={handleChange} onBlur={formik.handleBlur} />
                        {touched.soDT && errors.soDT && <p className="text text-danger">{formik.errors.soDT}</p>}
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn__update">CẬP NHẬT TÀI KHOẢN</button>
                    </div>
                </form>
            </div>
        )
    }
    const renderHistory = () => {
        return (
            <div>
                <History thongTinTK={thongTinTK} />
            </div>
        )
    }
    return (
        <div className='container-fluid'>
            <div className='row profile'>
                <div className='col-12 col-lg-3 text-center mb-4'>
                    <img src={userImgae} alt='...' className='image-user' />
                    <h3 className='text-danger p-2'>{thongTinTK.taiKhoan}</h3>
                    {thongtin?.maLoaiNguoiDung === 'QuanTri' ? <span className='h6 text-white to-admin' onClick={() => {
                        history.push(('/admin/users'))
                    }}>Đi đến trang quản trị <i className="fa fa-location-arrow"></i></span> : ''} 
                </div>
                <div className='col-12 col-lg-9 bg-light'>
                    <div className=' tabs-manager pt-4 pb-5 text-center text-sm-left'>
                        <span onClick={() => {
                            setTabs('thongtin')
                        }} className={` ${tabs == 'thongtin' ? 'profile__active' : ''} profile__none `}>
                            THÔNG TIN TÀI KHOẢN
                        </span>
                        <span onClick={() => {
                            setTabs('lichsu')
                        }} className={` ${tabs == 'lichsu' ? 'profile__active' : ''} profile__none `} >
                            LỊCH SỬ ĐẶT VÉ
                        </span>
                    </div>
                    {tabs == 'thongtin' ? renderInfo() : ''}
                    {tabs == 'lichsu' ? renderHistory() : ''}
                </div>
            </div>
        </div>
    );
}
export default Profile;
