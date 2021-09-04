import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, List, Space, Card } from "antd";
import IconText from "constants/IconText";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import renderHTML from "react-render-html";

function FlashcardList() {
  let { post } = useParams();
  const { flashcards } = useSelector((state) => state.creator);
  let data = flashcards?.filter((item) => item.lessionId === parseInt(post));

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
          <List.Item>
            <Card
              size="small"
              title={item.flashcardName}
              extra={
                <Space>
                  <Button icon={<EditOutlined />} type="text" />
                  <Button icon={<DeleteOutlined />} type="text" />
                  <Button icon={<EyeOutlined />} type="text" />
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
          </List.Item>
        )}
      />
    </div>
  );
}
export default FlashcardList;
