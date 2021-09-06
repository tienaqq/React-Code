import {
  FieldTimeOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Menu, Spin, Typography } from "antd";
import Cart from "components/GiftShop/Cart";
import GiftStore from "components/GiftShop/Store";
import { useEffect, useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import Layout from "./Layout";

const { Text } = Typography;

function GiftShop({ fetchGifts }) {
  let { path } = useRouteMatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGifts();
    setTimeout(setLoading(false), 1000);
  }, [fetchGifts]);

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
                    Cart (<Text strong>{0}</Text>)
                  </Link>
                </Menu.Item>
                <Menu.Item key="history" icon={<FieldTimeOutlined />}>
                  <Link to="/gift/history">Cart History</Link>
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
              </Switch>
            </Spin>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default GiftShop;
