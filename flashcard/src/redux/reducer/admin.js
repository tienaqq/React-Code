import adminAPI from "apis/admin";

const initialState = {
  activeList: [],
  inActiveList: [],
  banList: [],
};

const SET_ACTIVE_USER = "SET_ACTIVE_USER";
const SET_INACTIVE_USER = "SET_INACTIVE_USER";
const SET_BAN_USER = "SET_BAN_USER";

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

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return {
        ...state,
        activeList: action.payload,
      };
    case SET_INACTIVE_USER:
      return {
        ...state,
        inActiveList: action.payload,
      };
    case SET_BAN_USER:
      return {
        ...state,
        banList: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
