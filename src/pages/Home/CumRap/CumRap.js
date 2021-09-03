import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './cumRap.css';
import { NavLink } from 'react-router-dom'
import moment from 'moment'
import rapImage from '../../../assets/img/rapImage.jpg'
import { getApiHeThongRap, getApiLichChieu } from '../../../redux/actions/RapAction';
import { useMediaQuery } from 'react-responsive'
import Moblie from './Moblie';
const CumRap = () => {
    const arrHeThongRap = useSelector(state => state.QuanLyRapReducer.arrHeThongRap)
    const arrLichChieu = useSelector(state => state.QuanLyRapReducer.arrLichChieu)
    const dispatch = useDispatch();
    const [stateTab, setStateTab] = useState({ activeTab: 'BHDStar' })
    const [stateIndex, setStateIndex] = useState({
        activeIndex: 0
    })
    useEffect(() => {
        dispatch(getApiHeThongRap());
    }, [])
    useEffect(() => {
        dispatch(getApiLichChieu(stateTab.activeTab))
    }, [stateTab])
    useEffect(() => {
        setStateIndex({ activeIndex: 0 })
    }, [stateTab.activeTab])
    const activeClass = 'isactive';
    const isBigScreen = useMediaQuery({ query: '(min-width: 575.5px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 575.5px)' })
    const renderHeThongRap = () => {
        return (

            <div >
                <div className='row mt-3 '>
                    {arrHeThongRap.map((htr, index) => {
                        return <div className='col-4 col-sm-2  col-lg-12  text-center p-0' key={index}>
                            <img src={htr.logo} className={` ${stateTab.activeTab == htr.maHeThongRap ? activeClass : ""} opacity heThongRap`} alt='logo' style={{ width: '60px' }} onClick={() => { setStateTab({ activeTab: htr.maHeThongRap }); setColor(arrColor[index]) }} />
                            <hr />
                        </div >
                    })}
                </div>
            </div>
        )
    }
    const [color,setColor]=useState('#31ac5c')
    const arrColor=['#31ac5c','#ee2d24','#283593','#ff6f00','#ff1744','#e65100']
    const renderLichChieu = () => {
        return (
            <div>
                {isBigScreen &&

                    <div className='row border-right'>
                        <div className='col-12 col-md-5 cum__rap border border-bottom-0 border-top-0 pt-3'>
                            {arrLichChieu[0]?.lstCumRap.map((item, index) => {
                                return <div className='col-12 ' key={index}>
                                    <div onClick={() => { setStateIndex({ activeIndex: index }) }} className={` ${stateIndex.activeIndex == index ? activeClass : ""} opacity  d-flex align-items-center cumRapItem`}  >
                                        <img src={rapImage} alt='...' width={55} height={55} alt='rạp phim' data-index={index} />
                                        <div className='mx-2'>
                                            <h6 style={{textTransform: 'capitalize' }} ><span style={{color:color}}>{item?.tenCumRap.slice(0, item?.tenCumRap.indexOf('-'))}</span>
                                                <span>{item?.tenCumRap.slice(item?.tenCumRap.indexOf('-'))}</span>
                                            </h6>

                                            <h6 style={{ fontSize: '13px', color: '#030303b8' }}>{item.diaChi}</h6>
                                        </div>
                                    </div>
                                    <hr className='my-3' />
                                </div>
                            })}
                        </div>
                        <div className='col-12 col-md-7 chiTietPhim pt-3'>
                            {arrLichChieu[0]?.lstCumRap.filter((item, index) => index == stateIndex.activeIndex).map((item, index) => {
                                return item.danhSachPhim.map((film, index) => {
                                    return <div className='col-12  border-bottom' key={index} >
                                        <div className='d-flex py-3'>
                                            <img src={film.hinhAnh} width={55} height={55} alt='hình phim' />
                                            <div className='ml-1'>
                                                <h6 >{film.tenPhim}</h6>
                                                <p className='text-danger' style={{ fontWeight: 550 }}>120 phút</p>
                                            </div>
                                        </div>
                                        <div >
                                            <div className='row  '>
                                                {film.lstLichChieuTheoPhim.slice(0, 12).map((lichChieu, index) => {
                                                    return <div className='col-6 col-sm-6 col-xl-4 pb-4 ' key={index}>
                                                        <NavLink to={'/checkout/' + lichChieu.maLichChieu} className='text-dark'>
                                                            <span className='bg-light p-2 border rounded ngayGioChieu' style={{ fontWeight: 550 }}>
                                                                <span style={{ color: '#0da651' }} >{moment(lichChieu.ngayChieuGioChieu).format("HH:MM ")} </span>
                                                                <span>~</span>
                                                                <span> {moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YYYY ")} </span>
                                                            </span>
                                                        </NavLink>
                                                    </div>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                })
                            })}
                        </div>
                    </div>
                }
                {isTabletOrMobile && <Moblie arrLichChieu={arrLichChieu} color={color} />}
            </div>

        )
    }
    return (
        <div >
            <h3 className='text-center pb-2'> Hệ Thống Rạp Chiếu </h3>
            <div className='container cumHeThongRap' >
                <div className='row '>
                    <div className='col-12 col-lg-1'>
                        {renderHeThongRap()}
                    </div>
                    <div className='col-12 col-lg-11'>
                        {renderLichChieu()}
                    </div>
                </div>
            </div>
        </div>

    );
}
export default CumRap;
