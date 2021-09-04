import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, List, Space, Card, Descriptions } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function SubjectList() {
  let { post } = useParams();
  const { subjects } = useSelector((state) => state.creator);
  let data = subjects?.filter((item) => item.topicId === parseInt(post));

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
          <Card
            size="small"
            title={item?.subjectName}
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
                {item?.subjectDescription}
              </Descriptions.Item>
              <Descriptions.Item label="Publish" span={2}>
                {moment(item?.createdDate).format("YYYY-MM-DD")}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}
      />
    </div>
  );
}
export default SubjectList;
