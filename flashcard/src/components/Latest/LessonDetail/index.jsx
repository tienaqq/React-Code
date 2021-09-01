import { SketchOutlined } from "@ant-design/icons";
import { Button, Collapse, Descriptions, Spin, Typography } from "antd";
import { backStatus } from "constants/backStatus";
import Moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFlashcardDetail,
  setShowModalLesson,
  setTypeView,
} from "redux/reducer/latest";
import "./index.css";

const { Panel } = Collapse;
const { Text } = Typography;

function LessonDetail(props) {
  const { code } = props;
  const dispatch = useDispatch();
  const { lessons } = useSelector((state) => state.latest);
  const { flashcards } = useSelector((state) => state.latest);

  const [lesson, setLesson] = useState(null);
  const [list, setList] = useState([]);

  useEffect(() => {
    const obj = lessons?.filter((item) => item.lessionId === parseInt(code));
    setLesson(obj[0]);
  }, [code, lessons]);

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
    dispatch(setShowModalLesson(true));
  };

  return (
    <Collapse defaultActiveKey={[1]} className="lesson__wrapper">
      <Panel
        header={lesson?.lessionName}
        key="1"
        extra={backStatus(lesson?.statusId)}
      >
        <div className="lesson__child">
          <div className="lesson__child-list">
            <Spin spinning={false}>
              <Descriptions size="small" column={2}>
                <Text type="secondary" span={2}>
                  {lesson?.lessionDescription}
                </Text>
                {findFlashcard(lesson?.lessionId)}
              </Descriptions>
            </Spin>
          </div>
          <div className="lesson__child-tool">
            <Descriptions size="small" column={3}>
              <Descriptions.Item label="Publish" span={3}>
                {Moment(lesson?.createdDate).format("YYYY-MM-DD")}
              </Descriptions.Item>
              {lesson?.joinStatus === "Not join" && (
                <Descriptions.Item span={3}>
                  <SketchOutlined />
                  {" " + 100}
                </Descriptions.Item>
              )}
              {lesson?.joinStatus === "Not join" && (
                <Descriptions.Item span={3}>
                  <Button type="primary" onClick={() => enrol(lesson)}>
                    Enrol me
                  </Button>
                </Descriptions.Item>
              )}
              {lesson?.joinStatus === "Waiting" && (
                <Descriptions.Item span={3}>
                  Waiting author accept
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        </div>
      </Panel>
    </Collapse>
  );
}
export default LessonDetail;
