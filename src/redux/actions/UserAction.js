import { history } from "../../App";
import { ACCESSTOKEN, USER_LOGIN } from "../../util/setting";
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import swal from '@sweetalert/with-react'
import { quanLyNguoiDungService } from "../../services/quanly";
import { DANG_NHAP, LAY_NGUOI_DUNG, THONG_TIN_TAI_KHOAN } from "./types/UserType";

export const dangKyAction = (thongTinNguoiDung) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinNguoiDung)
            await swal(
                <div>
                    <h5>Bạn đã đăng ký tài khoản thành công</h5>
                </div>
            )
            history.push('/login');
        }
        catch (error) {
            await swal(
                <div>
                    <h5>{error.response?.data}</h5>
                </div>
            )
        }
    }
}
export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap)
            dispatch({
                type: DANG_NHAP,
                userLogin: result.data,
            })
            localStorage.setItem(USER_LOGIN, JSON.stringify(result.data));
            localStorage.setItem(ACCESSTOKEN, result.data.accessToken);
            history.push('/')
        }
        catch (error) {
            swal(
                <div>
                    <h5>{error.response?.data}</h5>
                </div>
            )
        }
    }
}



//lấy thông tin tài khoản người dùng
export const layThongTinTaiKhoanAction = (thongTinTK) => {
    return async (dispatch) => {
        dispatch(displayLoadingAction);
        try {
            const result = await quanLyNguoiDungService.layThongTinTaiKhoan({ taiKhoan: thongTinTK })
            // đưa lên reducer  
            await dispatch({
                type: THONG_TIN_TAI_KHOAN,
                taiKhoan: result.data,
            })
            await dispatch(hideLoadingAction);
        }
        catch (error) {
            await dispatch(hideLoadingAction);
            swal(
                <div>
                    <h5>{error.response?.data}</h5>
                </div>
            )
        }
    }
}

//cập nhật thông tin tài khoản người  dùng
export const updateTaiKhoan = (thongTin) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatTaiKhoan(thongTin)
            await swal(
                <div>
                    <h5>Cập nhật tài khoản thành công!</h5>
                </div>
            )
            dispatch(layDanhSachNguoiDungAction())
        }
        catch (error) {
            swal(
                <div>
                    <h5>{error.response?.data}</h5>
                </div>
            )
        }
    }
}

//admin lấy danh sách người dùng
export const layDanhSachNguoiDungAction = () => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung()
            dispatch({
                type: LAY_NGUOI_DUNG,
                dsnguoiDung: result.data
            })
        }
        catch (error) {
        }
    }
}

//admin xóa người dùng
export const xoaNguoiDungAction = (thongTinNguoDung) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(thongTinNguoDung)
            await swal(
                <div>
                    <h5>{result.data}</h5>
                </div>
            )
            dispatch(layDanhSachNguoiDungAction())

        }
        catch (error) {
            await swal(
                <div>
                    <h5>{error.response?.data}</h5>
                </div>
            )
        }
    }
}
