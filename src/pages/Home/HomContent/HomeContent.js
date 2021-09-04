import React from 'react';
import Carousel from '../Carousel/Carousel';
import CumRap from '../CumRap/CumRap';
import News from '../News/News';
import LoadingComponent from '../../../components/Loading/LoadingPage';
import ShowTimeFilm from './../ShowTimeFilm/ShowTimeFilm';
import MovieApp from '../MovieApp/MovieApp';
const HomeContent = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            <LoadingComponent />
            <div>
                <Carousel />
            </div>
            <div id='showTimeFilm'>
                <ShowTimeFilm />
            </div>
            <div id='cumRap'>
                <CumRap />
            </div>
            <div id='news' className='py-3'>
                <News />
            </div>
            <div id='movieApp'>
                <MovieApp />
            </div>
        </div>
    );
}
export default HomeContent;

