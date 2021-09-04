import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilmDetailAction } from '../../redux/actions/FilmActions';
import './Detail.css'
import StarRatings from 'react-star-ratings';
import { Link, animateScroll as scroll } from "react-scroll";
import { Progress } from 'antd';
import { useMediaQuery } from 'react-responsive'
import LoadingComponent from '../../components/Loading/LoadingPage';
import Mobile from './Mobile';
import ShowTimesDetail from './ShowTimesDetail';
const Detail = (props) => {
    const dispatch = useDispatch();
    const { thongTinChiTiet } = useSelector(state => state.FilmReducer)
    useEffect(() => {
        const action = getFilmDetailAction(props.match.params.postId);
        dispatch(action)

    }, [])
    const style = {
        styleBackground: {
            backgroundImage: `url(${thongTinChiTiet.hinhAnh})`,
            height: "600px",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: "blur(10px)",
            position: 'relative',
            width: '100%',
            transform: 'scale(1.05)'
        },
        styleGradient: {
            position: 'absolute',
            background: 'linear-gradient(to top,#0a2029,transparent)',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
        }

    }
    const isBigScreen = useMediaQuery({ query: '(min-width: 767.5px)' })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 767.5px)' })
    return (
        <div className='detail__content' style={{ position: 'relative' }} >
        
            <LoadingComponent />
            {isBigScreen &&
                <div >
                    <div style={style.styleBackground}>
                        <div style={style.styleGradient}>
                        </div>
                    </div>
                    <div className='film__info'  >
                        <div className='film__info__content '>
                            <div className='row pt-3 w-100'>
                                <div className='info__item__left  col-8 d-flex  align-items-center ' >
                                    <img src={thongTinChiTiet.hinhAnh} width={250} height={350} alt={thongTinChiTiet.tenPhim} />
                                    <div className='m-2' >
                                        <h6>Ngày khởi chiếu: {moment(thongTinChiTiet.ngayKhoiChieu).format("DD.MM.YYYY ")} </h6>
                                        <h4 className='font-weight-bold'>{thongTinChiTiet.tenPhim}</h4>
                                        <h6>120 phút- 2D/Digital </h6>
                                        <div className='rating-film'>
                                            <StarRatings
                                                rating={(thongTinChiTiet.danhGia)}
                                                numberOfStars={5}
                                                starDimension="20px"
                                                starSpacing="3px"
                                                starRatedColor='orange'
                                                name='rating-film'
                                            />
                                        </div>
                                        <Link to="showtimeId" smooth={true} offset={-60} duration={400} className='h5 booking__info mt-4 '>MUA VÉ</Link>
                                    </div>
                                </div>
                                <div className='info__item__right  col-4 d-flex align-items-center justify-content-center pt-sm-0 pt-2'>
                                    <div className='text-center  '>
                                        <div >
                                            <div>
                                                <Progress type="circle" percent={100} format={() => '100%'} width={160} />
                                            </div>
                                            <StarRatings
                                                rating={(thongTinChiTiet?.danhGia)}
                                                numberOfStars={5}
                                                starDimension="30px"
                                                starSpacing="3px"
                                                starRatedColor='orange'
                                                name='rating-film'
                                            />
                                            <h5 className='text-center m-1 font-weight-bold ' style={{ color: '#e6f7ff' }}>{thongTinChiTiet.danhGia} người đánh giá </h5>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                </div>
            }
            {isTabletOrMobile &&
                <Mobile thongTinChiTiet={thongTinChiTiet} />
            }
            <div id='showtimeId' >
                <ShowTimesDetail thongTinChiTiet={thongTinChiTiet} />
            </div>
        </div>
    );
}

export default Detail;
