
//api quản lý rạp

import { quanLyRapService } from "../../services/quanly";
import { HE_THONG_RAP, LICH_CHIEU } from "./types/RapType";

export const getApiLichChieu = (maHeThongRap) => {
    return async (dispatch) => {
        try {
            let result = await quanLyRapService.layLichChieu(maHeThongRap);
            // sau khi lấy dữ liệu từ api về=> đưa dữ liệu lên redux
            const action = {
                type:LICH_CHIEU,
                dataFilms: result.data,
            }
            dispatch(action)
        } catch (error) {
        }
    }
}

export const getApiHeThongRap = () => {
    return async (dispatch) => {
        try {
            let result = await quanLyRapService.layHeThongRap();
            // sau khi lấy dữ liệu từ api về=> đưa dữ liệu lên redux
            const action = {
                type: HE_THONG_RAP,
                dataFilms: result.data,
            }
            dispatch(action)
        } catch (error) {
        }
    }
}