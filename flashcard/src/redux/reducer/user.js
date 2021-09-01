const initialState = {
  userLogged: null,
};

export const saveUserInfo = (payload) => {
  return {
    type: "SAVE_USER_INFO",
    payload: payload,
  };
};
export const removeUserInfo = () => {
  return {
    type: "REMOVE_USER_INFO",
  };
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_USER_INFO": {
      return {
        ...state,
        userLogged: action.payload,
      };
    }
    case "REMOVE_USER_INFO": {
      return {
        ...state,
        userLogged: null,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
