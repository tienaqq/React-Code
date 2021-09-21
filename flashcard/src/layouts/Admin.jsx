import {
  AppstoreOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Divider, Layout, Menu } from "antd";
import ActiveList from "components/Admin/Account/ActiveList";
import OtherList from "components/Admin/Account/OtherList";
import AdminAdsList from "components/Admin/Advertisement/AdsList";
import ListService from "components/Admin/DonorService/ListService";
import FeedbackList from "components/Admin/Feedback/FeedbackList";
import TopHeader from "components/TopHeader";
import { useEffect } from "react";
import { useRouteMatch } from "react-router";
import { Link, Route, Switch } from "react-router-dom";

const { Content, Sider } = Layout;
const { SubMenu } = Menu;

function Admin({
  fetchUser,
  inActiveArray,
  banArray,
  fetchDonorService,
  fetchAdsByAdmin,
  adsWaiting,
  adsRunning,
  adsStopped,
}) {
  let { path } = useRouteMatch();

  useEffect(() => {
    fetchUser();
    fetchDonorService();
    fetchAdsByAdmin();
  }, [fetchUser]);

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
            theme="light"
            defaultOpenKeys={["admin"]}
            mode="inline"
            style={{ height: "calc(100vh - 60px)" }}
          >
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
              <Menu.ItemGroup key="feedback" title="Feedback">
                <Menu.Item key="feedback-list">
                  <Link to="/admin/feedback-list">Feedback List</Link>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.ItemGroup key="advertisement" title="Donor">
                <Menu.Item
                  key="ads-list-waiting"
                  icon={<ClockCircleOutlined />}
                >
                  <Link to="/admin/ads-list-waiting">Ads Request</Link>
                </Menu.Item>
                <Menu.Item
                  key="ads-list-running"
                  icon={<CheckCircleOutlined />}
                >
                  <Link to="/admin/ads-list-running">Ads Running</Link>
                </Menu.Item>
                <Menu.Item
                  key="ads-list-stopped"
                  icon={<CloseCircleOutlined />}
                >
                  <Link to="/admin/ads-list-stopped">Ads Stopped</Link>
                </Menu.Item>
                <Menu.Item key="service-list">
                  <Link to="/admin/donor-service">Donor Service</Link>
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="ant-dashboard__layout">
          <Content style={{ padding: "10px" }}>
            <Switch>
              <Route exact path={path}>
                <ActiveList />
              </Route>
              <Route path={`${path}/in-active`}>
                <OtherList list={inActiveArray} />
              </Route>
              <Route path={`${path}/ban-list`}>
                <OtherList list={banArray} />
              </Route>
              <Route path={`${path}/ads-list-waiting`}>
                <AdminAdsList adsList={adsWaiting} />
              </Route>
              <Route path={`${path}/ads-list-running`}>
                <AdminAdsList adsList={adsRunning} />
              </Route>
              <Route path={`${path}/ads-list-stopped`}>
                <AdminAdsList adsList={adsStopped} />
              </Route>
              <Route path={`${path}/feedback-list`}>
                <FeedbackList />
              </Route>
              <Route path={`${path}/donor-service`}>
                <ListService />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default Admin;
