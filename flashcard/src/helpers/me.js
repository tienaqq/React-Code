import userAPI from "apis/user";
import { saveUserInfo } from "redux/reducer/user";
import store from "redux/store/store";

export const getChangeInfo = async () => {
  const res = await userAPI.getMe();
  let info = res.account;
  if (typeof info === "object") {
    store.dispatch(saveUserInfo(info));
  }
};
