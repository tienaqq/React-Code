import { Descriptions, Modal, Typography } from "antd";
import privateAPI from "apis/private";
import Notification from "components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchLessons, setShowModalLesson } from "redux/reducer/latest";

const { Text } = Typography;

function SendRequestLesson() {
  let { post } = useParams();
  const dispatch = useDispatch();
  const { isRequestLesson, lessonRequest } = useSelector(
    (state) => state.latest
  );

  const handleOk = async () => {
    const id = lessonRequest?.lessionId;
    const res = await privateAPI.sentRequestLesson({ lessionId: id });
    if (res.status === "Success") {
      Notification("success", res.message);
      dispatch(fetchLessons(post));
    } else {
      Notification("warning", res.message);
    }
    dispatch(setShowModalLesson(false));
  };

  const handleCancel = () => {
    dispatch(setShowModalLesson(false));
  };

  return (
    <Modal
      title="Send request"
      visible={isRequestLesson}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Descriptions column={2}>
        <Descriptions.Item label="Lesson" span={2}>
          <Text strong>{lessonRequest?.lessionName}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Point" span={2}>
          <Text strong>100</Text>
        </Descriptions.Item>
        <Descriptions.Item>
          For each private lesson, a request should be sent to the author.
          Points will be deducted on your next visit if the author approves.
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}
export default SendRequestLesson;
