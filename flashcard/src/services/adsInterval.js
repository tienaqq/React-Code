import adsApi from "apis/ads";
import { setAdsData } from "redux/reducer/ads";
import store from "redux/store/store";

export const fetchAdsInterval = async (isBottom) => {
  if (!isBottom) return;
  const res = await adsApi.getCurrentAdsByAdmin();
  console.log(res);
  if (res.status === "Success") {
    store.dispatch(setAdsData(res.advertiseInfo));
  }
};
