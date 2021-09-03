import React, { useState } from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
} from 'antd';
import { useFormik } from 'formik';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { GROUPID } from '../../../../util/setting';
import { history } from '../../../../App';
import { themPhimUpLoadHinhAction } from '../../../../redux/actions/FilmActions';
import * as Yup from 'yup';
const { TextArea } = Input;
const Addnew = () => {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            danhGia: '',
            hinhAnh: {}, 
            maNhom: GROUPID,

        },
        validationSchema: Yup.object().shape({
            tenPhim: Yup.string().required('Tên phim không được bỏ trống'),
            trailer: Yup.string().required('Trailer không được bỏ trống'),
            moTa: Yup.string().required('Mô tả không được bỏ trống').min(10, 'Mô tả tối thiểu 10 ký tự'),
            ngayKhoiChieu:Yup.string().required('Ngày khởi chiếu không được bỏ trống'),
            danhGia: Yup.number().typeError('Đánh giá phải là số').integer('Đánh giá phải là số nguyên').required('Đánh giá không được bỏ trống').min(1,'Tối thiểu là 1').max(10,'Tối đa là 10')
        }),
        onSubmit: (values) => {
            values.maNhom = GROUPID;
            //tạo đối tượng formdata => đưa giá trị từ formik vào Formdata
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else if (key === 'hinhAnh') {
                    formData.append('File', values.hinhAnh, values.hinhAnh.name);
                }
            }
            dispatch(themPhimUpLoadHinhAction(formData))
        }
    })
    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    const handleChangeFile = (e) => {
        //lấy file ra từ e
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif') {
            //tạo đối tượng để đọc file
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImgSrc(e.target.result);
            }
            //đem dữ liệu file lưu vào formik
            formik.setFieldValue('hinhAnh', file);
        }
    }
    const { touched, errors, handleBlur } = formik;
    return (
        <>
            <Button onClick={() => {
                history.push('/admin/films')
            }} style={{ cursor: 'pointer' }} type='primary'>Quay lại</Button>
            <h3 className='text-center'>Thêm mới phim </h3>

            <Form onSubmitCapture={formik.handleSubmit}
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={{
                    size: componentSize,
                }}
                size={componentSize}
            >
                <Form.Item label="Tên phim">
                    <Input name='tenPhim' onChange={formik.handleChange} onBlur={handleBlur} />
                    {touched.tenPhim && errors.tenPhim && <p className="text text-danger">{formik.errors.tenPhim}</p>}

                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} onBlur={handleBlur} />
                    {touched.trailer && errors.trailer && <p className="text text-danger">{formik.errors.trailer}</p>}
                </Form.Item>
                <Form.Item label="Mô tả">
                    <TextArea rows={4} name='moTa' onChange={formik.handleChange} onBlur={handleBlur} />
                    {touched.moTa && errors.moTa && <p className="text text-danger">{formik.errors.moTa}</p>}
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker format={'DD/MM/YYYY'} name='ngayKhoiChieu' onChange={handleChangeDatePicker} onBlur={handleBlur} />
                    {touched.ngayKhoiChieu && errors.ngayKhoiChieu && <p className="text text-danger">{formik.errors.ngayKhoiChieu}</p>}
                </Form.Item>
                <Form.Item label="Số sao ">
                    <Input name='danhGia' type='number' min={1} max={10} onChange={formik.handleChange} onBlur={handleBlur} style={{width:'15%'}}/>
                    {touched.danhGia && errors.danhGia && <p className="text text-danger">{formik.errors.danhGia}</p>}
                </Form.Item>
                <Form.Item label="Hình ảnh ">
                    <input type='file' onChange={handleChangeFile} />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={imgSrc} alt='hình phim' accept='image/png, image/jepg,image/png,image/gif' />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button className='btn btn-primary'>Thêm Phim</button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Addnew;