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
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setTypeView } from "redux/reducer/latest";
import LayoutWithoutFooter from "./LayoutWithoutFooter";

const { SubMenu } = Menu;

const Latest = ({ lessons, fetchSubject, fetchLessons, fetchFlashcards }) => {
  const dispatch = useDispatch();
  let { search } = useLocation();
  let query = new URLSearchParams(search);
  const post = query.get("post");

  const { type } = useSelector((state) => state.latest);
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
    // console.log("click ", e);
    switch (e.key) {
      case "test":
        dispatch(setTypeView("test"));
        break;
      case "grades":
        dispatch(setTypeView("grades"));
        break;
      case "guidelines":
        dispatch(setTypeView("guidelines"));
        break;
      default:
        if (e.keyPath[1] === "overview") {
          const num = e.keyPath[0];
          setCode(num);
          dispatch(setTypeView("lesson"));
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
            <div className="app__first-child">
              <Spin spinning={loading}>
                {type === "subject" && <CourseInfo />}
                {type === "subject" && <CourseMain />}
                {type === "lesson" && <LessonDetail code={code} />}
                {type === "flashcard" && <CourseFlashcard />}
                {type === "test" && <TestList post={post} />}
              </Spin>
            </div>
          </div>
        </div>
      </div>
      <SendRequestLesson />
    </LayoutWithoutFooter>
  );
};

export default Latest;
