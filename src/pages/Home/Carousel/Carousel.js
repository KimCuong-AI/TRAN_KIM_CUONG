import React from 'react';
import './carousel.css'
import ModalCarousel from './ModalCarousel';
const Carousel = () => {
    return (
        <div className='carousel-content'>
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                    <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                    <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                </ol>

                <div className="carousel-inner">
                    <div className="carousel-item active carousel-item-image" >
                        <img src="./img/ban-tay-diet-quy.jpg" className="d-block w-100 h-100" alt="bàn tay diệt quỷ" />
                        <div>
                            <ModalCarousel srcModal='https://www.youtube.com/embed/uqJ9u7GSaYM' />
                        </div>
                    </div>
                    <div className="carousel-item  carousel-item-image" >
                        <img src="./img/lat-mat.jpg" className="d-block w-100 h-100" alt="lật mặt" />
                        <div>
                            <ModalCarousel srcModal='https://www.youtube.com/embed/kBY2k3G6LsM' />
                        </div>
                    </div>
                    <div className="carousel-item  carousel-item-image" >
                        <img src="./img/mad-max.jpg" className="d-block w-100 h-100" alt="mad max" />
                        <div>
                            <ModalCarousel srcModal='https://www.youtube.com/embed/hEJnMQG9ev8' />
                        </div>
                    </div>
                </div>
                <a className="carousel-control-prev " href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
    );
}

export default Carousel;
