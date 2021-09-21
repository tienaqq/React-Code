import adsAPI from "apis/ads";
import Notification from "components/Notification";
import { fetchAdsByAdmin } from "redux/reducer/admin";
import store from "redux/store/store";
import { Tag } from "antd";

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
