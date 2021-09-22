import {
  List,
  Card,
  Button,
  Descriptions,
  Typography,
  Row,
  Col,
  Image,
} from "antd";
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

  const getHistory = async () => {
    const res = await giftAPI.getGiftHistory();
    if (res.status === "Success") {
      setHistory(res.listServices);
      setLoading(false);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  const showModal = (id) => {
    setId(id);
    setIsModalVisible(true);
  };

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <GiftFeedback
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        id={id}
        getHistory={getHistory}
      />
      <List
        loading={loading}
        header={
          <div>
            Cart History: <b>{history?.length}</b>
          </div>
        }
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
          <List.Item key={item.id}>
            <Card className="cart-history__wrapper" size="small" hoverable>
              <Row gutter={[16, 16]}>
                <Col xs={24} xl={24} xxl={4}>
                  <Image
                    width={150}
                    height={100}
                    src={item.image_link}
                    alt="ads"
                  />
                </Col>
                <Col xs={24} xl={24} xxl={20}>
                  <Text strong>{item.serviceName}</Text>
                  <Text type="secondary">({item.serviceTypeName})</Text>
                  <br />
                  <Descriptions column={4} size="small">
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
                </Col>
              </Row>
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
