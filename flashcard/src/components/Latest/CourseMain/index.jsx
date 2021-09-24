import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Collapse, Descriptions, Modal, Space, Typography } from "antd";
import acceptAPI from "apis/accept";
import privateAPI from "apis/private";
import Notification from "components/Notification";
import { backStatus } from "constants/backStatus";
import { getChangeInfo } from "helpers/me";
import Moment from "moment";
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
const { confirm } = Modal;

function CourseMain() {
  const dispatch = useDispatch();
  const history = useHistory();
  let { post } = useParams();
  const { lessons, flashcards, subjectStatus } = useSelector(
    (state) => state.latest
  );
  let array = Array.from(Array(50).keys());

  const findFlashcard = (id) => {
    let children = [];
    flashcards.map((item) => {
      if (item.lessionId === id) {
        children.push(
          <Descriptions.Item key={item.flashcardId} span={2}>
            <Button
              type="text"
              onClick={() => findStatus(item)}
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

  const enrol = (lesson) => {
    dispatch(setLessonRequest(lesson));
    dispatch(setShowModalLesson(true));
  };

  const findStatus = (item) => {
    dispatch(setFlashcardDetail(item));
    let filtered = lessons?.filter((el) => el.lessionId === item.lessionId);
    let status = filtered[0]?.statusId;
    switch (status) {
      case 1:
        selected(item);
        break;
      case 2:
        checkApprovePrivate(item);
        break;
      default:
        break;
    }
  };

  const selected = (item) => {
    history.push(`/latest/${post}/flashcard`);
  };

  const requestLesson = async (id) => {
    const response = await privateAPI.sentRequestLesson({ lessionId: id });
    if (response.status === "Success") {
      Notification("success", response.message);
    }
  };

  const checkApprovePrivate = async (item) => {
    const id = item.lessionId;
    const response = await acceptAPI.checkAcceptLesson({ lessionId: id });
    let status = response.status;
    switch (status) {
      case "Success": {
        history.push(`/latest/${post}/flashcard`);
        getChangeInfo();
        break;
      }
      case "Failed": {
        Notification("error", response.message);
        break;
      }
      case "Point Unavailable": {
        Notification("error", response.message);
        break;
      }
      case "Not Found Request": {
        confirm({
          title: "Notification",
          icon: <ExclamationCircleOutlined />,
          content: `Do you want to sent request to see content?`,
          onOk() {
            requestLesson(id);
          },
        });
        break;
      }
      default:
        Notification("error", response.message);
        break;
    }
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

                    {lesson.joinStatus === "Not join" && subjectStatus === 1 && (
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
