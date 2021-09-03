import { Table, Input, Button, Modal, Tooltip } from 'antd';
import React, { Fragment, useEffect } from 'react';
import { DeleteOutlined, EditOutlined, CalendarOutlined, FileAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getApiFilmAction, xoaPhim } from '../../../redux/actions/FilmActions';
import { NavLink } from 'react-router-dom';
import { history } from '../../../App';
import moment from 'moment';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const Films = () => {
    const showConfirm = (film, filmName) => {
        confirm({
            title: `Bạn có muốn xóa phim ${filmName}`,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                dispatch(xoaPhim(film))

            },
            onCancel() {
            },
        });
    }
    const arrFilmDefault = useSelector(state => state.FilmReducer.arrFilm)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getApiFilmAction())
    }, [])
    const { Search } = Input;
    const columns = [ 
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.maPhim - b.maPhim,
            sortDirections: ['descend','ascend'],
            width: '10%'
        },
        {
            title: 'Ngày khởi chiếu ',
            dataIndex: 'ngayKhoiChieu',
            render: (text, film) => {
                return <Fragment>
                    <p>{moment(film.ngayKhoiChieu).format('DD/MM/YYYY')}</p>

                </Fragment>
            },
            width: '10%',
            sorter: (a, b) => moment(a.ngayKhoiChieu).unix() - moment(b.ngayKhoiChieu).unix()
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'hinhAnh',
            render: (text, film) => {
                return <Fragment>
                    <img src={film.hinhAnh} alt={film.tenPhim} width={50} height={50} onError={(e) => {
                        e.target.onError = null;
                    }} />
                </Fragment>
            },
            width: '15%'
        },
        {
            title: 'Tên phim',
            dataIndex: 'tenPhim',
            sorter: (a, b) => {
                let tenPhimA = a.tenPhim.toLowerCase().trim();
                let tenPhimB = b.tenPhim.toLowerCase().trim();
                if (tenPhimA > tenPhimB) {
                    return 1;
                }
                return -1;
            },
            sortDirections: ['descend','ascend'],
        },
        {
            title: 'Mô tả',
            dataIndex: 'moTa',
            sorter: (a, b) => {
                let moTaA = a.moTa.toLowerCase().trim();
                let moTaB = b.moTa.toLowerCase().trim();
                if (moTaA > moTaB) {
                    return 1;
                }
                return -1;
            },
            render: (text, film) => {
                return <Fragment>
                    {film.moTa.length > 50 ? film.moTa.substr(0, 50) + '...' : film.moTa}
                </Fragment>
            },
            sortDirections: ['descend','ascend'],
            width: '20%'
        },
        {
            title: 'Thực hiện',
            dataIndex: 'maPhim',
            render: (text, film) => {
                return <Fragment>
                    <Tooltip placement="top" title="Chỉnh sửa" arrowPointAtCenter>
                        <NavLink key={1} className=' h5 m-1 p-1' to={`/admin/films/edit/${film.maPhim}`} ><EditOutlined /></NavLink>
                    </Tooltip>
                    <Tooltip placement="top" title="xóa" arrowPointAtCenter>
                        <span style={{ cursor: 'pointer' }} key={2} className='h5 text-danger m-1 p-1 ' onClick={() => {
                            showConfirm(film.maPhim, film.tenPhim)
                        }} ><DeleteOutlined /></span>
                    </Tooltip>
                    <Tooltip placement="top" title="Tạo lịch chiếu" arrowPointAtCenter>
                        <NavLink key={1} className='h5 m-1 p-1 text-success' to={`/admin/films/showtimes/${film.maPhim}/${film.tenPhim}`} onClick={() => {
                            localStorage.setItem('film', JSON.stringify(film))
                        }} ><CalendarOutlined /></NavLink>
                    </Tooltip>

                </Fragment>
            },
            sortDirections: ['descend','ascend'],
            width: '20%'
        },
    ];
    const data = arrFilmDefault;
    const onSearch = value => {
        dispatch(getApiFilmAction(value))
        //gọi Api lấy danh sách phim
    }
    return (
        <div style={{ minHeight: '600px' }}>
            <h1 className='text-center'>Quản lý phim</h1>

            <Button type='primary' size='large' className='mb-3 ' onClick={() => {
                history.push('/admin/films/addnew')
            }}>Thêm phim<FileAddOutlined /></Button>
            <Search
                placeholder="Tìm phim...."
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
            <Table columns={columns} dataSource={data} rowKey={'maPhim'} scroll={{ x: 'true' }} />
        </div>
    );
}
export default Films;
