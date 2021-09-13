import { Avatar, Menu } from "antd";
import userAPI from "apis/user";
import "assets/css/main.css";
import UserAbout from "components/OtherUser/UserAbout";
import UserCourse from "components/OtherUser/UserCourse";
import images from "constants/images";
import { Base64 } from "js-base64";
import { useEffect, useState } from "react";
import {
  Link,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import Layout from "./Layout";

function OtherUser() {
  let { post } = useParams();
  let { path } = useRouteMatch();
  const [info, setInfo] = useState(null);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await userAPI.getUserInfo({
        email: `${Base64.decode(post)}`,
      });
      setInfo(res.basicInfor);
      setSubjects(res.subjectInterest);
    };
    getData();
  }, []);

  return (
    <Layout>
      <div className="other__container">
        <div className="other__header">
          <div className="other__header--bg">
            <div className="other__header-image">
              <Avatar size={150} src={images.AVATAR} />
            </div>
          </div>
          <div className="other__header-name">
            <h1>{info?.fullName}</h1>
            <Menu mode="horizontal" defaultSelectedKeys="about">
              <Menu.Item key="about">
                <Link to={`${path}`}>About</Link>
              </Menu.Item>
              <Menu.Item key="course">
                <Link to={`${path}/course`}>Course</Link>
              </Menu.Item>
            </Menu>
          </div>
        </div>
        <div className="other__wrapper">
          <div className="other__content">
            <Switch>
              <Route exact path={path}>
                <UserAbout info={info} />
              </Route>
              <Route exact path={`${path}/course`}>
                <UserCourse subjects={subjects} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default OtherUser;
