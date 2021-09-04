import React, {useEffect } from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { USER_LOGIN } from '../../util/setting';
import { useDispatch, useSelector } from 'react-redux';
import backgroundApp from '../../assets/img/backapp.jpg';
import './historyCheckout.css'
import { layThongTinTaiKhoanAction } from '../../redux/actions/UserAction';
import _ from "lodash";
import Loading from '../../components/Loading/Loading';
const HistoryCheckout = (props) => {
    const dispatch = useDispatch()
    let thongTinTK = useSelector(state => state.UserReducer.thongTin)
    //dispatch lấy thông tin tài khoản
    const thongtin = JSON.parse(localStorage.getItem(USER_LOGIN));
    useEffect(() => {
        dispatch(layThongTinTaiKhoanAction(thongtin.taiKhoan));
    }, [])
    const dataSource = thongTinTK.thongTinDatVe;
    const columns = [
        {
            title: 'Ngày đặt',
            dataIndex: 'ngayDat',
            key: 'ngayDat',
            width: '18%',
            render: ngayDat => {
                    return (
                        <p className='m-0'>{moment(ngayDat).format("HH:MM ")}-{moment(ngayDat).format("DD/MM/YYYY ")} </p>
                    )
            },
            sortOrder: 'descend',
            sorter: (a, b) => moment(a.ngayDat).unix() - moment(b.ngayDat).unix()
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            key: 'tenPhim',

        },
        {
            title: 'Thời lượng phim',
            dataIndex: 'thoiLuongPhim',
            key: 'thoiLuongPhim',

        },
        {
            title: 'Giá vé',
            dataIndex: 'giaVe',
            key: 'giaVe',
            render: giaVe => {
                return (
                    <span>{giaVe.toLocaleString()}</span>
                )
            }
        },
        {
            title: 'Mã vé',
            dataIndex: 'maVe',
            key: 'maVe',
            responsive: ['md'],
        },
        {
            title: 'Tên rạp',
            dataIndex: 'danhSachGhe',
            key: 'tenHeThongRap',
            render: danhSachGhe => {
                return <div>
                    <p className='mb-0'>{danhSachGhe[0].tenHeThongRap}</p>
                </div>
            }
        },
        {
            title: 'Danh sách ghế ',
            dataIndex: 'danhSachGhe',
            key: 'maGhe',
            width: '10%',
            render: danhSachGhe => {
                return <div className='row'>
                    { _.sortBy(danhSachGhe, ["maGhe"]).map((ghe, vitri) => {
                        return <div className='px-0 mx-0' key={vitri}>
                            <span className='m-1'>  {ghe.tenGhe} </span>
                        </div>
                    })}

                </div>
            }


        },
    ];
    return (
        <div style={{ background: `url(${backgroundApp})`, minHeight: '100vh' }}>
            <Loading/>
            <div className=' history__checkout' >
                <h1 className='text-center' style={{ color: '#e6f7ff' }}>Danh sách vé đã đặt </h1>
                <Table dataSource={dataSource} columns={columns} rowKey={'maVe'} scroll={{ x: 'true' }} />
            </div>
        </div>

    );
}

export default HistoryCheckout;
