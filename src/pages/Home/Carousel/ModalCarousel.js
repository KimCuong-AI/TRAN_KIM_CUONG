import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './modalCarousel.css'
const ModalCarousel = (props) => {

    const [lgShow, setLgShow] = useState(false);
    const handleClose = () => setLgShow(false);
    const handleShow = () => setLgShow(true);

    return (
        <div className='carousel-modal' >
            <h3 className='button-carousel-video' variant="primary" onClick={handleShow}>
                <i className="fa fa-play-circle"></i>
            </h3>

            <Modal className='modal__carousel' size="lg" show={lgShow} onHide={handleClose} animation={false} aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton >
                </Modal.Header>
                <Modal.Body style={{ padding: '0px', border: 'none' }} >
                    <div style={{position:'relative',paddingTop:'60%'}}>
                        <iframe width="100%" frameBorder='0' id='ytplayer' allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allow="fullscreen;"
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

export default ModalCarousel;
