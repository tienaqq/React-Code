import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import flashcardAPI from "apis/flashcard";
import lessonAPI from "apis/lesson";
import subjectAPI from "apis/subject";
import topicAPI from "apis/topic";
import Notification from "components/Notification";
import { useDispatch } from "react-redux";
import {
  fetchTopics,
  fetchSubjects,
  fetchLessons,
  fetchFlashcards,
} from "redux/reducer/creator";
import store from "redux/store/store";

const { confirm } = Modal;

export default function showDeleteConfirm(id, type) {
  confirm({
    title: "Notification",
    icon: <ExclamationCircleOutlined />,
    content: "Are you sure delete this item?",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      switch (type) {
        case "topic":
          removeTopic(id);
          break;
        case "subject":
          removeSubject(id);
          break;
        case "lesson":
          removeLesson(id);
          break;
        case "flashcard":
          removeFlashcard(id);
          break;
        default:
          break;
      }
    },
    onCancel() {},
  });
}

const removeTopic = async (id) => {
  const res = await topicAPI.removeTopic({ topicId: id });
  if (res.status === "Success") {
    Notification("success", res.message);
    store.dispatch(fetchTopics());
  } else {
    Notification("error", res.message);
  }
};
const removeSubject = async (id) => {
  const res = await subjectAPI.removeSubject({ subjectId: id });
  if (res.status === "Success") {
    Notification("success", res.message);
    store.dispatch(fetchSubjects());
  } else {
    Notification("error", res.message);
  }
};
const removeLesson = async (id) => {
  const res = await lessonAPI.removeLesson({ lessionId: id });
  if (res.status === "Success") {
    Notification("success", res.message);
    store.dispatch(fetchLessons());
  } else {
    Notification("error", res.message);
  }
};
const removeFlashcard = async (id) => {
  const res = await flashcardAPI.removeFlashcard({
    flashcardId: id,
  });
  if (res.status === "Success") {
    Notification("success", res.message);
    store.dispatch(fetchFlashcards());
  } else {
    Notification("error", res.message);
  }
};
