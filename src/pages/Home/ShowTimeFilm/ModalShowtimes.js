import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './modalShowtimes.css'

const ModalShowTimes = (props) => {

    const [lgShow, setLgShow] = useState(false);
    const handleClose = () => setLgShow(false);
    const handleShow = () => setLgShow(true);

    return (
        <div className='text-center'>
            <h3  className=' m-0 text-center button-showtime-film' variant="primary" onClick={handleShow}>
                <i className="fa fa-play-circle"></i>
            </h3>
            <Modal className='modal-showtime-film' size="lg" show={lgShow} onHide={handleClose} animation={false} aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton >
                </Modal.Header>
                <Modal.Body style={{ padding: '0px', border: 'none' }} >
                    <div style={{position:'relative',paddingTop:'60%'}}>
                        <iframe width="100%" height="450px" frameBorder='0' id='ytplayer' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allow="fullscreen;"
                            src={props.srcModal}>
                        </iframe>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ display: 'none' }}>

                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ModalShowTimes;
