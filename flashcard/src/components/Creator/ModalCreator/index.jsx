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
    dispatch(setModalInfo({ title: "Add", isVisible: true }));
  };

  const handleCancel = () => {
    dispatch(setModalInfo({ title: "Add", isVisible: false }));
  };
  const size = (path) => {
    switch (path) {
      case "/creator/lesson/:post":
        return 1000;
      case "/creator/flashcard/:post":
        return 1000;
      default:
        return 800;
    }
  };
  return (
    <Modal
      title={modalInfo?.title}
      visible={modalInfo?.isVisible}
      onCancel={handleCancel}
      footer={false}
      width={size(path)}
    >
      {props.children}
    </Modal>
  );
}
export default ModalCreator;
