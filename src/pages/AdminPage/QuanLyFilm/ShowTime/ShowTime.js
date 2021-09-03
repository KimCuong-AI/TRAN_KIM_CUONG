import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import moment from 'moment';
import { taoLichChieuAction } from '../../../../redux/actions/FilmActions';
import { history } from '../../../../App';
import './showTime.css'
import { quanLyRapService } from '../../../../services/quanly';
import * as Yup from 'yup';
const ShowTime = (props) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: props.match.params.id,
            ngayChieuGioChieu: '',
            maRap: '',
            giaVe: '',
            maCumRap: '',
        },
        validationSchema: Yup.object().shape({
            maCumRap: Yup.string().required('Mã cụm rạp phải được chọn'),
            maRap: Yup.string().required('Mã rạp phải được chọn'),
            ngayChieuGioChieu:Yup.string().required('ngày chiếu giờ chiếu không được bỏ trống'),
            giaVe: Yup.number().typeError('Giá vé phải là số').required('Giá vé không được bỏ trống').min(75000,'Tối thiểu là 75000').max(200000,'Tối đa là 200000')
        }),
        onSubmit: (values) => {
            dispatch(taoLichChieuAction(values));
        }
    })
    const {touched, errors } = formik;
    const [state, setState] = useState({
        heThongRapChieu: [],
        cumRapChieu: [],
    })
    useEffect(async () => {
        try {
            let result = await quanLyRapService.layHeThongRap();
            setState({ ...state, heThongRapChieu: result.data })
        }
        catch (error) {
        }
    }, [])
    const handleChangeHeThongRap = async (values) => {
        try {
            let result = await quanLyRapService.layThongTinCumRapTheoHeThong(values);
            setState({ ...state, cumRapChieu: result.data })
        }
        catch (error) {
        }
    }
    const convertSelectHTR = () => {
        return state.heThongRapChieu?.map((htr, index) => {
            return { label: htr.tenHeThongRap, value: htr.maHeThongRap }
        })
    }
    const handleChangeCumRap = (value) => {
        formik.setFieldValue('maCumRap', value)
    }
    const handleChangeMaRap = (value) => {
        formik.setFieldValue('maRap', value)
    }
    const onOk = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY HH:mm:ss'))
    }
    const onChangeDate = (values) => {
        formik.setFieldValue('ngayChieuGioChieu', moment(values).format('DD/MM/YYYY HH:mm:ss'))
    }
    let film = {};
    if (localStorage.getItem('film')) {
        film = JSON.parse(localStorage.getItem('film'))
    }
    return (
        <div className='showtime__admin' >
            <Button onClick={() => {
                history.push('/admin/films')
            }} style={{ cursor: 'pointer' }} type="primary" >Quay lại</Button>
            <h1 className='text-center'>Tạo lịch chiếu</h1>
            <div className='row'>
                <div className='col-12 col-lg-4 m-0 p-0'>
                    <div className='text-center'>
                        <h3 style={{ color: '#263238' }} >{props.match.params.tenphim}</h3>

                        <img src={film.hinhAnh} className='img-film' alt={film.tenPhim} />
                    </div>
                </div>
                <div className='col-12 col-lg-8'>
                    <Form
                        onSubmitCapture={formik.handleSubmit}
                        name="basic"
                        labelCol={{ span: 7 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }} className='pt-5'
                    >
                        <Form.Item label="Hệ thống rạp">
                            <Select options={convertSelectHTR()} onChange={handleChangeHeThongRap} placeholder="Chọn hệ thống rạp" />
                        </Form.Item>
                        <Form.Item label="cụm rạp">
                            <Select options={state.cumRapChieu.map((cumRap, index) => {
                                return { label: cumRap.tenCumRap, value: cumRap.maCumRap }
                            })} onChange={handleChangeCumRap} placeholder="Chọn cụm rạp" onBlur={formik.handleBlur} />
                            {touched.maCumRap && errors.maCumRap && <p className="text text-danger">{formik.errors.maCumRap}</p>}

                        </Form.Item>
                        <Form.Item label="danh sách rạp">
                            <Select options={state.cumRapChieu.find(rap => rap.maCumRap == formik.values.maCumRap)?.danhSachRap.map((item, index) => {
                                return { label: item.tenRap, value: item.maRap }
                            })} onChange={handleChangeMaRap} placeholder="Chọn mã rạp" onBlur={formik.handleBlur} />
                            {touched.maRap && errors.maRap && <p className="text text-danger">{formik.errors.maRap}</p>}
                        </Form.Item>
                        <Form.Item label="Ngày chiếu giờ chiếu">
                            <DatePicker format="DD/MM/YYYY HH:mm:ss" name='ngayChieuGioChieu' showTime onChange={onChangeDate} onBlur={formik.handleBlur} />
                            {touched.ngayChieuGioChieu && errors.ngayChieuGioChieu && <p className="text text-danger">{formik.errors.ngayChieuGioChieu}</p>}
                        </Form.Item>
                        <Form.Item label="Giá vé">
                            <Input name='giaVe' min={75000} max={200000} type='number' onChange={formik.handleChange} onBlur={formik.handleBlur} style={{width:'25%'}} />
                            {touched.giaVe && errors.giaVe && <p className="text text-danger">{formik.errors.giaVe}</p>}
                        </Form.Item>
                        <Form.Item label="Chức năng">
                            <Button htmlType='submit' type='primary'>Tạo lịch chiếu</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}
export default ShowTime;
