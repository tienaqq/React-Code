import { Tag } from "antd";
import adsAPI from "apis/ads";
import Notification from "components/Notification";
import moment from "moment";
import { fetchAdsByAdmin } from "redux/reducer/admin";
import store from "redux/store/store";

export const runAds = async (id) => {
  const res = await adsAPI.runAdsByAdmin({ advertiseId: id });
  if (res.status === "Success") {
    Notification("success", res.message);
    store.dispatch(fetchAdsByAdmin());
  } else {
    Notification("error", res.message);
  }
};

export const removeAds = async (id) => {
  const res = await adsAPI.removeAdsByAdmin({ advertiseId: id });
  if (res.status === "Success") {
    Notification("success", res.message);
    store.dispatch(fetchAdsByAdmin());
  } else {
    Notification("error", res.message);
  }
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

export const refundPoint = async (id) => {
  const res = await adsAPI.refundPointByAdmin({ advertiseId: id });
  if (res.status === "Success") {
    Notification("success", res.message);
    store.dispatch(fetchAdsByAdmin());
  } else {
    Notification("error", res.message);
  }
};
