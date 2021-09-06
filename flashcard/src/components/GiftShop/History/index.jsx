import { List, Card, Button, Descriptions, Typography } from "antd";
import giftAPI from "apis/gift";
import { useEffect, useState } from "react";
import Moment from "moment";
import "./index.css";
import GiftFeedback from "../GiftFeedback";

const { Text } = Typography;

function CartHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const getHistory = async () => {
      const res = await giftAPI.getGiftHistory();
      console.log(res);
      if (res.status === "Success") {
        setHistory(res.listServices);
        setLoading(false);
      }
    };
    getHistory();
  }, []);

  const showModal = (id) => {
    setId(id);
    setIsModalVisible(true);
  };

  console.log(history);
  return (
    <div style={{ maxWidth: 950, margin: "0 auto" }}>
      <GiftFeedback
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        id={id}
      />
      <List
        loading={loading}
        header={<div>Cart History</div>}
        footer={
          <div>
            <div>MFG: Manufacturing date</div>
            <div>EXP: Expiry date</div>
            <div>
              Note:{" "}
              <Text underline>
                Use discount codes, voucher before they expire.
              </Text>
            </div>
          </div>
        }
        grid={{ gutter: 16, column: 1 }}
        pagination={{
          pageSize: 10,
        }}
        dataSource={history}
        renderItem={(item) => (
          <List.Item>
            <Card className="cart-history__wrapper">
              <Text strong>{item.serviceName}</Text>
              <br />
              <Descriptions column={4}>
                <Descriptions.Item span={4}>
                  {item.serviceInformation}
                </Descriptions.Item>
                <Descriptions.Item label="MFG" span={2}>
                  {Moment(item.startDate).format("YYYY-MM-DD")}
                </Descriptions.Item>
                <Descriptions.Item label="EXP" span={2}>
                  {item.serviceTypeName === "clothes"
                    ? "free"
                    : Moment(item.endDate).format("YYYY-MM-DD")}
                </Descriptions.Item>
                <Descriptions.Item label="Quantity" span={2}>
                  {item.quantity}
                </Descriptions.Item>
                <Descriptions.Item label="Received" span={2}>
                  {Moment(item.dateOfReceived).format("YYYY-MM-DD")}
                </Descriptions.Item>
              </Descriptions>
              <Button
                className="cart-history__button"
                type="primary"
                onClick={() => showModal(item.id)}
                disabled={item.isFeedback === 1 ? true : false}
              >
                Feedback
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
export default CartHistory;
