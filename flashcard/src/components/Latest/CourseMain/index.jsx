import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Collapse, Descriptions, Space, Typography } from "antd";
import { backStatus } from "constants/backStatus";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  setFlashcardDetail,
  setLessonRequest,
  setShowModalLesson,
} from "redux/reducer/latest";
import { returnDone } from "../latestFunction";
import "./index.css";

const { Panel } = Collapse;
const { Text } = Typography;

function CourseMain() {
  const dispatch = useDispatch();
  const history = useHistory();
  let { post } = useParams();
  const { lessons } = useSelector((state) => state.latest);
  const { flashcards } = useSelector((state) => state.latest);

  const [list, setList] = useState([]);
  let array = Array.from(Array(50).keys());

  useEffect(() => {
    let dis = [];
    lessons?.map((item) => {
      if (item.joinStatus === "Join") {
        dis.push(item.lessionId);
      }
    });
    setList(dis);
  }, [lessons]);

  const findFlashcard = (id) => {
    let children = [];
    flashcards.map((item) => {
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
              {returnDone(item.isComplete)}
              {item.isComplete === true && "Done"}
            </Button>
          </Descriptions.Item>
        );
      }
    });
    return children;
  };

  const selected = (item) => {
    dispatch(setFlashcardDetail(item));
    history.push(`/latest/${post}/flashcard`);
  };

  const enrol = (lesson) => {
    dispatch(setLessonRequest(lesson));
    dispatch(setShowModalLesson(true));
  };

  return (
    <div className="app__first-child">
      <Space direction="vertical" size={15}>
        {lessons?.map((lesson, index) => (
          <Collapse
            defaultActiveKey={array}
            key={lesson?.lessionId}
            className="lesson__wrapper"
          >
            <Panel
              header={
                lesson?.lessionName + (lesson.isComplete === true && " ✔️")
              }
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
                      <b>{Moment(lesson.createdDate).format("YYYY-MM-DD")}</b>
                    </Descriptions.Item>

                    {(lesson?.statusId === 1 ||
                      lesson?.joinStatus === "Join") && (
                      <Descriptions.Item span={3}>
                        Joined
                        <Button
                          type="text"
                          shape="circle"
                          className="icon__joined"
                          icon={<CheckCircleOutlined />}
                        />
                      </Descriptions.Item>
                    )}

                    {lesson.joinStatus === "Not join" && (
                      <Descriptions.Item span={3} label="Point">
                        100
                      </Descriptions.Item>
                    )}

                    {lesson.joinStatus === "Not join" && (
                      <Descriptions.Item span={3}>
                        <Button type="primary" onClick={() => enrol(lesson)}>
                          Enrol me
                        </Button>
                      </Descriptions.Item>
                    )}

                    {lesson.joinStatus === "Waiting from author" && (
                      <Descriptions.Item span={3}>
                        Waiting author accept
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </div>
              </div>
            </Panel>
          </Collapse>
        ))}
      </Space>
    </div>
  );
}
export default CourseMain;
