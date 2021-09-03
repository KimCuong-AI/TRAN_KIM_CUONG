import React from 'react';
import './news.css'

const News = () => {
    return (
        <div className='container pt-4 news__film px-sm-0 px-3'>
            <h2 className='text-center'>Tin Tức</h2>
            <div className='row ' >
                <div className='col-12 col-md-6 news__image__item mb-4 m-sm-0 '>         
                    <img src='./img/phim-tay-ban-nha-hay-5.jpeg' alt='...' />
                    <br />
                    <a href='https://bazaarvietnam.vn/phim-tay-ban-nha-hay/' target='blank'>Top 10 bộ phim tây ban nha hay và ấn tượng bậc nhất</a>
                </div>
                <div className='col-12 col-md-6 news__image__item'  >
                    <img src='./img/vien-dan-bi-an.jpeg' alt='...' />
                    <br />
                    <a href='https://tix.vn/goc-dien-anh/7964-mortal-kombat-cuoc-chien-sinh-tu-goi-ten-nhung-phim-dien-anh-noi-tieng-duoc-chuyen-the-tu-cac-tua-game-dinh-dam' target='blank'>Morat compat: cuộc chiến sinh tử - gọi tên các phim điện ảnh được chuyển thể từ...</a>
                </div>
            </div>
            <div className='row my-4'>
                <div className='col-12 col-md-6 col-lg-4 news__image__item2' >
                    <img src='./img/top-phim-hay-nhat.jpg' alt='...' />
                    <br />
                    <div className='d-flex '>
                        <a href='https://pops.vn/blog/top-nhung-bo-phim-hay-nhat-moi-thoi-dai/' target='blank'>Top 26 những bộ phim kinh điển bất hủ đáng xem nhất mọi thời đại</a>
                    </div>
                </div>
                <div className='col-12 col-md-6 col-lg-4  news__image__item2'>
                    <img src='./img/bo-gia-1.png' alt='...' />
                    <br />
                    <div className='d-flex '>
                        <a href='https://tuoitre.vn/bo-gia-thu-gan-1-trieu-usd-va-kha-on-ao-tren-bao-my-20210610093419793.htm' target='blank'>'Bố già' thu gần 1 triệu USD và khá 'ồn ào' trên báo Mỹ</a>
                    </div>
                </div>
                <div className='col-md-12 col-lg-4 news__image__content ' >
                    <div className='row pb-3 news__image__item3 px-3'>
                        <div className='col-5 item__content'  >
                            <img src='./img/kingdom_series.jpeg' alt='...' />
                        </div>
                        <div className='col-7 d-flex align-items-center item__content'>
                            <a href='https://zingnews.vn/ashin-of-the-north-va-bi-mat-vuong-trieu-xac-song-post1242433.html' target='blank'>‘Ashin of the North’ và bí mật vương triều xác sống</a>
                        </div>
                    </div>
                    <div className='row pb-3 news__image__item3  px-3 '>
                        <div className='col-5 item__content ' >
                            <img src='./img/trieu-vy.jpg' alt='...' />
                        </div>
                        <div className='col-7 d-flex align-items-center item__content'>
                            <a href='https://zingnews.vn/nhan-sac-trieu-vy-va-dan-tieu-hoa-dan-tai-su-kien-thoi-trang-post1242625.html' target='blank'>Nhan sắc Triệu Vy và dàn tiểu hoa đán tại sự kiện thời trang</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default News;
