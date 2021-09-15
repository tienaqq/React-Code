import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import acceptAPI from "apis/accept";
import privateAPI from "apis/private";
import subjectAPI from "apis/subject";
import Notification from "components/Notification";
import history from "helpers/history";
import { getChangeInfo } from "helpers/me";
import store from "redux/store/store";
import {
  fetchSearchSubjects,
  fetchSearchSubjectsBy,
} from "redux/reducer/search";

const { confirm } = Modal;

const fetchData = (str) => {
  store.dispatch(fetchSearchSubjects(str));
  store.dispatch(fetchSearchSubjectsBy(str));
};

const sendRequestSubject = async (id) => {
  const res = await privateAPI.sentRequestSubject({ subjectId: id });
  if (res.status === "Success") {
    Notification("success", res.message);
  }
};

export const checkPrivateSubject = async (id) => {
  const res = await acceptAPI.checkAcceptSubject({ subjectId: id });
  let status = res.status;
  getChangeInfo();
  switch (status) {
    case "Success": {
      history.push(`/latest/${id}`);
      break;
    }
    case "Failed": {
      Notification("warning", res.message);
      break;
    }
    case "Point Unavailable": {
      Notification("warning", res.message);
      break;
    }
    case "Not Found Request": {
      confirm({
        title: "Notification",
        icon: <ExclamationCircleOutlined />,
        content: "You should send request to see this subject.",
        onOk() {
          sendRequestSubject(id);
        },
        onCancel() {},
      });
      break;
    }
    default:
      Notification("warning", res.message);
      break;
  }
};

export const checkPublicSubject = async (id) => {
  const res = await subjectAPI.checkPublic({ subjectId: id });
  if (res.status === "Success") {
    history.push(`/latest/${id}`);
  } else {
    confirm({
      title: "Notification",
      icon: <ExclamationCircleOutlined />,
      content: res.message,
      onOk() {
        savePublic(id);
      },
      onCancel() {},
    });
  }
};

const savePublic = async (id) => {
  const res = await subjectAPI.saveRelation({ subjectId: id });
  if (res.status === "Success") {
    getChangeInfo();
    history.push(`/latest/${id}`);
  } else {
    Notification("error", res.message);
  }
};
