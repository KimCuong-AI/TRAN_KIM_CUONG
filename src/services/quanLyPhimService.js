import { GROUPID } from "../util/setting";
import { baseService } from "./baseService";

export class QuanLyPhimService extends baseService {
    constructor() {
        super();
    }
    layDanhSachPhim = (tenPhim = '') => {
        if (tenPhim != '') {
            return this.get(`/api/quanlyphim/laydanhsachphim?maNhom=${GROUPID}&tenPhim=${tenPhim}`)
        }
        return this.get(`/api/quanlyphim/laydanhsachphim?maNhom=${GROUPID}`)
    }
    layChiTietPhim = (maPhim) => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
    }
    themPhimUpLoadHinh=(formData)=>{
        return this.post(`/api/QuanLyPhim/ThemPhimUploadHinh`,formData)
    }
    capNhatPhimUpLoad=(formData)=>{
        return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`,formData)
    }
    layThongTinPhim=(maPhim)=>{
        return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
    }
    xoaPhim=(maPhim)=>{
        return this.delete(`/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
    }
    taoLichChieu=(lichChieu)=>{
        return this.post(`/api/QuanLyDatVe/TaoLichChieu`,lichChieu)
    }
}