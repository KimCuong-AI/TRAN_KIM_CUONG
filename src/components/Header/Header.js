import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./Header.css";
import { useSelector } from "react-redux";
import { history } from "../../App";
import { USER_LOGIN } from "../../util/setting";
import { NavHashLink } from 'react-router-hash-link';
import swal from '@sweetalert/with-react'
import logo_cybersoft from '../../assets/img/logo_cybersoft.png'
import userImage from '../../assets/img/userImage.jpg'
const Header = () => {
    let [state, setState] = useState({ searchText: '' })
    const { userLogin } = useSelector(state => state.UserReducer);
    const handleSearchInput = (event) => {
        setState({
            searchText: event.target.value,
        });
    };
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (state.searchText.trim() !== '') {
            let text = state.searchText;
            history.push({
                pathname: `/searchfilm/${text}`,
                state: { searchText: text },
            });
        } else {
            swal(
                <div> 
                    <h5>Bạn chưa nhập tên phim</h5>
                </div>
            )
        }
    }
    return (
        <div className="header__content" > 
            <div className="navbar navbar-expand-lg navbar-light ">
                <NavLink className="navbar-brand" to='/'>
                    <img src={logo_cybersoft} width={100} alt='logo cybersoft' />
                </NavLink>
                <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse navbar-center" id="collapsibleNavId" >
                    <ul className="navbar-nav mx-auto mt-2 mt-lg-0 navbar-control">
                        <li className="nav-item ">
                            <NavHashLink smooth className="nav-link" to="/#showTimeFilm"> Lịch chiếu </NavHashLink>
                        </li>
                        <li className="nav-item">
                            <NavHashLink smooth className="nav-link" to="/#cumRap" >  Cụm Rạp</NavHashLink>
                        </li>
                        <li className="nav-item">
                            <NavHashLink smooth className="nav-link" to="/#news" >Tin tức</NavHashLink>
                        </li>
                        <li className="nav-item">
                            <NavHashLink smooth className="nav-link" to="/#movieApp" >Ứng dụng</NavHashLink>
                        </li>
                        <li className="nav-item">{(localStorage.getItem(USER_LOGIN) && userLogin.maLoaiNguoiDung === 'QuanTri') ?
                            <NavLink className="nav-link" to="/admin" > Quản trị</NavLink> : '' }
                        </li>
                    </ul>
                    {!localStorage.getItem(USER_LOGIN) ?
                        <ul className="navbar-nav mt-lg-0 authentication">
                            <li className="nav-item active">
                                <NavLink className="nav-link d-flex align-items-center" to="/login">
                                    <i className="fa fa-user-circle"></i>
                                    <span> Đăng nhập </span>
                                </NavLink>
                            </li>
                            <li className="nav-item active" style={{ marginTop: '2px' }}>
                                <NavLink className="nav-link " to="/register">
                                    <span > Đăng ký </span>
                                </NavLink>
                            </li> 
                        </ul> :
                        <ul className='navbar-nav'>
                            <li className="nav-item dropdown " >
                                <a className="nav-link text-lg-center" style={{ padding: '0px' }} href="#" id="dropdownId" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src={userImage} alt='girlxinh' className='user__image' /> {userLogin.taiKhoan}</a>
                                <div className="dropdown-menu " aria-labelledby="dropdownId">
                                    <NavLink className="dropdown-item m-0" to="/profile">Thông tin tài khoản</NavLink>
                                    <a className="dropdown-item m-0" onClick={() => {
                                        localStorage.clear();
                                        history.push('/');
                                    }}>
                                        Đăng xuất
                                    </a>
                                </div>
                            </li>
                        </ul>}
                    <form onSubmit={handleFormSubmit} className="form-inline my-2 my-lg-0 form__submit ">
                        <input value={state.searchText} onChange={handleSearchInput} className="form-control mr-sm-2 w-100" type="text" placeholder="Tìm kiếm phim" />
                        <button className="my-sm-0" type="submit"><i className="fa fa-search"></i></button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default withRouter(Header); 