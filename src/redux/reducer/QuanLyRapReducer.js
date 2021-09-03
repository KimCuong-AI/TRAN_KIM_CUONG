import { HE_THONG_RAP, LICH_CHIEU } from "../actions/types/RapType"
const stateDefault = {
    arrHeThongRap: [],
    arrLichChieu: [],

}
export const QuanLyRapReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case HE_THONG_RAP: {
            state.arrHeThongRap = action.dataFilms
            return { ...state }
        }
        case LICH_CHIEU: {
            state.arrLichChieu = action.dataFilms
            return { ...state }
        }
        default:
            return state
    }
}
