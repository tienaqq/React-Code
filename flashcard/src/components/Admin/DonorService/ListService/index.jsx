import { List, Card, Descriptions, Button, Row, Col, Image, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setShowModal } from "redux/reducer/admin";
import ConfirmService from "../ConfirmService";
import { useState } from "react";

const colors = [
  "success",
  "volcano",
  "red",
  "magenta",
  "purple",
  "geekblue",
  "blue",
];

const types = [" ", "Voucher", "Discount code", "Clothes"];

function random_item(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function ListService() {
  const { services } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const [element, setElement] = useState(null);

  const showModal = (item) => {
    setElement(item);
    dispatch(setShowModal(true));
  };
  return (
    <div style={{ maxWidth: 1000 }}>
      <ConfirmService element={element} />
      <List
        header={
          <div>
            <b>Donor</b> Service
          </div>
        }
        grid={{ gutter: 16, column: 1 }}
        pagination={{
          pageSize: 10,
        }}
        dataSource={services}
        renderItem={(item) => (
          <List.Item>
            <Card key={item.id}>
              <Row gutter={[8, 8]}>
                <Col xxl={4} xl={4} lg={4}>
                  <Image
                    width={100}
                    preview={false}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                </Col>
                <Col xxl={20} xl={20} lg={20}>
                  <Descriptions
                    size="small"
                    title={<div>{item.serviceName}</div>}
                    extra={[
                      <Button
                        key="show"
                        type="text"
                        disabled
                        style={{ color: "#FD695A" }}
                      >
                        {item.statusId === 1 && "Available"}
                        {item.statusId === 4 && "Unavailable"}
                        {" (" + item.quantity + ") "}
                      </Button>,
                      <Button
                        key="tool"
                        disabled={item.isConfirmed === 1 ? true : false}
                        type="primary"
                        ghost
                        onClick={() => showModal(item)}
                      >
                        Confirm
                      </Button>,
                    ]}
                  >
                    <Descriptions.Item label="Desc" span={3}>
                      {item.serviceInformation}
                    </Descriptions.Item>
                    <Descriptions.Item label="Create">
                      {moment(item.createdDate).format("YYYY-MM-DD")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Type">
                      <Tag key={item.topicId} color={random_item(colors)}>
                        {types[item.serviceTypeId]}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Donor">
                      {item.donorId}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
export default ListService;
