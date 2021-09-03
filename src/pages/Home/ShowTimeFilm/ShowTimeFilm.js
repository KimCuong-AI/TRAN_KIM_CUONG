import React, { Component } from "react";
import Slider from "react-slick";
import './showTime.css'
import { connect } from "react-redux";
import { getApiFilmAction } from "../../../redux/actions/FilmActions";
import { NavLink } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import moment from "moment";
import ModalShowTimes from "./ModalShowtimes.js";
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
    responsive: [
        {
            breakpoint: 991,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3, 
                infinite: true,
                dots: false,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: false,
            }
        },
        {
            breakpoint: 575,
            settings: {
                rows: 1,
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
            }
        },
        {
            breakpoint: 430,
            settings: {
                rows: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
            }
        },

    ]
};
class ShowTimeFilm extends Component {
    render() {
        return (
            <div className=' show-time-film'>
                <h3 className="text-center">Lịch chiếu phim</h3>
                <Slider {...settings}  >
                    {this.props.arrFilm.map((film, index) => {
                        return <div className='slider__content ' key={index}>
                            <div className=" slider__item  ">
                                <div className='position-relative' >
                                    <img className="card-img-top " src={film.hinhAnh} alt={film.tenPhim} />
                                    <div className='film__overlay'>
                                    </div>
                                    <div className='play-video-film text-center'>
                                        <ModalShowTimes srcModal={film.trailer} />
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
                                        <h6 style={{ textTransform:'capitalize' }}  >{film.tenPhim}</h6>
                                        <h6 style={{ fontSize: '14px', color: '#d32f2f' }}  >Khởi chiếu:<span > {moment(film.ngayKhoiChieu).format("DD.MM.YYYY ")} </span></h6>
                                    </div>
                                    <div className='text-center booking-ticket '>
                                        <NavLink className='text-white font-weight-bold h4' to={`/detail/${film.maPhim}`} >MUA VÉ</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    })}
                </Slider>
            </div>
        );
    }
    async componentDidMount() {

        const action = getApiFilmAction();
        this.props.dispatch(action)
    }
}
const mapStateToProps = (state) => ({
    arrFilm: state.FilmReducer.arrFilm

})
export default connect(mapStateToProps)(ShowTimeFilm)
