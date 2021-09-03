import { GROUPID } from "../util/setting";
import { baseService } from "./baseService";
import ThemNguoiDung from './../pages/AdminPage/QuanLyNguoiDung/ThemNguoiDung/ThemNguoiDung';
export  class QuanLyNguoiDungService extends baseService {
    constructor() {
        super();
    }
    dangKy=(thongTinDangKy)=>{
        return this.post (`/api/QuanLyNguoiDung/DangKy`,thongTinDangKy)
    }
    dangNhap=(thongTinDangNhap)=>{
        return this.post(`/api/QuanLyNguoiDung/DangNhap`,thongTinDangNhap)
    }
    layDanhSachNguoiDung = () => {
        return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`)
    }
    xoaNguoiDung=(taiKhoan)=>{
        return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
    }
    capNhatTaiKhoan=(thongTin)=>{
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,thongTin)
    }
    layThongTinTaiKhoan=(thongTin)=>{
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`,thongTin)
    }
    timKiemNguoiDung=(tenNguoiDung)=>{
        return this.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tenNguoiDung}`)
    }
    themNguoiDung=(thongTinND)=>{
        return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`,thongTinND)
    }
    capNhatThongTinNguoiDung=(thongTin)=>{
        return this.put(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,thongTin)
    } 
}   
