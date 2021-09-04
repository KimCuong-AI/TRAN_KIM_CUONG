import React from "react";
import { history } from "../../App";
import './index.css'
const RouteNotFound = () => {
  return (
    <div className='container pt-3'>
      <div >
        <section className="page_404">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 text-center ">
                <div className="col-sm-10 col-sm-offset-1 m-auto text-center">
                  <div className="four_zero_four_bg">
                    <h1 className="text-center ">404</h1>
                  </div>
                  <div className="contant_box_404">
                    <h3 className="h2">
                      Có vẻ bạn đang bị lạc 😊
                    </h3>
                    <h5>Trang bạn đang tìm không tồn tại!</h5>
                    <span onClick={() => {
                      history.push('/')
                    }} className="link_404 h4" style={{ cursor: 'pointer' }}>Quay lại trang chủ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
export default RouteNotFound;
