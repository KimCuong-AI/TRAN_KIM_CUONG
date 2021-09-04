import swal from '@sweetalert/with-react'
import { quanLyDatVeService } from "../../services/quanly";
import { displayLoadingCheckoutAction,hideLoadingCheckoutAction } from "./LoadingActions";
import { CHUYEN_TAB, SET_CHI_TIET_PHONG_VE, XOA_DANH_SACH_GHE_DANG_DAT, QUAY_LAI_TAB } from './types/DatVeType';
export const chuyenTab = { type: CHUYEN_TAB }
export const quaylaitab = { type: QUAY_LAI_TAB }
//quản lý đặt vé
export const layChiTietPhongVeAction = (maLichChieu) => {
    return async dispatch => {
        dispatch(displayLoadingCheckoutAction);
        try {
            let result = await quanLyDatVeService.layChiTietPhongVe(maLichChieu);
            //Sau khi lấy dữ liệu phòng vé từ api về => dispatch lên redux
            dispatch({
                type: SET_CHI_TIET_PHONG_VE,
                chiTietPhongVe: result.data
            })
            await dispatch(hideLoadingCheckoutAction);
        }
        catch (error) {
            await dispatch(hideLoadingCheckoutAction);
        }
    }
}

export const datVeAction = (thongTinDatVe) => {
    return async dispatch => {
        dispatch(displayLoadingCheckoutAction);
        try {
            const result = await quanLyDatVeService.datVe(thongTinDatVe)
            //Gọi action xoá ghế
            await dispatch({
                type: XOA_DANH_SACH_GHE_DANG_DAT
            })
            //Sau khi đặt vé xong gọi lại action load lại phòng vé
            await dispatch(layChiTietPhongVeAction(thongTinDatVe.maLichChieu))
            await dispatch(hideLoadingCheckoutAction);
            await swal(
                <div>
                    <h5>{result.data}</h5>
                </div>
            )
            await dispatch(chuyenTab)
        } catch (error) {
            await dispatch(hideLoadingCheckoutAction);
            await swal(
                <div>
                    <h5>{error.response?.data}</h5>
                </div>
            )
        }
    }
}