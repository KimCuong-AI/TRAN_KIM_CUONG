import { Space, Table, Modal, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachNguoiDungAction, xoaNguoiDungAction } from '../../../redux/actions/UserAction';
import { DeleteOutlined } from '@ant-design/icons';
import ThemNguoiDung from './ThemNguoiDung/ThemNguoiDung';
import './NguoiDung.css'
import CapNhatNguoiDung from './CapNhatNguoiDung/CapNhatNguoiDung';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import TimKiemNguoiDung from './TimKiemNguoiDung';
const { confirm } = Modal;
const NguoiDung = () => {
    const showConfirm = (taiKhoan) => {
        confirm({
            title: `Bạn có muốn xóa người dùng ${taiKhoan}`,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                dispatch(xoaNguoiDungAction(taiKhoan))
            },
            onCancel() {
            },
        });
    }
    const dispatch = useDispatch()
    let danhSach = useSelector(state => state.UserReducer.danhSachNguoiDung)
    useEffect(() => {
        dispatch(layDanhSachNguoiDungAction())
    }, [])
    const dataSource = danhSach;
    const columns = [
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
            sorter: (a, b) => {
                let hoTenA = a.hoTen.toLowerCase().trim();
                let hoTenB = b.hoTen.toLowerCase().trim();
                if (hoTenA > hoTenB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend', 'ascend'],

        },
        {
            title: 'Số điện thoại',
            dataIndex: 'soDt',
            key: 'soDt',

        },
        {
            title: 'Mật khẩu',
            dataIndex: 'matKhau',
            key: 'matKhau',

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

        },
        {
            title: 'Mã loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            key: 'maLoaiNguoiDung',
            filters: [
                { text: 'Khách hàng', value: 'KhachHang' },
                { text: 'Quản trị', value: 'QuanTri' },
            ],
            onFilter: (value, record) => record.maLoaiNguoiDung.includes(value),
        },
        {
            title: 'Thực hiện',
            dataIndex: 'taiKhoan',
            key: 'taiKhoan',
            render: (text, nguoiDung, index) => (
                <Space size="middle">
                    <Tooltip  placement="top" title="Xóa" arrowPointAtCenter>
                        <span onClick={() => {
                            showConfirm(nguoiDung.taiKhoan)
                        }} className='text-danger h5' style={{ cursor: 'pointer' }}><DeleteOutlined /> </span>
                    </Tooltip>
                        <div style={{ cursor: "pointer" }}>
                            <CapNhatNguoiDung nguoiDung={nguoiDung} />
                        </div>
                </Space>
            ),
        },

    ];
    return (
        <div className='quanLyNguoiDung'>
            <h1 className='text-center'>Quản lý người dùng</h1>
            <div className='pb-3'>
                <ThemNguoiDung />
            </div>
            <TimKiemNguoiDung />
            <div style={{ overflow: 'auto' }} >
                <Table dataSource={dataSource} columns={columns} rowKey={'taiKhoan'} style={{ width: '100%' }} scroll={{ x: 'true' }} />
            </div>
        </div>
    );
}
export default NguoiDung;
