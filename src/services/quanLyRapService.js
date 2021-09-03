import { GROUPID } from "../util/setting";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
    constructor() {
        super();
    }
    layLichChieu = (maHeThongRap) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${maHeThongRap}&maNhom=${GROUPID}`)
    }
    layHeThongRap = () => {
        return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`)
    }
    layThongTinCumRapTheoHeThong=(maHeThongRap)=>{
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
    }
}
