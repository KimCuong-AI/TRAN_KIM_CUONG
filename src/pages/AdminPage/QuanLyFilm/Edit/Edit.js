
import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Button,
    DatePicker,
} from 'antd';
import {useFormik } from 'formik';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadAction, layThongTinPhimAction, themPhimUpLoadHinh } from '../../../../redux/actions/FilmActions';
import { GROUPID } from '../../../../util/setting';
import { history } from '../../../../App';
import Loading from '../../../../components/Loading/Loading';
import * as Yup from 'yup';
const { TextArea } = Input;
const Edit = (props) => {
    const [componentSize, setComponentSize] = useState('default');
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();
    const { thongTinPhim } = useSelector(state => state.FilmReducer)
    useEffect(() => {
        dispatch(layThongTinPhimAction(props.match.params.id))
    }, [])
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: thongTinPhim.maPhim,
            tenPhim: thongTinPhim.tenPhim,
            trailer: thongTinPhim.trailer,
            moTa: thongTinPhim.moTa,
            ngayKhoiChieu: moment(thongTinPhim.ngayKhoiChieu).format('DD/MM/YYYY'),
            danhGia: thongTinPhim.danhGia,
            hinhAnh: null,
            maNhom: GROUPID,
        },
        validationSchema: Yup.object().shape({
            tenPhim: Yup.string().required('Tên phim không được bỏ trống'),
            trailer: Yup.string().required('Trailer không được bỏ trống'),
            moTa: Yup.string().required('Mô tả không được bỏ trống').min(10,'Mô tả tối thiểu 10 ký tự'),
            ngayKhoiChieu:Yup.string().required('Ngày khởi chiếu không được bỏ trống'),
            danhGia: Yup.number().typeError('Đánh giá phải là số').integer('Đánh giá phải là số nguyên').required('Đánh giá không được bỏ trống').min(1,'Tối thiểu là 1').max(10,'Tối đa là 10')
        }),
        onSubmit: (values) => {
            //tạo đối tượng formdata => đưa giá trị từ formik vào Formdata
            let formData = new FormData();
            for (let key in values) {
                if (key !== 'hinhAnh') {
                    formData.append(key, values[key]);
                } else {
                    if (values.hinhAnh !== null) {
                        formData.append('File', values.hinhAnh, values.hinhAnh.name);
                    }
                }
            }
            dispatch(capNhatPhimUploadAction(formData))
        }
    })
    const {touched, errors,handleBlur } = formik;

    const handleChangeDatePicker = (value) => {
        let ngayKhoiChieu = moment(value).format('DD/MM/YYYY')
        formik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    const handleChangeFile = async (e) => {
        //lấy file ra từ e
        let file = e.target.files[0]
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/gif') {
            //đem dữ liệu file lưu vào formik
            await formik.setFieldValue('hinhAnh', file);
            //tạo đối tượng để đọc file
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = (e) => {
                setImgSrc(e.target.result);
            }
            //đem dữ liệu file lưu vào formik
        }
    }
    return (
        <>
            <Button onClick={() => {
                history.push('/admin/films')
            }} style={{ cursor: 'pointer' }} type='primary'>Quay lại</Button>
            <h3 className='text-center'>Cập nhật phim  </h3>
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
                <Loading />

                <Form.Item label="Tên phim">
                    <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} onBlur={handleBlur} />
                    {touched.tenPhim && errors.tenPhim && <p className="text text-danger">{formik.errors.tenPhim}</p>}
                </Form.Item>
                <Form.Item label="Trailer">
                    <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} onBlur={handleBlur} />
                    {touched.trailer && errors.trailer && <p className="text text-danger">{formik.errors.trailer}</p>}
                </Form.Item>
                <Form.Item label="Mô tả">
                    <TextArea rows={4} name='moTa' onChange={formik.handleChange} value={formik.values.moTa} onBlur={handleBlur} />
                    {touched.moTa && errors.moTa && <p className="text text-danger">{formik.errors.moTa}</p>}
                </Form.Item>
                <Form.Item label="Ngày khởi chiếu">
                    <DatePicker onChange={handleChangeDatePicker} name='ngayKhoiChieu' format='DD/MM/YYYY' value={moment(formik.values.ngayKhoiChieu, 'DD/MM/YYYY')} onBlur={handleBlur}/>
                    {touched.ngayKhoiChieu && errors.ngayKhoiChieu && <p className="text text-danger">{formik.errors.ngayKhoiChieu}</p>}
                </Form.Item>
                <Form.Item label="Số sao ">
                    <Input name='danhGia' type='number' min={1} max={10} onChange={formik.handleChange} value={formik.values.danhGia} onBlur={handleBlur}  style={{width:'15%'}} />
                    {touched.danhGia && errors.danhGia && <p className="text text-danger">{formik.errors.danhGia}</p>}
                </Form.Item>
                <Form.Item label="Hình ảnh ">
                    <input type='file' onChange={handleChangeFile} />
                    <br />
                    <img style={{ width: 150, height: 150 }} src={imgSrc === '' ? thongTinPhim.hinhAnh : imgSrc} accept='image/png, image/jepg,image/png,image/gif' alt='hình phim' />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button className='btn btn-primary'>Cập nhật phim</button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Edit;