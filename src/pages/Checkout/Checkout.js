import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { USER_LOGIN } from "../../util/setting";
import _ from "lodash";
import { UserAddOutlined } from "@ant-design/icons";
import { datVeAction, layChiTietPhongVeAction, quaylaitab } from "../../redux/actions/DatveAction";
import './checkout.css'
import HistoryCheckout from "./HistoryCheckout";
import Reservation from "./ReservationTime.js";
import { DAT_GHE, XOA_DANH_SACH_GHE_DANG_DAT } from "../../redux/actions/types/DatVeType";
import { history } from "../../App";
import ScrollToTop from './../../components/ScrollToTop/ScrollToTop';
import LoadingCheckout from "../../components/Loading/LoadingCheckout";
const Checkout = (props) => {
    //chuyển tab sau khi đặt
    const { activeCheckoutTab } = useSelector(state => state.QuanLyDatVeReducer);
    const [checkoutTab, setCheckoutTab] = useState('chonGhe')
    useEffect(() => {
        dispatch(dispatch({
            type: XOA_DANH_SACH_GHE_DANG_DAT
        }))
        dispatch(quaylaitab)
    }, [props.location.pathname])
    useEffect(() => {
        setCheckoutTab(activeCheckoutTab)
    }, [activeCheckoutTab])
    const { chiTietPhongVe, danhSachGheDangDat } = useSelector(state => state.QuanLyDatVeReducer);
    const { userLogin } = useSelector((state) => state.UserReducer);
    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;
    const dispatch = useDispatch();
    useEffect(() => {
        const action = layChiTietPhongVeAction(props.match.params.id);
        dispatch(action);
    }, []);
    if (!localStorage.getItem(USER_LOGIN)) {
        alert("bạn cần phải đăng nhập!");
        return <Redirect to="/login" />;
    }
    const renderGhe = () => {
        return danhSachGhe?.map((ghe, index) => {
            let classGheVip = ghe.loaiGhe === "Vip" ? "gheVip" : "";
            let classGheDaDat = ghe.daDat === true ? "gheDaDat" : "";
            let classGheDangDat = "";
            let classGheMinhDat = "";
            if (ghe.taiKhoanNguoiDat === userLogin.taiKhoan) {
                classGheMinhDat = "gheMinhDat";
            }
            let indexGheDD = danhSachGheDangDat.findIndex(
                (gheDD) => gheDD.maGhe === ghe.maGhe
            );
            if (indexGheDD !== -1) {
                classGheDangDat = "gheDangDat";
            }
            return (
                <>
                    <button key={index}
                        onClick={() => {
                            const action = { type: DAT_GHE, ghe: ghe };
                            dispatch(action);
                        }}
                        disabled={ghe.daDat}
                        className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheMinhDat} `}
                    >
                        {classGheMinhDat === "" ? ghe.stt : <UserAddOutlined />}
                    </button>
                    {(index + 1) % 16 === 0 ? <br /> : ""}
                </>
            );
        });
    };
    const renderCheckOut = () => {
        return (
            <div className=" checkout__content" >
                <div className="row w-100 m-auto">
                    <div className="col-12 col-lg-8 col-xl-9 pt-3 ">
                        <div className="text-center">
                            <div className='row d-flex justify-content-around justify-content-sm-between m-auto w-75' >
                                <div className='mx-3 mt-2 m-sm-0 '>
                                    <h6 style={{ color: '#44c020', fontWeight: 550, fontSize: '18px' }} className='my-1'>{thongTinPhim?.tenCumRap.slice(0, thongTinPhim?.tenCumRap.indexOf('-'))}</h6>
                                    <h6>{thongTinPhim?.tenCumRap.slice(thongTinPhim?.tenCumRap.indexOf('-'))}</h6>
                                </div>
                                <div className='mx-3 mt-2 m-sm-0 '>
                                    <Reservation />
                                </div>
                            </div>
                            <img
                                src="https://tix.vn/app/assets/img/icons/screen.png"
                                alt="màn hình rạp"
                                style={{ maxWidth: '100%' }}
                            />
                            <br />
                            <div className="danh__sach__ghe">{renderGhe()}</div>
                            <h5 className='text-center pt-2'>Chú thích</h5>
                            <div className='row m-auto w-75 note'>
                                <div className='col text-center'>
                                    <button className=' ghe'></button>
                                    <p>Ghế thường</p>
                                </div>
                                <div className='col text-center'>
                                    <button className='ghe gheDaDat'></button>
                                    <p>Ghế đã đặt</p>

                                </div>
                                <div className='col text-center'>
                                    <button className='ghe gheDangDat'></button>
                                    <p>Ghế đang đặt</p>
                                </div>
                                <div className='col text-center'>
                                    <button className='ghe gheVip '></button>
                                    <p>Ghế Vip</p>

                                </div>
                                <div className='col text-center'>
                                    <button className='ghe gheMinhDat '><UserAddOutlined /></button>
                                    <p>Ghế mình đã đặt</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4 col-xl-3 checkout__info ">
                        <div className='checkout__info__item row'>
                            <h1 className="text-center col-12" style={{ color: '#44c020' }}>
                                {danhSachGheDangDat
                                    .reduce((tongTien, gheDD, index) => {
                                        return (tongTien += gheDD.giaVe);
                                    }, 0)
                                    .toLocaleString()}{" "}đ
                            </h1>
                        </div>
                        <div className="row">
                            <div className="col-12 checkout__info__item text-center">
                                <img
                                    src={thongTinPhim?.hinhAnh}
                                    width="80"
                                    height="80"
                                    className="rounded-circle"
                                    alt={thongTinPhim?.tenPhim}
                                />
                            </div>
                            <div className="col-12 checkout__info__item">
                                <h5 className='font-weight-bold'>Tên phim: {thongTinPhim?.tenPhim}</h5>
                                <h6 >
                                    Địa điểm: {thongTinPhim?.diaChi} - {thongTinPhim?.tenCumRap}
                                </h6>
                                <h6 className="">
                                    Ngày chiếu: {thongTinPhim?.ngayChieu} -{" "}
                                    {thongTinPhim?.gioChieu}
                                </h6>
                            </div>
                        </div>
                        <div className="row checkout__info__item">
                            <div className="col-7 px-0">
                                <span >Ghế :</span>
                                {_.sortBy(danhSachGheDangDat, ["maGhe"]).map(
                                    (gheDangDat, index) => {
                                        return (
                                            <span
                                                key={index}
                                                className="font-weight-bold mx-2"
                                            >
                                                {gheDangDat.stt}{" "}
                                            </span>
                                        );
                                    }
                                )}
                            </div>
                            <div className=" font-weight-bold   col-5">
                                <h6 className="text-danger ">
                                    {danhSachGheDangDat
                                        .reduce((tongTien, gheDD, index) => {
                                            return (tongTien += gheDD.giaVe);
                                        }, 0)
                                        .toLocaleString()}{" "}Đ
                                </h6>
                            </div>
                        </div>
                        <div className=" row ">
                            <div className='checkout__info__item col-12'>
                                <h6 >Email: abc@gmail.com</h6>
                                <h6 >Phone: 12321321321</h6>
                            </div>
                        </div>
                        <div className='text-center'>
                            {danhSachGheDangDat.length == 0 ?
                                <button disabled onClick={() => {
                                    let thongTinDatVe = {
                                        maLichChieu: props.match.params.id,
                                        danhSachVe: danhSachGheDangDat,
                                        taiKhoanNguoiDung: userLogin.taiKhoan,
                                    };
                                    dispatch(datVeAction(thongTinDatVe));
                                }}
                                    className=" btn-booking-disabled" >ĐẶT VÉ</button> :
                                <button onClick={() => {
                                    let thongTinDatVe = {
                                        maLichChieu: props.match.params.id,
                                        danhSachVe: danhSachGheDangDat,
                                        taiKhoanNguoiDung: userLogin.taiKhoan,
                                    };
                                    dispatch(datVeAction(thongTinDatVe));
                                }}
                                    className=" btn-booking"  >ĐẶT VÉ</button>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='checkout__film'>
            <LoadingCheckout />
            <div className='checkout__film__tabs'>
                <div className='row'>
                    <div className='col-12 col-sm-9'>
                        <span className={`${checkoutTab == 'chonGhe' ? 'active-tab-action' : ''} active-tab-none mx-3`} style={{ cursor: 'pointer' }} onClick={() => {
                            setCheckoutTab('chonGhe')
                            dispatch(quaylaitab)
                        }}>1. CHỌN GHẾ VÀ THANH TOÁN </span>
                        <span className={`${checkoutTab == 'ketQua' ? 'active-tab-action' : ''} active-tab-none   mx-3`} style={{ cursor: 'pointer' }} onClick={() => {
                            setCheckoutTab('ketQua')
                            dispatch({
                                type: XOA_DANH_SACH_GHE_DANG_DAT
                            })
                        }}> 2. KẾT QUẢ ĐẶT VÉ</span>
                    </div>
                    <div className='col-12 col-sm-3 text-center pt-3 p-sm-0'>
                        <span className='h4 py-1 px-2 home ' onClick={() => {
                            history.push('/');
                        }} style={{ cursor: 'pointer', color: '#37474f' }}> <i className="fa fa-home" aria-hidden="true"></i> <span className='h5'>Trang chủ</span> </span>
                    </div>
                </div>
            </div>
            <div>
                {checkoutTab == 'chonGhe' ? renderCheckOut() : ''}
            </div>

            <div >
                {checkoutTab == 'ketQua' ? <HistoryCheckout /> : ''}
            </div>
            <ScrollToTop />
        </div>
    );
};
export default Checkout;
