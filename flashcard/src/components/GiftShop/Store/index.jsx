import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Descriptions, List, Tooltip, Typography } from "antd";
import Notification from "components/Notification";
import Moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuantity, addToCart, fetchGifts } from "redux/reducer/gift";

const { Text, Paragraph } = Typography;

function GiftStore() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.gift);

  useEffect(() => {
    if (products?.length === 0) {
      dispatch(fetchGifts());
    }
  }, [products]);

  const addCart = (id) => {
    let item = products.find((element) => {
      if (element.id === id && element.selected === true) {
        return true;
      }
    });
    if (item) {
      if (item.quantity < item.max) {
        Notification("success", "Add gift success.");
        dispatch(addQuantity(id));
      }
    } else {
      dispatch(addToCart(id));
    }
  };

  const disable = (item) => {
    if (item.max === item.quantity) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4,
        xxl: 4,
      }}
      header={
        <div>
          <Text strong>{products?.length}</Text> Gifts{" "}
        </div>
      }
      pagination={{
        pageSize: 10,
      }}
      dataSource={products}
      renderItem={(item) => (
        <List.Item>
          <Card
            hoverable
            key={item.id}
            cover={
              <img
                alt="example"
                src={item.image_link}
                style={{ height: "120px" }}
              />
            }
            actions={[
              <Tooltip title="Add to cart" key="add">
                <Button
                  icon={<ShoppingCartOutlined />}
                  type="text"
                  onClick={() => addCart(item.id)}
                  disabled={disable(item)}
                >
                  Add to Cart
                </Button>
              </Tooltip>,
            ]}
          >
            <Descriptions>
              <Descriptions.Item span={3}>
                <Text strong>{item.serviceName}</Text>
              </Descriptions.Item>
              <Descriptions.Item span={3} style={{ paddingBottom: "5px" }}>
                <Paragraph
                  style={{ margin: 0, height: "50px" }}
                  ellipsis={{
                    rows: 2,
                    expandable: false,
                  }}
                  tooltip={item.serviceInformation}
                  title={`${item.serviceInformation}`}
                >
                  {item.serviceInformation}
                </Paragraph>
              </Descriptions.Item>
              <Descriptions.Item
                label="Quantity"
                span={3}
                style={{ paddingBottom: "5px" }}
              >
                <Text>{item.max}</Text>
              </Descriptions.Item>
              <Descriptions.Item
                label="Start"
                span={3}
                style={{ paddingBottom: "5px" }}
              >
                {Moment(item.startDate).format("YYYY-MM-DD")}
              </Descriptions.Item>
              <Descriptions.Item
                label="End"
                span={3}
                style={{ paddingBottom: "0px" }}
              >
                {item?.serviceTypeId !== 3
                  ? Moment(item.endDate).format("YYYY-MM-DD")
                  : "free"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </List.Item>
      )}
    />
  );
}
export default GiftStore;
