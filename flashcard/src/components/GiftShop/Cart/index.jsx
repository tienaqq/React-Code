import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Descriptions,
  Image,
  List,
  message,
  Modal,
  Row,
  Tag,
  Typography,
} from "antd";
import giftAPI from "apis/gift";
import Notification from "components/Notification";
import { getChangeInfo } from "helpers/me";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addQuantity,
  addToProducts,
  removeFromCart,
  subtractQuantity,
} from "redux/reducer/gift";
import "./index.css";

const { Text } = Typography;
const { confirm } = Modal;

function Cart() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.gift);
  const { userLogged } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [point, setPoint] = useState(0);

  useEffect(() => {
    let el = [];
    el = products?.filter((item) => item.selected === true);
    setTotal(el?.length);
    setData(el);
  }, [products]);

  const add = (id) => {
    let item = products.find((element) => {
      if (element.id === id && element.selected === true) {
        return true;
      }
    });
    if (item.quantity < item.max) {
      dispatch(addQuantity(id));
      message.success("Add gift success.");
    } else {
      message.warning("Out of stock.");
    }
  };
  const sub = (id) => {
    let item = products.find((element) => {
      if (element.id === id && element.selected === true) {
        return true;
      }
    });
    if (item.quantity > 1) {
      dispatch(subtractQuantity(id));
      message.success("Decrease item success.");
    } else {
      remove(id);
    }
  };
  const remove = (id) => {
    dispatch(removeFromCart(id));
  };
  const emptyCart = () => {
    dispatch(addToProducts([]));
  };

  useEffect(() => {
    let po = 0;
    products?.map((item) => {
      if (item.selected === true) {
        po = po + item.quantity * 600;
      }
    });
    setPoint(po);
  }, [products]);

  const onSubmit = () => {
    const listServiceDetail = [];
    products?.map((item) => {
      if (item.selected === true) {
        listServiceDetail.push({
          serviceDetailId: item.id,
          quantity: item.quantity,
        });
      }
    });
    if (listServiceDetail.length === 0) {
      message.warning("Cart is empty.");
      return;
    }
    const params = {
      email: userLogged.email,
      total: point,
      listServiceDetail: listServiceDetail,
    };
    saveRelation(params);
  };

  const saveRelation = async (params) => {
    const response = await giftAPI.checkout(params);
    if (response.status === "Success") {
      Notification("success", "Receive gift success.");
      getChangeInfo();
      emptyCart();
    } else {
      Notification("error", response.message);
    }
  };

  function showConfirm() {
    confirm({
      title: "Notification",
      icon: <ExclamationCircleOutlined />,
      content: "You want to checkout?",
      onOk() {
        onSubmit();
      },
      onCancel() {},
    });
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <List
        header={
          <div>
            Cart: <b>{total}</b>
          </div>
        }
        footer={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Text>
                Point: <Text strong>{point}</Text>
                {userLogged?.point < point && (
                  <Text mark> Try to study to accumulate more points</Text>
                )}
              </Text>
            </div>
            <div>
              <Button
                type="primary"
                style={{ marginRight: "auto" }}
                disabled={userLogged?.point < point ? true : false}
                onClick={() => {
                  showConfirm();
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        }
        grid={{ gutter: 16, column: 1 }}
        pagination={{
          pageSize: 10,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              title={item.title}
              className="cart__wrapper"
              size="small"
              hoverable
            >
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
                  <Descriptions size="small">
                    <Descriptions.Item span={3}>
                      <Text strong>{item.serviceName}</Text>
                      <p>
                        (
                        {(item.serviceTypeId === 1 && "Voucher") ||
                          (item.serviceTypeId === 2 && "Discount code") ||
                          (item.serviceTypeId === 3 && "Clothes")}
                        )
                      </p>
                    </Descriptions.Item>
                    <Descriptions.Item span={3}>
                      <Text>{item.serviceInformation}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Quantity">
                      <Tag color="#108ee9">{item.quantity}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Total point">
                      <Tag color="#2db7f5">{item.quantity * 600}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="In stock">
                      <Tag color="#2db7f5">{item.max}</Tag>
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
              <div className="cart__buttons">
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => add(item.id)}
                  key="cart-add"
                />
                <Button
                  type="text"
                  icon={<MinusOutlined />}
                  onClick={() => sub(item.id)}
                  key="cart-minus"
                />
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => remove(item.id)}
                  key="cart-remove"
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
export default Cart;
