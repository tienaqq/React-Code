import {
  FormOutlined,
  HistoryOutlined,
  QuestionCircleOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Menu, Spin } from "antd";
import CourseFlashcard from "components/Latest/CourseFlashcard";
import CourseInfo from "components/Latest/CourseInfo";
import CourseMain from "components/Latest/CourseMain";
import LessonDetail from "components/Latest/LessonDetail";
import SendRequestLesson from "components/Latest/SendRequestLesson";
import TestList from "components/Latest/TestList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  Switch,
  useHistory,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import LayoutWithoutFooter from "./LayoutWithoutFooter";

const { SubMenu } = Menu;

const Latest = ({ lessons, fetchSubject, fetchLessons, fetchFlashcards }) => {
  const history = useHistory();
  let { path } = useRouteMatch();
  let { post } = useParams();

  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState(null);

  useEffect(() => {
    fetchSubject(post);
    fetchLessons(post);
    setTimeout(setLoading(false), 1000);
  }, []);

  useEffect(() => {
    lessons?.map((item) => {
      fetchFlashcards(item.lessionId);
    });
  }, [lessons]);

  let pub = [];
  let pri = [];

  lessons?.map((item) => {
    if (item.statusId === 1) {
      pub.push(<Menu.Item key={item.lessionId}>{item.lessionName}</Menu.Item>);
    }
    if (item.statusId === 2) {
      pri.push(<Menu.Item key={item.lessionId}>{item.lessionName}</Menu.Item>);
    }
  });

  const handleClick = (e) => {
    switch (e.key) {
      case "all":
        history.push(`/latest/${post}`);
        break;
      case "test":
        history.push(`/latest/${post}/test`);
        break;
      case "grades":
        history.push(`/latest/${post}/grades`);
        break;
      case "guidelines":
        history.push(`/latest/${post}/guidelines`);
        break;
      default:
        if (e.keyPath[1] === "overview") {
          const num = e.keyPath[0];
          setCode(num);
          history.push(`/latest/${post}/lesson`);
        }
        break;
    }
  };

  return (
    <LayoutWithoutFooter>
      <div className="app__container">
        <div className="app__wrapper">
          <div className="app__menu">
            <Menu
              onClick={handleClick}
              defaultSelectedKeys={["overview"]}
              defaultOpenKeys={["overview"]}
              mode="inline"
              style={{ background: "#f0f0f0" }}
            >
              <SubMenu
                key="overview"
                icon={<ScheduleOutlined />}
                title="Overview"
              >
                <Menu.Item key="all">All Type</Menu.Item>
                <Menu.ItemGroup key="public" title="Public">
                  {pub}
                </Menu.ItemGroup>
                <Menu.ItemGroup key="private" title="Private">
                  {pri}
                </Menu.ItemGroup>
              </SubMenu>
              <Menu.Item key="test" icon={<FormOutlined />}>
                Test
              </Menu.Item>
              <Menu.Item key="grades" icon={<HistoryOutlined />}>
                Grades
              </Menu.Item>
              <Menu.Item key="guidelines" icon={<QuestionCircleOutlined />}>
                Guidelines
              </Menu.Item>
            </Menu>
          </div>
          <div className="app__content">
            <Spin spinning={loading}></Spin>
            <Switch>
              <Route exact path={path}>
                <CourseInfo />
                <CourseMain />
              </Route>
              <Route path={`${path}/lesson`}>
                <LessonDetail code={code} />
              </Route>
              <Route path={`${path}/flashcard`}>
                <CourseFlashcard />
              </Route>
              <Route path={`${path}/test`}>
                <TestList post={post} />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
      <SendRequestLesson />
    </LayoutWithoutFooter>
  );
};

export default Latest;
