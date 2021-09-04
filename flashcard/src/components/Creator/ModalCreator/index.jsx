import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalInfo } from "redux/reducer/creator";

function ModalCreator() {
  const dispatch = useDispatch();
  const { modalInfo } = useSelector((state) => state.creator);

  const showModal = () => {
    dispatch(setModalInfo({ title: "Add", isShow: true }));
  };

  const handleOk = () => {
    dispatch(setModalInfo({ title: "Add", isShow: false }));
  };

  const handleCancel = () => {
    dispatch(setModalInfo({ title: "Add", isShow: false }));
  };
  return (
    <Modal
      title={addInfo?.title}
      visible={addInfo?.isVisibleModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {props.children}
    </Modal>
  );
}
export default ModalCreator;
