import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, List, Space } from "antd";
import IconText from "constants/IconText";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function LessonList() {
  let { post } = useParams();
  const { lessons } = useSelector((state) => state.creator);
  let data = lessons?.filter((item) => item.subjectId === parseInt(post));

  return (
    <div className="app__third-child">
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          pageSize: 10,
        }}
        dataSource={data}
        footer={
          <div>
            <b>Total:</b> {data?.length}
          </div>
        }
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText
                icon={CalendarOutlined}
                text={moment(item?.createdDate).format("YYYY-MM-DD")}
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
              title={item?.lessionName}
              description={item?.lessionDescription}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
export default LessonList;
