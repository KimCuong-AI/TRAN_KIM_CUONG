import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import _ from "lodash";
const History = (props) => {
    let { thongTinDatVe } = props.thongTinTK
    const dataSource = thongTinDatVe;
    const columns = [
        {
            title: 'Ngày đặt',
            dataIndex: 'ngayDat',
            key: 'ngayDat',
            width: '18%',
            render: ngayDat => {
                return (
                    <span>{moment(ngayDat).format("HH:MM ")}-{moment(ngayDat).format("DD/MM/YYYY ")} </span>
                )
            },
            sortDirections: [ 'descend','ascend'],
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
            key: 'danhSachGhe',
            render: danhSachGhe => {
                return <div>
                    <p>{danhSachGhe[0].tenHeThongRap}</p>
                </div>
            }
        },
        {
            title: 'danh sách ghế ',
            dataIndex: 'danhSachGhe',
            key: 'danhSachGhe',
            width:'10%',
            render: danhSachGhe => {
                return <div className='row'>
                    {_.sortBy(danhSachGhe, ["maGhe"]).map((ghe, vitri) => {
                        return <div className='' key={vitri}>
                            <p className='m-1' style={{margin:'30px'}}>  {ghe.tenGhe} </p>
                        </div>
                    })}

                </div>
            }
        },
    ];
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} rowKey={'maVe'} scroll={{ x: 'true' }} />
        </div>
    );
}
export default History;
