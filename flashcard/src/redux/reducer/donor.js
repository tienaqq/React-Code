import adsAPI from "apis/ads";
import donorAPI from "apis/donor";
import giftAPI from "apis/gift";

const initialState = {
  service: [],
  history: [],
  type: [],
  ads: [],
  isShow: false,
};

const SET_SERVICE_LIST = "SET_SERVICE_LIST";
const SET_SERVICE_TYPE = "SET_SERVICE_TYPE";
const SET_SERVICE_HISTORY = "SET_SERVICE_HISTORY";
const SET_ADS_LIST = "SET_ADS_LIST";

const SET_SHOW_MODAL = "SET_SHOW_MODAL";

export const setServiceList = (payload) => ({
  type: SET_SERVICE_LIST,
  payload: payload,
});
export const setServiceType = (payload) => ({
  type: SET_SERVICE_TYPE,
  payload: payload,
});
export const setServiceHistory = (payload) => ({
  type: SET_SERVICE_HISTORY,
  payload: payload,
});
export const setAdsList = (payload) => ({
  type: SET_ADS_LIST,
  payload: payload,
});
export const setShowModal = (payload) => ({
  type: SET_SHOW_MODAL,
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
export const fetchHistory = () => async (dispatch) => {
  const res = await giftAPI.getGiftReceive();
  dispatch(setServiceHistory(res.listServices));
};
export const fetchAds = () => async (dispatch) => {
  const res = await adsAPI.getAds();
  dispatch(setAdsList(res.listAds));
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
    case SET_SERVICE_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    case SET_ADS_LIST:
      return {
        ...state,
        ads: action.payload,
      };
    case SET_SHOW_MODAL:
      return {
        ...state,
        isShow: action.payload,
      };
    default:
      return state;
  }
};

export default donorReducer;
