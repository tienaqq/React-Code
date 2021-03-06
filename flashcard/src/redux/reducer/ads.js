const initialState = {
  isTwo: true,
  isThree: true,
  adsData: null,
};

export const isActiveTwo = (payload) => {
  return {
    type: "IS_ACTIVE_TWO",
    payload: payload,
  };
};
export const isActiveThree = (payload) => {
  return {
    type: "IS_ACTIVE_THREE",
    payload: payload,
  };
};
export const setAdsData = (payload) => {
  return {
    type: "SET_ADS_DATA",
    payload: payload,
  };
};

const adsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_ACTIVE_TWO": {
      return {
        ...state,
        isTwo: action.payload,
      };
    }
    case "IS_ACTIVE_THREE": {
      return {
        ...state,
        isThree: action.payload,
      };
    }
    case "SET_ADS_DATA": {
      return {
        ...state,
        adsData: action.payload,
      };
    }
    default:
      return state;
  }
};

export default adsReducer;
