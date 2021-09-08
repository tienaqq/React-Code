import {
  AppstoreOutlined,
  FundOutlined,
  HistoryOutlined,
  ProjectOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import AdsList from "components/Donor/AdsList";
import ServiceHistory from "components/Donor/ServiceHistory";
import ServiceList from "components/Donor/ServiceList";
import TopHeader from "components/TopHeader";
import { useState } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Donor() {
  let { path } = useRouteMatch();
  const [collapsed, setCollapsed] = useState(false);

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
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu
              key="sub1"
              icon={<AppstoreOutlined />}
              title="Donor Dashboard"
            >
              <Menu.ItemGroup key="g1" title="Service">
                <Menu.Item key="1" icon={<ProjectOutlined />}>
                  <Link to="/donor">Service List</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<HistoryOutlined />}>
                  <Link to="/donor">Service History</Link>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="g2" title="Advertisement">
                <Menu.Item key="3" icon={<FundOutlined />}>
                  <Link to="/donor/ads">Ads List</Link>
                </Menu.Item>
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
                <ServiceList />
              </Route>
              <Route path={`${path}/service-history`}>
                <ServiceHistory />
              </Route>
              <Route path={`${path}/ads`}>
                <AdsList />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default Donor;
