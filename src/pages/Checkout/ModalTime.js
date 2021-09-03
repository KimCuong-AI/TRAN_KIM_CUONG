import React, { useState } from 'react';
import {Modal } from 'antd';
import { history } from '../../App';
import postNotificattion from '../../assets/img/Post-notification.png'
import './modalCheckout.css'

const ModalTime = () => {
    const [isModalVisible, setIsModalVisible] = useState(true);
    const handleOk = () => {
        setIsModalVisible(false);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        window.location.href = window.location.href;
    };

    const handleReload = () => {
        window.location.href = window.location.href;
    };
    return (
        <div className='text-center container modal-datve'  >
            <Modal visible={isModalVisible} width={380}  onOk={handleOk} onCancel={handleCancel} className='text-center text-danger modalantd' centered maskClosable={false} footer={null} wrapClassName=' modal-datve'>
                <div className='rounded-circle'>
                    <img src={postNotificattion} width='80' height='50' alt='postNotificattion' />
                    <h4 className='pb-5'>Đã hết thời gian giữ ghế 😊</h4>
                    <span className='m-3 h6' onClick={handleReload} >Đặt lại</span>
                    <span className='m-3 h6' onClick={() => {
                        history.push("/")
                    }}>Quay lại trang chủ</span>
                </div>
            </Modal>
        </div>
    );
}

export default ModalTime;
