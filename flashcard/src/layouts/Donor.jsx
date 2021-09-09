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
      <Layout style={{ marginTop: 60, height: "calc(100vh - 60px)" }}>
        <Sider
          width={300}
          theme="light"
          breakpoint="lg"
          collapsedWidth="60px"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "calc(100vh - 60px)" }}
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
        <Layout className="ant-dashboard__layout">
          <Content style={{ padding: "10px" }}>
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
