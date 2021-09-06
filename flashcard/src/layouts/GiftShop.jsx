import {
  FieldTimeOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Menu, Spin, Typography } from "antd";
import Cart from "components/GiftShop/Cart";
import CartHistory from "components/GiftShop/History";
import GiftStore from "components/GiftShop/Store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Layout from "./Layout";

const { Text } = Typography;

function GiftShop({ fetchGifts }) {
  let { path } = useRouteMatch();
  const [loading, setLoading] = useState(true);
  const { products } = useSelector((state) => state.gift);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchGifts();
    setTimeout(setLoading(false), 1000);
  }, [fetchGifts]);

  useEffect(() => {
    const getCount = () => {
      let count = 0;
      products.map((item) => {
        if (item.selected === true) {
          count = count + item.quantity;
        }
      });
      return count;
    };
    setCount(getCount());
  }, [products]);

  return (
    <Layout>
      <div className="gift__container">
        <div className="gift__wrapper">
          <div className="gift__menu">
            <div>
              <Menu mode="horizontal" defaultSelectedKeys={["store"]}>
                <Menu.Item key="store" icon={<ShoppingOutlined />}>
                  <Link to="/gift">Store</Link>
                </Menu.Item>
                <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
                  <Link to="/gift/cart">
                    Cart (<Text strong>{count}</Text>)
                  </Link>
                </Menu.Item>
                <Menu.Item key="history" icon={<FieldTimeOutlined />}>
                  <Link to="/gift/cart-history">Cart History</Link>
                </Menu.Item>
              </Menu>
            </div>
          </div>
          <div className="gift__main">
            <Spin spinning={loading}>
              <Switch>
                <Route exact path={path}>
                  <GiftStore />
                </Route>
                <Route path={`${path}/cart`}>
                  <Cart />
                </Route>
                <Route path={`${path}/cart-history`}>
                  <CartHistory />
                </Route>
              </Switch>
            </Spin>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default GiftShop;
