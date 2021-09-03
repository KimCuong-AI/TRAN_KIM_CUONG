import { CHUYEN_TAB, DAT_GHE, QUAY_LAI_TAB, SET_CHI_TIET_PHONG_VE, XOA_DANH_SACH_GHE_DANG_DAT } from "../actions/types/DatVeType";
const stateCheckout = {
    activeCheckoutTab: 'chonGhe',
    chiTietPhongVe: {},
    danhSachGheDangDat: [],
}
export const QuanLyDatVeReducer = (state = stateCheckout, action) => {
    switch (action.type) {
        case SET_CHI_TIET_PHONG_VE: {
            state.chiTietPhongVe = action.chiTietPhongVe;
            return { ...state }
        }
        case DAT_GHE: {
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];

            let index = danhSachGheCapNhat.findIndex(gheDD => gheDD.maGhe === action.ghe.maGhe);
            if (index !== -1) {
                danhSachGheCapNhat.splice(index, 1);
            } else {
                danhSachGheCapNhat.push(action.ghe);
            }
            state.danhSachGheDangDat = danhSachGheCapNhat;
            return { ...state }
        }
        case XOA_DANH_SACH_GHE_DANG_DAT: {
            state.danhSachGheDangDat = [];
            return { ...state }
        }
        case CHUYEN_TAB: {
            state.activeCheckoutTab = 'ketQua';
            return { ...state }

        }
        case QUAY_LAI_TAB: {
            state.activeCheckoutTab = 'chonGhe';
            return { ...state }
        }
        default:
            return state
    }
}
