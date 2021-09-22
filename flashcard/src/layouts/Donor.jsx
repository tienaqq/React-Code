import {
  AppstoreOutlined,
  BoxPlotOutlined,
  FundOutlined,
  HistoryOutlined,
  KeyOutlined,
  ProjectOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import AdsList from "components/Donor/AdsList";
import ServiceFeedback from "components/Donor/ServiceFeedback";
import ServiceList from "components/Donor/ServiceList";
import MainProfile from "components/Profile/MainProfile";
import Password from "components/Profile/Password";
import TopHeader from "components/TopHeader";
import { useEffect } from "react";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

function Donor({ fetchAds, adsWaiting, adsRunning, adsStopped }) {
  let { path } = useRouteMatch();

  useEffect(() => {
    fetchAds();
  }, []);

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
              <Menu.ItemGroup key="service" title="Service">
                <Menu.Item key="1" icon={<ProjectOutlined />}>
                  <Link to="/donor">Service List</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<HistoryOutlined />}>
                  <Link to="/donor/feedback">Service Feedback</Link>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="advertisement" title="Advertisement">
                <Menu.Item key="3" icon={<BoxPlotOutlined />}>
                  <Link to="/donor/ads-waiting">Ads Waiting</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<FundOutlined />}>
                  <Link to="/donor/ads-running">Ads Running</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<FundOutlined />}>
                  <Link to="/donor/ads-stopped">Ads Stopped</Link>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="profile" title="Profile">
                <Menu.Item key="6" icon={<UserOutlined />}>
                  <Link to="/donor/profile">Update Profile</Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<KeyOutlined />}>
                  <Link to="/donor/password">Update Password</Link>
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
              <Route path={`${path}/feedback`}>
                <ServiceFeedback />
              </Route>
              <Route path={`${path}/ads-waiting`}>
                <AdsList ads={adsWaiting} />
              </Route>
              <Route path={`${path}/ads-running`}>
                <AdsList ads={adsRunning} />
              </Route>
              <Route path={`${path}/ads-stopped`}>
                <AdsList ads={adsStopped} />
              </Route>
              <Route path={`${path}/profile`}>
                <MainProfile />
              </Route>
              <Route path={`${path}/password`}>
                <Password />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default Donor;
