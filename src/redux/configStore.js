import { combineReducers } from "redux";
import { FilmReducer } from "./reducer/FilmReducer";
import { LoadingReducer } from "./reducer/LoadingReducer";
import { QuanLyDatVeReducer} from "./reducer/QuanLyDatVeReducer";
import { QuanLyRapReducer } from "./reducer/QuanLyRapReducer";
import { UserReducer } from "./reducer/UserReducer";
export const rootReducer=combineReducers({
    FilmReducer:FilmReducer,
    UserReducer:UserReducer,
    LoadingReducer:LoadingReducer,
    QuanLyDatVeReducer:QuanLyDatVeReducer,
    QuanLyRapReducer:QuanLyRapReducer,
})