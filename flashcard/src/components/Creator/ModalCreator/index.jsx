import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router";
import { setModalInfo } from "redux/reducer/creator";

function ModalCreator(props) {
  const { path } = useRouteMatch();
  const dispatch = useDispatch();
  const { modalInfo } = useSelector((state) => state.creator);

  const showModal = () => {
    dispatch(setModalInfo({ title: "Add", isVisibleModal: true }));
  };

  const handleCancel = () => {
    dispatch(setModalInfo({ title: "Add", isVisibleModal: false }));
  };
  return (
    <Modal
      title={modalInfo?.title}
      visible={modalInfo?.isVisibleModal}
      onCancel={handleCancel}
      footer={false}
      width={
        path === "/creator/lesson" || path === "/creator/flashcard" ? 830 : 700
      }
    >
      {props.children}
    </Modal>
  );
}
export default ModalCreator;
