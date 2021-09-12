import { Avatar, Card, Descriptions, Divider, Menu, List } from "antd";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import userAPI from "apis/user";
import "assets/css/main.css";
import images from "constants/images";
import { useEffect, useState } from "react";
import Layout from "./Layout";
import UserAbout from "components/OtherUser/UserAbout";
import UserCourse from "components/OtherUser/UserCourse";

function OtherUser() {
  let { path } = useRouteMatch();
  const [info, setInfo] = useState(null);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await userAPI.getUserInfo({
        email: "luanvnse63360@gmail.com",
      });
      console.log(res);
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
              <Menu.Item key="about">About</Menu.Item>
              <Menu.Item key="course">Course</Menu.Item>
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
