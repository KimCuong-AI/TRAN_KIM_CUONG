import { SET_FILM, SET_FILM_DETAIL, SET_THONG_TIN_PHIM } from "../actions/types/FilmType"

const stateDefault = {
    arrFilm: [],
    thongTinChiTiet: [],
    //admin film cập nhật
    thongTinPhim:{},
}
export const FilmReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_FILM: {
            state.arrFilm = action.dataFilms
            return { ...state }
        }
        case SET_FILM_DETAIL: {
            state.thongTinChiTiet = action.thongTinChiTiet
            return { ...state }
        }
        //trang admin lấy thông tin phim chi tiết dể update
        case SET_THONG_TIN_PHIM:{
            state.thongTinPhim=action.thongTinPhim;
            return {...state}
        }
        default: return state
    }
}
