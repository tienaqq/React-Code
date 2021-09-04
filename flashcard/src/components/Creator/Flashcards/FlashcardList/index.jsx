import {
  CalendarOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Card, List, Space } from "antd";
import IconText from "constants/IconText";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import renderHTML from "react-render-html";
import { useParams } from "react-router";

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
          <Card
            size="small"
            hoverable
            title={item.flashcardName}
            className="app--mg20"
            extra={
              <Space>
                <Button icon={<EditOutlined />} type="text" />
                <Button icon={<DeleteOutlined />} type="text" />
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
  );
}
export default FlashcardList;
