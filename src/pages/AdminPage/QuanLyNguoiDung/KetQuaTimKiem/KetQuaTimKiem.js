import { DeleteOutlined } from '@ant-design/icons';
import { Table, Space, Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { history } from '../../../../App';
import { xoaNguoiDungAction } from '../../../../redux/actions/UserAction';
import CapNhatNguoiDung from '../CapNhatNguoiDung/CapNhatNguoiDung';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { quanLyNguoiDungService } from '../../../../services/quanly';
const { confirm } = Modal;
const KetQuaTimKiem = (props) => {
    const [state, setState] = useState({ searchUpdate: '', searchResults: [] })
    const dispatch = useDispatch()
    const showConfirm = (taiKhoan) => {
        confirm({
            title: `Bạn có muốn xóa người dùng ${taiKhoan}`,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                dispatch(xoaNguoiDungAction(taiKhoan))
                setTimeout(() => {
                    handleSearch()
                }, 600)
            },
            onCancel() {
            },
        });
    }
    let tenNguoiDung = props.location.state?.searchText;
    const handleSearch = async () => {
        try {
            const result = await quanLyNguoiDungService.timKiemNguoiDung(tenNguoiDung)
            setState({
                searchUpdate: tenNguoiDung,
                searchResults: result.data,
            })
        }
        catch (error) {
        }
    }
    useEffect(() => {
        handleSearch()
    }, [state.searchUpdate])
    const dataSource = state.searchResults;
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

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',

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
            title: 'Mã loại người dùng',
            dataIndex: 'maLoaiNguoiDung',
            key: 'maLoaiNguoiDung',

        },
        {
            title: 'Thực hiện',
            key: 'action',
            render: (text, nguoiDung, index) => (
                <Space size="middle">
                    <span onClick={() => {
                        showConfirm(nguoiDung.taiKhoan)
                    }} className='text-danger h5' style={{ cursor: 'pointer' }}><DeleteOutlined /> </span>
                    <div style={{ cursor: "pointer" }}>
                        <CapNhatNguoiDung nguoiDung={nguoiDung} handleSearch={handleSearch} />
                    </div>
                </Space>
            ),
        },
    ];
    return (
        <div > <Button onClick={() => {
            history.push('/admin/nguoidung')
        }} type="primary" >Quay lại</Button>
            <h1 className='text-center'>Kết Quả Tìm Kiếm Người dùng</h1>
            <h5>Kết quả tìm kiếm người dùng có tên "{tenNguoiDung}"</h5>
            <Table dataSource={dataSource} columns={columns} rowKey={'taiKhoan'} scroll={{ x: 'true' }} />
        </div>
    );
}
export default KetQuaTimKiem;
