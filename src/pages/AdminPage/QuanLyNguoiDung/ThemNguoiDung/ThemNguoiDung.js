import React, { useState } from 'react'
import { Button, Input, Modal, Form, Select } from 'antd';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useDispatch } from 'react-redux'
import { UserAddOutlined } from '@ant-design/icons';
import './themNguoiDung.css'
import swal from '@sweetalert/with-react'
import { layDanhSachNguoiDungAction } from '../../../../redux/actions/UserAction';
import { quanLyNguoiDungService } from '../../../../services/quanly';
export default function ThemNguoiDung(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        formik.resetForm()
    };
    const dispatch = useDispatch()
    //admin quản lý người dùng
    const themNguoiDung = (thongTinNguoDung) => {
        return async (dispatch) => {

            try {
                const result = await quanLyNguoiDungService.themNguoiDung(thongTinNguoDung)
                await swal(
                    <div>
                        <h5>Thêm người dùng thành công!</h5>
                    </div>
                )
                dispatch(layDanhSachNguoiDungAction())
                setIsModalVisible(false)
            }
            catch (error) {
                swal(
                    <div>
                        <h5>{error.response?.data}</h5>
                    </div>
                )
            }
        }
    }

    const formik = useFormik({
        initialValues: { //Khai báo các thuộc tính trên form
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDT: '',
            maNhom: '',
            hoTen: '',
            maLoaiNguoiDung: '',
            danhGia: 0,
        },
        validationSchema: Yup.object().shape({
            taiKhoan: Yup.string().required('Tài khoản không được bỏ trống!'),
            matKhau: Yup.string().required('Mật khẩu không được bỏ trống').min(6, 'Mật khẩu tối thiểu 6 - 32 kí tự!').max(32, 'Mật khẩu tối thiểu 6 - 32 kí tự!'),
            email: Yup.string().email('Email không hợp lệ').required('Email không được bỏ trống'),
            soDT: Yup.string().matches(/^[0-9]+$/, 'Số điện thoại tất cả là số').required('Số điện thoại không được bỏ trống'),
            hoTen: Yup.string().required('Họ tên không được bỏ trống'),
            maLoaiNguoiDung: Yup.string().required('mã loại người phải được chọn'),
            maNhom: Yup.string().required(' loại người dùng phải được chọn'),
        }),
        onSubmit: (values) => { //values là object chứa giá trị của các input
            dispatch(themNguoiDung(values))
        }
    })
    const { handleChange, touched, errors } = formik;
    return (
        <div className=''>
            <Button size='large' type='primary' className='text-center' onClick={showModal}>
                Thêm người dùng <UserAddOutlined />
            </Button>

            <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  centered maskClosable={false} wrapClassName='adminAddUser' destroyOnClose={true}  width={800} footer={null} style={{ padding: 0 }} >
                <Form  name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onSubmitCapture={formik.handleSubmit} >
                    <h3 className='text-center mb-4'>Thêm Người Dùng</h3>
                    <div className='row'>
                        <div className='col-6 text-center'>
                            <Form.Item label="Tài khoản" >
                                <Input name="taiKhoan" onChange={handleChange} onBlur={formik.handleBlur} />
                                {touched.taiKhoan && errors.taiKhoan && <p className="text text-danger">{formik.errors.taiKhoan}</p>}
                            </Form.Item>
                            <Form.Item label="Họ tên">
                                <Input name="hoTen" onChange={handleChange} onBlur={formik.handleBlur} />
                                {touched.hoTen && errors.hoTen && <p className="text text-danger">{formik.errors.hoTen}</p>}
                            </Form.Item>
                            <Form.Item label="Mật khẩu">
                                <Input.Password name="matKhau" type='' onChange={handleChange} onBlur={formik.handleBlur} />
                                {touched.matKhau && errors.matKhau && <p className="text text-danger">{formik.errors.matKhau}</p>}
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input name="email" onChange={handleChange} onBlur={formik.handleBlur} />
                                {touched.email && errors.email && <p className="text text-danger">{formik.errors.email}</p>}
                            </Form.Item>
                        </div>
                        <div className='col-6 text-center'>
                            <Form.Item label="Số điện thoại">
                                <Input name="soDT" onChange={handleChange} onBlur={formik.handleBlur} />
                                {touched.soDT && errors.soDT && <p className="text text-danger">{formik.errors.soDT}</p>}
                            </Form.Item>
                            <Form.Item label="Loại người dùng">
                                <Select onChange={(value) => {
                                    formik.setFieldValue('maLoaiNguoiDung', value)
                                }} onBlur={formik.handleBlur} >
                                    <Select.Option value="KhachHang">Khách hàng</Select.Option>
                                    <Select.Option value="QuanTri">Quản trị</Select.Option>
                                </Select>
                                {touched.maLoaiNguoiDung && errors.maLoaiNguoiDung && <p className="text text-danger">{formik.errors.maLoaiNguoiDung}</p>}

                            </Form.Item>
                            <Form.Item label="Mã nhóm">
                                <Select onChange={(value) => {
                                    formik.setFieldValue('maNhom', value)
                                }} onBlur={formik.handleBlur}  >
                                    <Select.Option value="GP01">group 1</Select.Option>
                                    <Select.Option value="GP02">group 2</Select.Option>
                                    <Select.Option value="GP03">group 3</Select.Option>
                                    <Select.Option value="GP04">group 4</Select.Option>
                                </Select>
                                {touched.maNhom && errors.maNhom && <p className="text text-danger">{formik.errors.maNhom}</p>}
                            </Form.Item>
                        </div>
                    </div>
                    <div className='text-center'>
                        <Button type="primary" htmlType='submit' size='large' >Thêm người dùng</Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}




