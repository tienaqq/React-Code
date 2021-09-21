import adminAPI from "apis/admin";
import adsAPI from "apis/ads";
import donorAPI from "apis/donor";
import feedbackAPI from "apis/feedback";

const initialState = {
  activeArray: [],
  inActiveArray: [],
  banArray: [],
  isShowModal: false,
  feedbacks: [],
  services: [],
  adsWaiting: [],
  adsRunning: [],
  adsStopped: [],
};

const SET_ACTIVE_USER = "SET_ACTIVE_USER";
const SET_INACTIVE_USER = "SET_INACTIVE_USER";
const SET_BAN_USER = "SET_BAN_USER";
const SET_SHOW_MODAL = "SET_SHOW_MODAL";
const SET_ADS_WAITING = "SET_ADS_WAITING";
const SET_ADS_RUNNING = "SET_ADS_RUNNING";
const SET_ADS_STOPPED = "SET_ADS_STOPPED";
const SET_FEEDBACK_LIST = "SET_FEEDBACK_LIST";
const SET_DONOR_SERVICE = "SET_DONOR_SERVICE";

export const setActiveList = (payload) => ({
  type: SET_ACTIVE_USER,
  payload: payload,
});
export const setInActiveList = (payload) => ({
  type: SET_INACTIVE_USER,
  payload: payload,
});
export const setBanList = (payload) => ({
  type: SET_BAN_USER,
  payload: payload,
});
export const setShowModal = (payload) => ({
  type: SET_SHOW_MODAL,
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
export const setFeedbackList = (payload) => ({
  type: SET_FEEDBACK_LIST,
  payload: payload,
});
export const setDonorService = (payload) => ({
  type: SET_DONOR_SERVICE,
  payload: payload,
});

export const fetchUser = () => async (dispatch) => {
  const res = await adminAPI.getAllAccount();
  if (res.status === "Success") {
    let accounts = res.accounts;
    let activeList = accounts.filter((item) => item.statusId === 2);
    dispatch(setActiveList(activeList));
    let inActiveList = accounts.filter((item) => item.statusId === 1);
    dispatch(setInActiveList(inActiveList));
    let banList = accounts.filter((item) => item.statusId === 4);
    dispatch(setBanList(banList));
  }
};
export const fetchAdsByAdmin = () => async (dispatch) => {
  const res = await adsAPI.getAdsByAdmin();
  if (res.status === "Success") {
    let listAds = res.listAds;
    let wList = listAds?.filter((item) => item.statusId === 1);
    dispatch(setAdsWaiting(wList));
    let rList = listAds?.filter((item) => item.statusId === 2);
    dispatch(setAdsRunning(rList));
    let sList = listAds?.filter((item) => item.statusId === 3);
    dispatch(setAdsStopped(sList));
  }
};
export const fetchFeedbackByAdmin = () => async (dispatch) => {
  const res = await feedbackAPI.getFeedbackAdmin();
  if (res.status === "Success") {
    let feeds = res.listFeedback;
    dispatch(setFeedbackList(feeds));
  }
};
export const fetchDonorService = () => async (dispatch) => {
  const res = await donorAPI.getDonorService();
  if (res.status === "Success") {
    dispatch(setDonorService(res.listService));
  }
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return {
        ...state,
        activeArray: action.payload,
      };
    case SET_INACTIVE_USER:
      return {
        ...state,
        inActiveArray: action.payload,
      };
    case SET_BAN_USER:
      return {
        ...state,
        banArray: action.payload,
      };
    case SET_SHOW_MODAL:
      return {
        ...state,
        isShowModal: action.payload,
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
    case SET_DONOR_SERVICE:
      return {
        ...state,
        services: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
