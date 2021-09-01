const initialState = {
  isBottom: true,
  isTwo: true,
  isThree: true,
};

export const isActiveBottom = (payload) => {
  return {
    type: "IS_ACTIVE_BOTTOM",
    payload: payload,
  };
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

const adsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "IS_ACTIVE_BOTTOM": {
      return {
        ...state,
        isBottom: action.payload,
      };
    }
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
    default:
      return state;
  }
};

export default adsReducer;
