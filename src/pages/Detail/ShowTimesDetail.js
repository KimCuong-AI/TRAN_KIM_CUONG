import moment from 'moment';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import rapImage from '../../assets/img/rapImage.jpg'
import './showTimeDetail.css'
import { Collapse } from 'antd';
import { useMediaQuery } from 'react-responsive'
const { Panel } = Collapse;

const ShowTimesDetail = (props) => {
    const isBigScreen = useMediaQuery({ query: '(min-width: 767.5px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767.5px)' })
    let { thongTinChiTiet } = props;
    const [tabs, setTabs] = useState('lichChieu');
    const [heThongRap, setHeThongRap] = useState(0);
    const renderThongTin = () => {
        return (
            <div className='container showtimes__info'>
                <div className='row'>
                    <div className='col-12 col-sm-6'>
                        <div className=' row '>
                            <div className='col-5 col-sm-6 col-md-5 '>
                                <h6 className='text-justify' style={{ textTransform: 'capitalize' }}>Tên phim:</h6>
                            </div>
                            <div className='col-7 col-sm-6 p-0'>
                                <h6>{thongTinChiTiet.tenPhim}</h6>
                            </div>
                        </div>
                        <div className=' row '>
                            <div className='col-5 col-sm-6 col-md-5 '>
                                <h6>  Ngày công chiếu:</h6>
                            </div>
                            <div className='col-7 col-sm-6 p-0'>
                                <h6>{moment(thongTinChiTiet.ngayKhoiChieu).format("DD.MM.YYYY ")} </h6>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-sm-6 pt-3 pt-sm-0'>
                        <h5>Nội dung:</h5>
                        <p className='text-justify'>{thongTinChiTiet.moTa}</p>
                    </div>
                </div>
                <div className='trailer'>          
                    {isBigScreen &&
                         <div>
                            <h5>Trailer phim:</h5>
                            <iframe src={thongTinChiTiet.trailer} frameBorder='0' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allow="fullscreen;"></iframe>
                        </div>
                      }
                </div>
            </div>
        )
    }
    const renderLichChieu = () => {
        return (
            <div>
                {isBigScreen &&
                    <div className='row showtime__hethongrap' style={{ backgroundColor: 'white' }}>
                        <div className=' list__hethongrap col-3'>
                            <div className='row '>
                                {thongTinChiTiet.heThongRapChieu?.map((htr, index) => {
                                    return <div className='col-12 border-bottom text-center text-md-left' key={index}>
                                        <div className={` ${heThongRap == index ? 'active-htr' : ''} none-htr m-3`} onClick={() => {
                                            setHeThongRap(index)
                                        }}>
                                            <div>
                                                <img src={htr.logo} width={60} alt='logo' />
                                                <h6 style={{ color: '#263237' }} > {htr.tenHeThongRap}</h6>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className='col-9 pt-3 showtime__item border-left '>
                            <div className='row'>
                                {thongTinChiTiet.heThongRapChieu?.filter((item, index) => index == heThongRap).map((htr, index) => {
                                    return htr.cumRapChieu.map((lichChieu, index) => {
                                        return <div className='col-12 mb-3  ' key={index} style={{ borderBottom: ' solid 1px  #ededee' }}>
                                            <div className='mb-4 d-flex align-items-center'>
                                                <img src={rapImage} style={{ width: '65px', height: '65px' }} className='mr-2 ' alt='rạp phim' />
                                                <div>
                                                    <span className=' text-danger font-weight-bold' style={{ fontSize: '17px' }} >{lichChieu.tenCumRap}</span>
                                                </div>
                                            </div>
                                            <div className='row'>
                                                {lichChieu.lichChieuPhim.slice(0, 15).map((gioChieu, index) => {
                                                    return <div className='col-6 col-sm-4 pb-4 date__time ' key={index}>
                                                        <NavLink to={'/checkout/' + gioChieu.maLichChieu} className='text-dark  ' style={{ fontWeight: '600' }} >
                                                            <span className='border rounded px-1 py-2 p-sm-2 date__time__content  ' style={{ background: '#fafafa' }}>
                                                                <span className='time' style={{ color: '#54ae75' }}>{moment(gioChieu.ngayChieuGioChieu).format("HH:MM ")} </span>
                                                                <span>~ </span>
                                                                <span>{moment(gioChieu.ngayChieuGioChieu).format("DD/MM/YYYY ")} </span>
                                                            </span>
                                                        </NavLink>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    })
                                })}
                            </div>
                        </div>
                    </div>
                }
                {isTabletOrMobile &&
                    <div className='row showtime__hethongrap' style={{ backgroundColor: 'white' }}>
                        <div className='col-12 list__hethongrap'>
                            <div className='row '>
                                {thongTinChiTiet.heThongRapChieu?.map((htr, index) => {
                                    return <Collapse key={index} className='col-12'>
                                        <Panel showArrow={false} header={<div className='col-12 text-center ' key={index}>
                                            <div>
                                                <div>
                                                    <img src={htr.logo} width={60} alt='logo' />
                                                    <h6 style={{ color: '#263237' }} > {htr.tenHeThongRap}</h6>
                                                </div>
                                            </div>
                                        </div>} >
                                            <div className='row showtime__item'>
                                                {htr.cumRapChieu.map((lichChieu, index) => {
                                                    return <div className='col-12 mb-3  ' key={index} style={{ borderBottom: ' solid 1px  #ededee' }}>
                                                        <div className='mb-4 d-flex align-items-center'>
                                                            <img src={rapImage} style={{ width: '65px', height: '65px' }} className='mr-2 ' alt='rạp phim' />
                                                            <div>
                                                                <span className=' text-danger font-weight-bold' style={{ fontSize: '17px' }} >{lichChieu.tenCumRap}</span>
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            {lichChieu.lichChieuPhim.slice(0, 15).map((gioChieu, index) => {
                                                                return <div className='col-6 col-sm-4 pb-4 date__time ' key={index}>
                                                                    <NavLink to={'/checkout/' + gioChieu.maLichChieu} className='text-dark  ' style={{ fontWeight: '600' }} >
                                                                        <span className='border rounded px-1 py-2 p-sm-2 date__time__content  ' style={{ background: '#fafafa' }}>
                                                                            <span className='time' style={{ color: '#54ae75' }}>{moment(gioChieu.ngayChieuGioChieu).format("HH:MM ")} </span>
                                                                            <span>~ </span>
                                                                            <span>{moment(gioChieu.ngayChieuGioChieu).format("DD/MM/YYYY ")} </span>
                                                                        </span>
                                                                    </NavLink>
                                                                </div>
                                                            })}
                                                        </div>
                                                    </div>
                                                })}
                                            </div>   
                                        </Panel>
                                    </Collapse>
                                })}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
    return (
        <div className=' showtime__content pb-4'>
            <div className='tabs text-center pb-3'>
                <span className={`${tabs == 'lichChieu' ? 'active-tab' : ''}  none-active-tab`} onClick={() => {
                    setTabs('lichChieu')
                }} >LỊCH CHIẾU</span>
                <span className={`${tabs == 'thongTin' ? 'active-tab' : ''}  none-active-tab`} onClick={() => {
                    setTabs('thongTin')
                }}>THÔNG TIN</span>
            </div>
            {tabs == 'thongTin' ? renderThongTin() : ''}
            {tabs == 'lichChieu' ? renderLichChieu() : ''}

        </div>
    );
}
export default ShowTimesDetail;
