import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, List, Space } from "antd";
import IconText from "constants/IconText";
import Moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

function TopicList() {
  const { topics } = useSelector((state) => state.creator);

  return (
    <div className="app__third-child">
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
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={CalendarOutlined}
                text={Moment(item?.createdDate).format("YYYY-MM-DD")}
                key="date"
              />,
            ]}
            extra={
              <Space>
                <Button icon={<EditOutlined />} type="text" />
                <Button icon={<DeleteOutlined />} type="text" />
                <Button icon={<EyeOutlined />} type="text" />
              </Space>
            }
          >
            <List.Item.Meta
              title={item?.topicName}
              description={item?.topicDescription}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
export default TopicList;
