import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal, Tag } from "antd";
import adsAPI from "apis/ads";
import Notification from "components/Notification";
import moment from "moment";
import { fetchAdsByAdmin } from "redux/reducer/admin";
import store from "redux/store/store";

const { confirm } = Modal;

export const runAds = async (id) => {
  confirm({
    title: "Notification",
    icon: <ExclamationCircleOutlined />,
    content: "Are you sure active this ads?",
    async onOk() {
      const res = await adsAPI.runAdsByAdmin({ advertiseId: id });
      if (res.status === "Success") {
        Notification("success", res.message);
        store.dispatch(fetchAdsByAdmin());
      } else {
        Notification("error", res.message);
      }
    },
    onCancel() {},
  });
};

export const removeAds = async (id) => {
  confirm({
    title: "Notification",
    icon: <ExclamationCircleOutlined />,
    content: "Are you sure delete this ads?",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    async onOk() {
      const res = await adsAPI.removeAdsByAdmin({ advertiseId: id });
      if (res.status === "Success") {
        Notification("success", res.message);
        store.dispatch(fetchAdsByAdmin());
      } else {
        Notification("error", res.message);
      }
    },
    onCancel() {},
  });
};

export const returnStatusType = (statusId) => {
  switch (statusId) {
    case 1:
      return <Tag color="warning">Waiting</Tag>;
    case 2:
      return <Tag color="processing">Running</Tag>;
    case 3:
      return <Tag color="default">Stopped</Tag>;
    case 4:
      return <Tag color="red">Deleted</Tag>;
    default:
      break;
  }
};

export const showRefund = (item) => {
  if (item.statusId === 2) {
    if (moment().toDate() > moment(item?.endDate)) {
      if (item.time_rendering > 0) {
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
};
export const showStop = (item) => {
  if (item.statusId === 2) {
    if (moment().toDate() <= moment(item?.endDate)) {
      if (item.time_rendering > 0) {
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
};

export const refundPoint = async (id) => {
  confirm({
    title: "Notification",
    icon: <ExclamationCircleOutlined />,
    content: "Do you want to refund point?",
    async onOk() {
      const res = await adsAPI.refundPointByAdmin({ advertiseId: id });
      if (res.status === "Success") {
        Notification("success", res.message);
        store.dispatch(fetchAdsByAdmin());
      } else {
        Notification("error", res.message);
      }
    },
    onCancel() {},
  });
};

export const stopAds = async (id) => {
  confirm({
    title: "Notification",
    icon: <ExclamationCircleOutlined />,
    content: "Do you want to stop ads? Stopping ads will not refund",
    async onOk() {
      const res = await adsAPI.stopAdsByAdmin({ advertiseId: id });
      if (res.status === "Success") {
        Notification("success", res.message);
        store.dispatch(fetchAdsByAdmin());
      } else {
        Notification("error", res.message);
      }
    },
    onCancel() {},
  });
};
