import React, {useState } from "react";
import ModalTime from "./ModalTime";
import { Statistic } from 'antd';
const Reservation = () => {
  const [modalDatVe, stateModalDatVe] = useState(false);
  const { Countdown } = Statistic;
  const deadline = Date.now() + 1000 * 60 * 5
  function onFinish() {
    stateModalDatVe(true);
  }
  return (
    <div >
      {modalDatVe ? <ModalTime /> : ""}
      <section className=" font-weight-bold">
        <Countdown title="Thời gian giữ ghế" value={deadline} onFinish={onFinish} />
      </section>
    </div>
  );
};
export default Reservation;
