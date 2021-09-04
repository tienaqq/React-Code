import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Input, List, Space } from "antd";
import ModalCreator from "components/Creator/ModalCreator";
import Moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalInfo } from "redux/reducer/creator";
import TopicForm from "../TopicForm";

const { Search } = Input;

function TopicList() {
  const dispatch = useDispatch();
  const { topics } = useSelector((state) => state.creator);
  const [update, setUpdate] = useState(null);

  const showModal = (item) => {
    if (item) {
      setUpdate(item);
      dispatch(setModalInfo({ title: "Update Topic", isVisibleModal: true }));
    } else {
      dispatch(setModalInfo({ title: "Add Topic", isVisibleModal: true }));
    }
  };

  return (
    <>
      <ModalCreator>
        <TopicForm update={update} />
      </ModalCreator>
      <div className="app__third-child">
        <div className="tool__container">
          <div className="tool__left">
            <Button icon={<PlusOutlined />} onClick={() => showModal()}>
              Add Topic
            </Button>
          </div>
          <div className="tool__right">
            <Search placeholder="Input search text" enterButton allowClear />
          </div>
        </div>
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            pageSize: 10,
          }}
          dataSource={topics}
          footer={
            <div>
              <b>Total:</b> {topics?.length}
            </div>
          }
          renderItem={(item) => (
            <Card
              size="small"
              title={item?.topicName}
              extra={
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    type="text"
                    onClick={() => showModal(item)}
                  />
                  <Button icon={<DeleteOutlined />} type="text" />
                </Space>
              }
              className="app--mg20"
            >
              <Descriptions column={3}>
                <Descriptions.Item span={3}>
                  {item?.topicDescription}
                </Descriptions.Item>
                <Descriptions.Item label="Publish" span={2}>
                  {Moment(item?.createdDate).format("YYYY-MM-DD")}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          )}
        />
      </div>
    </>
  );
}
export default TopicList;
