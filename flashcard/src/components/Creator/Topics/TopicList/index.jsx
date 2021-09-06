import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Input, List, Space } from "antd";
import ModalCreator from "components/Creator/ModalCreator";
import Moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalInfo } from "redux/reducer/creator";
import TopicForm from "../TopicForm";
import showDeleteConfirm from "components/Creator/Remove";

const { Search } = Input;

function TopicList() {
  const dispatch = useDispatch();
  const { topics } = useSelector((state) => state.creator);
  const [update, setUpdate] = useState(null);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(topics);
  }, [topics]);

  const onSearch = (value) => {
    if (!value) return setData(topics);
    let result = [];
    result = topics.filter((item) => {
      return item.topicName.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    return setData(result);
  };

  const showModal = (item) => {
    if (item) {
      setUpdate(item);
      dispatch(setModalInfo({ title: "Update Topic", isVisible: true }));
    } else {
      dispatch(setModalInfo({ title: "Add Topic", isVisible: true }));
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
          dataSource={data}
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
                  <Button
                    icon={<DeleteOutlined />}
                    type="text"
                    onClick={() => showDeleteConfirm(item.topicId, "topic")}
                  />
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
