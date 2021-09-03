import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './modalSearch.css'

const ModalSearch = (props) => {

    const [lgShow, setLgShow] = useState(false);
    const handleClose = () => setLgShow(false);
    const handleShow = () => setLgShow(true);

    return (
        <div className='text-center'>
            <h3  className='button-modal-search m-0 text-center' variant="primary" onClick={handleShow}>
                <i className="fa fa-play-circle"></i>
            </h3>

            <Modal className='modal-search' size="lg" show={lgShow} onHide={handleClose} animation={false} aria-labelledby="contained-modal-title-vcenter"
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
export default ModalSearch;
