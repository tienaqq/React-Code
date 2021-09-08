import {
  AppstoreOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import ActiveList from "components/Admin/Account/ActiveList";
import BanList from "components/Admin/Account/BanList";
import InActiveList from "components/Admin/Account/InActiveList";
import TopHeader from "components/TopHeader";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router";
import { Link, Route, Switch } from "react-router-dom";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

function Admin({ fetchUser }) {
  const [collapsed, setCollapsed] = useState(false);
  let { path } = useRouteMatch();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <TopHeader />
      <Layout style={{ marginTop: 60, height: "100vh" }}>
        <Sider
          width={300}
          className="site-layout-sider"
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
        >
          <Menu defaultOpenKeys={["admin"]} mode="inline">
            <SubMenu
              key="admin"
              icon={<AppstoreOutlined />}
              title="Admin Dashboard"
            >
              <Menu.ItemGroup key="account" title="Account">
                <Menu.Item icon={<CheckCircleOutlined />} key="active">
                  <Link to="/admin">Active List</Link>
                </Menu.Item>
                <Menu.Item icon={<CloseCircleOutlined />} key="inactive">
                  <Link to="/admin/in-active">InActive List</Link>
                </Menu.Item>
                <Menu.Item icon={<StopOutlined />} key="ban">
                  <Link to="/admin/ban-list">Ban List</Link>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="g2" title="Advertisement">
                <Menu.Item key="3">Option 3</Menu.Item>
                <Menu.Item key="4">Option 4</Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: "0 10px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route exact path={path}>
                <ActiveList />
              </Route>
              <Route path={`${path}/in-active`}>
                <InActiveList />
              </Route>
              <Route path={`${path}/ban-list`}>
                <BanList />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default Admin;
