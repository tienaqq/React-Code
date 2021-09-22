import adsAPI from "apis/ads";
import donorAPI from "apis/donor";
import feedbackAPI from "apis/feedback";

const initialState = {
  service: [],
  type: [],
  isShow: false,
  adsWaiting: [],
  adsRunning: [],
  adsStopped: [],
  feedbacks: [],
};

const SET_SERVICE_LIST = "SET_SERVICE_LIST";
const SET_SERVICE_TYPE = "SET_SERVICE_TYPE";

const SET_ADS_WAITING = "SET_ADS_WAITING";
const SET_ADS_RUNNING = "SET_ADS_RUNNING";
const SET_ADS_STOPPED = "SET_ADS_STOPPED";

const SET_SHOW_MODAL = "SET_SHOW_MODAL";

const SET_FEEDBACK_LIST = "SET_FEEDBACK_LIST";

export const setServiceList = (payload) => ({
  type: SET_SERVICE_LIST,
  payload: payload,
});
export const setServiceType = (payload) => ({
  type: SET_SERVICE_TYPE,
  payload: payload,
});
export const setShowModal = (payload) => ({
  type: SET_SHOW_MODAL,
  payload: payload,
});
export const setFeedbackList = (payload) => ({
  type: SET_FEEDBACK_LIST,
  payload: payload,
});

export const setAdsWaiting = (payload) => ({
  type: SET_ADS_WAITING,
  payload: payload,
});
export const setAdsRunning = (payload) => ({
  type: SET_ADS_RUNNING,
  payload: payload,
});
export const setAdsStopped = (payload) => ({
  type: SET_ADS_STOPPED,
  payload: payload,
});

export const fetchServices = () => async (dispatch) => {
  const res = await donorAPI.getServices();
  dispatch(setServiceList(res.listService));
};
export const fetchTypes = () => async (dispatch) => {
  const res = await donorAPI.getServiceType();
  dispatch(setServiceType(res.types));
};
export const fetchAds = () => async (dispatch) => {
  const res = await adsAPI.getAds();
  let listAds = res.listAds;
  let wList = listAds?.filter((item) => item.statusId === 1);
  dispatch(setAdsWaiting(wList));
  let rList = listAds?.filter((item) => item.statusId === 2);
  dispatch(setAdsRunning(rList));
  let sList = listAds?.filter((item) => item.statusId === 3);
  dispatch(setAdsStopped(sList));
};
export const fetchFeedback = () => async (dispatch) => {
  const res = await feedbackAPI.getFeedbackDonor();
  if (res.status === "Success") {
    dispatch(setFeedbackList(res.listFeedback));
  }
};

const donorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVICE_LIST:
      return {
        ...state,
        service: action.payload,
      };
    case SET_SERVICE_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case SET_SHOW_MODAL:
      return {
        ...state,
        isShow: action.payload,
      };
    case SET_ADS_WAITING:
      return {
        ...state,
        adsWaiting: action.payload,
      };
    case SET_ADS_RUNNING:
      return {
        ...state,
        adsRunning: action.payload,
      };
    case SET_ADS_STOPPED:
      return {
        ...state,
        adsStopped: action.payload,
      };
    case SET_FEEDBACK_LIST:
      return {
        ...state,
        feedbacks: action.payload,
      };
    default:
      return state;
  }
};

export default donorReducer;
