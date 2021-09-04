import moment from "moment";
import React from "react";
import { Link, NavLink } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import StarRatings from "react-star-ratings/build/star-ratings";
import { quanLyPhimService } from "../../services/quanly.js";
import ModalSearch from "./ModalSearch.js";
import './searchFilm.css'
export default class SearchFilm extends React.Component {
    state = {
        isLoading: true,
        searchText: "",
        searchResults: []
    };
    handleSearch = async () => {
        let tenPhim = this.props.location.state?.searchText;
        try {
            const result = await quanLyPhimService.layDanhSachPhim(tenPhim)
            this.setState({
                isLoading: false,
                searchText: tenPhim,
                searchResults: result.data
            })
        }
        catch (error) {
            console.log(error.response?.data)

        }
    };

    componentDidMount() {
        this.handleSearch();
    }
    componentDidUpdate(prevProps) {
        let prevSearch = prevProps.location.state?.searchText;
        let newSearch = this.props.location.state?.searchText;
        if (prevSearch !== newSearch) {
            this.handleSearch();
        }
    }
    render() {
        let toRender = this.state.isLoading ? (
            <h1>Loading...</h1>
        ) : (
            <div style={{ minHeight: '400px' }}>
                {this.state.searchResults?.length > 0 ? (
                    <div className='search'>
                        <h3 className='text-danger'>Kết quả tìm kiếm phim có tên "{this.state.searchText}" </h3>
                        <div className='row w-100 m-auto'>
                            {this.state.searchResults.map((film, index) => {
                                return <div className='search__content col-6 col-md-4 col-lg-3 p-1 ' key={index}>
                                    <div className=" text-dark  m-2 search__item ">
                                        <div className='position-relative'>
                                            <img className="card-img-top" src={film.hinhAnh} alt={film.tenPhim} />
                                            <div className='film__overlay'>
                                            </div>
                                            <div className='play-video-search'>
                                                <ModalSearch srcModal={film.trailer} />
                                            </div>
                                        </div>
                                        <div className='star-rating'>
                                            <h5 className='text-center m-0 text-danger font-weight-bold '>{film.danhGia}</h5>
                                            <StarRatings
                                                rating={film.danhGia / 2}
                                                numberOfStars={5}
                                                starDimension="12px"
                                                starSpacing="1px"
                                                starRatedColor='orange'
                                                name='rating-lich-chieu'
                                            />
                                        </div>
                                        <div className='film__content' style={{ height: "100px" }}>
                                            <div className=" film__item " >
                                                <h6 style={{  textTransform: 'capitalize' }} >{film.tenPhim}</h6>
                                                <h6 style={{ fontSize: '14px', color: '#d32f2f' }} >Khởi chiếu:<span > {moment(film.ngayKhoiChieu).format("DD.MM.YYYY ")} </span></h6>
                                            </div>
                                            <div className='text-center booking-ticket '>
                                                <NavLink className='text-white h4 font-weight-bold' to={`/detail/${film.maPhim}`} >MUA VÉ</NavLink>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                )
                    :
                    (
                        <h3 className='text-danger'>Không tìm thấy phim, bạn hãy thử tìm kiếm khác nhé 😊</h3>
                    )}
            </div>
        );
        return <div className='container' style={{ padding: "50px 0px" }}>{toRender}</div>;
    }
}
