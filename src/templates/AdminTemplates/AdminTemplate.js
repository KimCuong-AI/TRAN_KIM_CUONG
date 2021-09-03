import React from 'react'
import { Redirect, Route, NavLink} from 'react-router-dom';
import userImgae from '../../assets/img/userImage.jpg'
import { Layout, Menu } from 'antd';
import {
    UserOutlined,
    FileOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
const { Header, Sider, Content } = Layout;
export const AdminTemplate = (props) => {
    const { userLogin } = useSelector(state => state.UserReducer);
    if (userLogin.maLoaiNguoiDung !== 'QuanTri') {
        alert('Không có quyền truy cập vào trang này !');
        return <Redirect to='/' />
    }
    return (
        <Route path={props.path} exact render={(propsRoute) => {
            return <Layout style={{minHeight:'100vh'}}>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                >
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={props.location.pathname.slice(0,12)}>
                        <div className="logo pt-3 px-2">
                            <img style={{ borderRadius: '50%' }} width={50} height={50} src={userImgae} alt="..." />
                        </div>
                        <Menu.Item key='/admin/users' icon={<UserOutlined />}>
                            <NavLink to='/admin/users'>Quản lý ngưới dùng</NavLink>
                        </Menu.Item>
                        <Menu.Item key='/admin/films' icon={<FileOutlined />}>
                            <NavLink to='/admin/films'>Quản lý phim</NavLink>
                        </Menu.Item>
                        <Menu.Item key='/' icon={<HomeOutlined />}>
                            <NavLink to='/'>Quay lại trang home</NavLink>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Layout className="site-layout">
                <Header className="site-layout-sub-header-background " style={{ padding: 0 }} >
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <props.component {...propsRoute} />
                    </Content>
                </Layout>
            </Layout>
        }} />
    )
}
