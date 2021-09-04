import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, Input, List, Space } from "antd";
import Moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const { Search } = Input;

function TopicList() {
  const { topics } = useSelector((state) => state.creator);

  console.log(topics);

  return (
    <div className="app__third-child">
      <div className="tool__container">
        <div className="tool__left">
          <Button icon={<PlusOutlined />}>Add Topic</Button>
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
                <Button icon={<EditOutlined />} type="text" />
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
  );
}
export default TopicList;
