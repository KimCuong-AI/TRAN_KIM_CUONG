import moment from 'moment';
import React, { useState } from 'react'
import StarRatings from 'react-star-ratings';
import './mobile.css'
import playvideo from '../../assets/img/playvideo.png'
export default function Mobile(props) {
    const { thongTinChiTiet } = props
    const [playButton, setPlayButton] = useState('none')
    const style = {
        bgImgStyle: {
            backgroundImage: `url(${thongTinChiTiet?.hinhAnh})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            position: 'relative',
        },
        bgGradientStyle: {
            background: 'linear-gradient(to top,#0a2029, rgba(48, 132, 163, 0.2))',
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,

        },
        iframStyle: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 20,
            display: playButton,
            width: '100%',
            height: '100%',
        },
        playImage: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer',
            transition: '0.2s',
            opacity: '0.8'
        },
        mobileItem:{
            padding: '10px 20px',
            backgroundColor:'#0a2029',
            boxShadow: ' -4px -16px 20px 10px #0a2029',
            width:'100%',
            margin: 'auto',
        }
    }
    return (
        <div className='film__info__moblie' style={style.bgImgStyle} >
            <div style={style.bgGradientStyle}>
                <div style={{ position: 'relative', paddingTop: '60%' }}>
                    <iframe src={thongTinChiTiet.trailer} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allow="fullscreen;" style={style.iframStyle}  ></iframe>
                    <img style={style.playImage} src={playvideo} alt='play video' onClick={() => {
                        setPlayButton('block')
                    }} width={60} height={60} alt='...' />
                </div>
                <div style={style.mobileItem}  >
                    <h6>Ngày khởi chiếu: {moment(thongTinChiTiet.ngayKhoiChieu).format("DD.MM.YYYY ")} </h6>
                    <h4 className='font-weight-bold'>{thongTinChiTiet.tenPhim}</h4>
                    <h6>120 phút- 2D/Digital </h6>
                    <div >
                        <StarRatings
                            rating={(thongTinChiTiet.danhGia)}
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="3px"
                            starRatedColor='orange'
                            name='rating-film'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
