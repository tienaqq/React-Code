import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, List, Space } from "antd";
import ModalCreator from "components/Creator/ModalCreator";
import IconText from "constants/IconText";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import renderHTML from "react-render-html";
import { useParams } from "react-router";
import { setModalInfo } from "redux/reducer/creator";
import FlashcardForm from "../FlashcardForm";
import showDeleteConfirm from "components/Creator/Remove";

const { Search } = Input;

function FlashcardList() {
  const dispatch = useDispatch();
  let { post } = useParams();
  const { flashcards } = useSelector((state) => state.creator);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(null);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    let el = [];
    el = flashcards?.filter((item) => item.lessionId === parseInt(post));
    setData(el);
    setFilter(el);
  }, [flashcards, post]);

  const onSearch = (value) => {
    if (!value) return setFilter(data);
    let result = [];
    result = data?.filter((item) => {
      return (
        item.flashcardName.toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    });
    return setFilter(result);
  };

  const showModal = (item) => {
    if (item) {
      dispatch(setModalInfo({ title: "Update Flashcard", isVisible: true }));
    } else {
      dispatch(setModalInfo({ title: "Add Flashcard", isVisible: true }));
    }
    setUpdate(item);
  };

  return (
    <>
      <ModalCreator>
        <FlashcardForm update={update} post={post} />
      </ModalCreator>
      <div className="app__third-child">
        <div className="tool__container">
          <div className="tool__left">
            <Button icon={<PlusOutlined />} onClick={() => showModal()}>
              Add Flashcard
            </Button>
          </div>
          <div className="tool__right">
            <Search
              placeholder="Input search text"
              onSearch={onSearch}
              enterButton
              allowClear
            />
          </div>
        </div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 10,
          }}
          dataSource={filter}
          footer={
            <div>
              <b>Total:</b> {data?.length}
            </div>
          }
          renderItem={(item) => (
            <Card
              size="small"
              hoverable
              title={item.flashcardName}
              className="app--mg20"
              extra={
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    type="text"
                    onClick={() => showModal(item)}
                  />
                  <Button
                    icon={<DeleteOutlined />}
                    type="text"
                    onClick={() =>
                      showDeleteConfirm(item.flashcardId, "flashcard")
                    }
                  />
                </Space>
              }
            >
              <div style={{ padding: "0 15px", margin: "0 0 15px 0" }}>
                {renderHTML(item ? item?.flashcardContent : "")}
              </div>
              <div>
                <IconText
                  icon={CalendarOutlined}
                  text={moment(item?.createdDate).format("YYYY-MM-DD")}
                  key="date"
                />
              </div>
            </Card>
          )}
        />
      </div>
    </>
  );
}
export default FlashcardList;
