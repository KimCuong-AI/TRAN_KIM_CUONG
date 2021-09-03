import React from 'react';
import './movieApp.css'

const MovieApp = () => {
    const style = {
        styleMobile: {
            background: `url('./img/backapp.jpg')`, color: 'white', minHeight: '600px', maxWidth: '100%',
            backgroundAttachment: 'fixed'
        }
    }
    return (
        <div className='app__mobile d-flex align-items-center justify-content-between py-3' style={style.styleMobile}>
            <div className='app__mobile__content '>
                <div className=' row ' >
                    <div className='col-12 col-sm-6 px-5 d-flex align-items-center app__mobile__text '>
                            <div>
                                <h3 className='text-white mb-4'>Ứng dụng dành cho người yêu điện ảnh</h3>
                                <h6 className='my-4 text-white'>Không chỉ đặt vé, bạn còn có thể bình luận phim,chấm điểm rạp và đổi quà hấp dẫn.</h6>
                                <button className='app__download'>App miễn phí-Tải về ngay!</button>
                            </div>
                    </div>
                    <div className='col-12 col-sm-6 d-flex align-items-center  '>
                        <div className='text-center  '>
                            <img src='./img/phone_image.png'  className='img__phone' alt='phone' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieApp;
