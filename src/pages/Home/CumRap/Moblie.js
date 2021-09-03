import React, { useState } from 'react';
import rapImage from '../../../assets/img/rapImage.jpg'
import { Collapse } from 'antd';
import './mobile.css'
import { NavLink } from 'react-router-dom';
import moment from 'moment';

const { Panel } = Collapse;

const Moblie = ({ arrLichChieu,color }) => {
    return (
        <div className='row cumrap__mobile '>
            <div className='col-12 pb-3'>
                {arrLichChieu[0]?.lstCumRap.map((item, index) => {
                    return <Collapse accordion key={index} >
                        <Panel  header={<div className='col-12 d-flex align-items-center px-0 ' >
                            <img src={rapImage} alt='rạp phim' width={55} height={55} />
                            <div className='mx-2'>
                                <h6 style={{ textTransform: 'capitalize' }} className='ten-cum-rap' ><span style={{ color: color }}>{item?.tenCumRap.slice(0, item?.tenCumRap.indexOf('-'))}</span>
                                    <span>{item?.tenCumRap.slice(item?.tenCumRap.indexOf('-'))}</span>
                                </h6>
                                <h6 style={{ fontSize: '13px', color: '#030303b8' }} className='dia-chi'>{item.diaChi}</h6>
                            </div>
                        </div>} >
                            <div className='chiTietPhim__mobile pt-3'>
                                {item.danhSachPhim.map((film, index) => {
                                    return <div className='col-12  border-bottom ' key={index} >
                                        <div className='d-flex py-3'>
                                            <img src={film.hinhAnh} width={55} height={55} alt='hình phím' />
                                            <div className='ml-1'>
                                                <h6 className='name-film' >{film.tenPhim}</h6>
                                                <p className='text-danger run-time' style={{ fontWeight: 550 }}>120 phút</p>
                                            </div>
                                        </div>
                                        <div >
                                            <div className='row  '>
                                                {film.lstLichChieuTheoPhim.slice(0, 12).map((lichChieu, index) => {
                                                    return <div className='col-6 pb-4 px-0 text-center' key={index}>
                                                        <NavLink to={'/checkout/' + lichChieu.maLichChieu} className='text-dark'>
                                                            <span className='bg-light p-2 border rounded ngayGioChieu' style={{ fontWeight: 550 }}>
                                                                <span style={{ color: '#0da651' }} >{moment(lichChieu.ngayChieuGioChieu).format("HH:MM ")}</span>
                                                                <span>~</span>
                                                                <span>{moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YYYY ")} </span>
                                                            </span>
                                                        </NavLink>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </Panel>
                    </Collapse>
                })}
            </div>

        </div>
    );
}
export default Moblie;

