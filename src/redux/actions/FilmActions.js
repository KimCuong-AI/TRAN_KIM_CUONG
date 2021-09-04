import { quanLyPhimService } from "../../services/quanly"
import { displayLoadingAction, hideLoadingAction } from "./LoadingActions";
import { SET_FILM, SET_FILM_DETAIL, SET_THONG_TIN_PHIM } from "./types/FilmType";
import swal from '@sweetalert/with-react'
export const getApiFilmAction = (tenPhim = '') => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.layDanhSachPhim(tenPhim);
            const action = {
                type: SET_FILM,
                dataFilms: result.data,
            }
            dispatch(action)

        } catch (error) {
        }
    }
}

export const getFilmDetailAction = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await quanLyPhimService.layChiTietPhim(maPhim)
            dispatch({
                type: SET_FILM_DETAIL,
                thongTinChiTiet: result.data
            })
        }
        catch (errors) {
        }
    }
}


//******** quản lý phim phần admin ************//
export const themPhimUpLoadHinhAction = (formData) => {
    return async dispatch => {
        try {
            const result = await quanLyPhimService.themPhimUpLoadHinh(formData)
            await swal(
                <div>
                    <h5>Thêm phim thành công!</h5>
                </div>
            )
            dispatch(getApiFilmAction())
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
export const layThongTinPhimAction = (maPhim) => {
    return async (dispatch) => {
        dispatch(displayLoadingAction)
        try {
            let result = await quanLyPhimService.layThongTinPhim(maPhim)
            await dispatch({
                type: SET_THONG_TIN_PHIM,
                thongTinPhim: result.data,
            })
            dispatch(hideLoadingAction)
        }
        catch (error) {
            dispatch(hideLoadingAction)
        } 
    }
}
//admin cập nhật phim
export const capNhatPhimUploadAction = (formData) => {
    return async dispatch => {
        try {
            const result = await quanLyPhimService.capNhatPhimUpLoad(formData)
            await swal(
                <div>
                    <h5>Cập nhật phim thành công!</h5>
                </div>
            )
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
//xóa phim admin
export const xoaPhim = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhim(maPhim)
            await swal(
                <div>
                    <h5>{result.data}</h5>
                </div>
            )
            dispatch(getApiFilmAction())
        }
        catch (error) {
            await swal(
                <div>
                    {error.response?.data !== undefined ? <h5>{error.response?.data}</h5> : <h5>Xóa chưa thành công!</h5>}
                </div>
            )
        }
    }
}


//lấy thông tin hệ thống rạp tạo lịch chiếu
export const taoLichChieuAction = (lichChieu) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.taoLichChieu(lichChieu)
            await swal(
                <div>
                    <h5>{result.data}</h5>
                </div>
            )
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

