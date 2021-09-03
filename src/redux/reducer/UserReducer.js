import { USER_LOGIN } from "../../util/setting";
import { DANG_NHAP, LAY_NGUOI_DUNG, THONG_TIN_TAI_KHOAN } from "../actions/types/UserType";
let usLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}
const stateDefault = {
    userLogin: usLogin,
    thongTin:{},
    danhSachNguoiDung:[]

}
export const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP: {
            state.userLogin = action.userLogin;
            return { ...state }
        }
        case THONG_TIN_TAI_KHOAN:{
            state.thongTin=action.taiKhoan;
            return {...state}
        }
        case LAY_NGUOI_DUNG:{
            state.danhSachNguoiDung=action.dsnguoiDung
            return {...state}
        }
        default: return state 
    } 
}
