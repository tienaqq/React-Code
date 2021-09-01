import { Collapse, Space, Descriptions, Button, Typography, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { backStatus } from "constants/backStatus";
import "./index.css";
import { SketchOutlined } from "@ant-design/icons";
import {
  setFlashcardDetail,
  setShowModal,
  setTypeView,
} from "redux/reducer/latest";
import Moment from "moment";
import { useEffect, useState } from "react";

const { Panel } = Collapse;
const { Text } = Typography;

function CourseMain() {
  const dispatch = useDispatch();
  const { lessons } = useSelector((state) => state.latest);
  const { flashcards } = useSelector((state) => state.latest);

  const [list, setList] = useState([]);
  let array = Array.from(Array(50).keys());

  useEffect(() => {
    let dis = [];
    lessons?.map((item) => {
      console.log(item);
      if (item.joinStatus === "Joined") {
        dis.push(item.lessionId);
      }
    });
    setList(dis);
  }, [lessons]);

  const findFlashcard = (id) => {
    let children = [];
    flashcards?.map((flashcard) => {
      flashcard.map((item) => {
        if (item.lessionId === id) {
          children.push(
            <Descriptions.Item key={item.flashcardId}>
              <Button
                type="text"
                disabled={list.indexOf(item.lessionId) < 0}
                onClick={() => selected(item)}
                className="btn--hover"
              >
                {item.flashcardName}
              </Button>
            </Descriptions.Item>
          );
        }
      });
    });
    return children;
  };

  const selected = (item) => {
    dispatch(setTypeView("flashcard"));
    dispatch(setFlashcardDetail(item));
  };

  const enrol = (lesson) => {
    console.log(lesson);
    return;
    dispatch(setShowModal(true));
  };

  return (
    <Space direction="vertical" size={15}>
      {lessons?.map((lesson, index) => (
        <Collapse
          defaultActiveKey={array}
          key={lesson?.lessionId}
          className="lesson__wrapper"
        >
          <Panel
            header={lesson?.lessionName}
            key={index}
            extra={backStatus(lesson?.statusId)}
          >
            <div className="lesson__child">
              <div className="lesson__child-list">
                <Descriptions size="small" column={2}>
                  <Text type="secondary" span={2}>
                    {lesson.lessionDescription}
                  </Text>
                  {findFlashcard(lesson?.lessionId)}
                </Descriptions>
              </div>
              <div className="lesson__child-tool">
                <Descriptions size="small" column={3}>
                  <Descriptions.Item label="Publish" span={3}>
                    {Moment(lesson.createdDate).format("YYYY-MM-DD")}
                  </Descriptions.Item>

                  {lesson.joinStatus === "Not join" && (
                    <Descriptions.Item span={3}>
                      <SketchOutlined />
                      {" " + 100}
                    </Descriptions.Item>
                  )}

                  {lesson.joinStatus === "Not join" && (
                    <Descriptions.Item span={3}>
                      <Button type="primary" onClick={() => enrol(lesson)}>
                        Enrol me
                      </Button>
                    </Descriptions.Item>
                  )}

                  {lesson.joinStatus === "Waiting" && (
                    <Descriptions.Item span={3}>
                      Waiting author accept
                    </Descriptions.Item>
                  )}

                  <Descriptions.Item span={3}>
                    {lesson.joinStatus}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Panel>
        </Collapse>
      ))}
    </Space>
  );
}
export default CourseMain;

// loading={lesson.joinStatus === "Joined" ? false : true}
