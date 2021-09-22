import adsApi from "apis/ads";
import { setAdsData } from "redux/reducer/ads";
import store from "redux/store/store";

export const fetchAdsInterval = async () => {
  const res = await adsApi.getCurrentAdsByAdmin();
  if (res.status === "Success") {
    store.dispatch(setAdsData(res.advertiseInfo));
  }
};
