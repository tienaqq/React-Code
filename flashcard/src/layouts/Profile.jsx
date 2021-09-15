import Layout from "./Layout";
import { ProfileOutlined, ProjectOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import Completion from "components/Profile/Completion";
import HobbyTopic from "components/Profile/HobbyTopic";
import MainProfile from "components/Profile/MainProfile";
import Password from "components/Profile/Password";
import Point from "components/Profile/Point";
import Process from "components/Profile/Process";
import Sent from "components/Profile/Sent";
import UserProfile from "components/Profile/UserProfile";

const { SubMenu } = Menu;

function Profile() {
  let { path } = useRouteMatch();
  const history = useHistory();

  const handleClick = (e) => {
    history.push(e?.key);
  };
  return (
    <Layout>
      <div className="gd__container">
        <div className="gd__wrapper">
          <div className="gd__menu">
            <Menu
              onClick={handleClick}
              defaultSelectedKeys={["/profile"]}
              defaultOpenKeys={["profile", "activity"]}
              mode="inline"
              className="app--shadow app--white app--font"
            >
              <SubMenu key="profile" icon={<ProfileOutlined />} title="Profile">
                <Menu.Item key="/profile">Overview</Menu.Item>
                <Menu.Item key="/profile/password">Password</Menu.Item>
                <Menu.Item key="/profile/hobby">Hobby Topic</Menu.Item>
              </SubMenu>
              <SubMenu
                key="activity"
                icon={<ProjectOutlined />}
                title="Activity"
              >
                <Menu.ItemGroup key="request" title="Request received">
                  <Menu.Item key="/profile/process">Process</Menu.Item>
                  <Menu.Item key="/profile/completion">
                    Request History
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="sent" title="Request sent">
                  <Menu.Item key="/profile/sent">Request</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup key="history" title="History">
                  <Menu.Item key="/profile/point">Point</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </div>
          <div className="gd__content">
            <Switch>
              <Route exact path={path}>
                <MainProfile />
              </Route>
              <Route path={`${path}/user`}>
                <UserProfile />
              </Route>
              <Route path={`${path}/password`}>
                <Password />
              </Route>
              <Route path={`${path}/hobby`}>
                <HobbyTopic />
              </Route>
              <Route path={`${path}/process`}>
                <Process />
              </Route>
              <Route path={`${path}/completion`}>
                <Completion />
              </Route>
              <Route path={`${path}/point`}>
                <Point />
              </Route>
              <Route path={`${path}/sent`}>
                <Sent />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Profile;
