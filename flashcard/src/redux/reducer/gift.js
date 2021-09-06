import giftAPI from "apis/gift";

const initialState = {
  gifts: [],
  products: [],
};

const ADD_CURRENT_GIFTS = "ADD_CURRENT_GIFTS";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const ADD_QUANTITY = "ADD_QUANTITY";
const SUB_QUANTITY = "SUB_QUANTITY";
const EMPTY_CART = "EMPTY_CART";

export const addCurrentGifts = (payload) => {
  return {
    type: ADD_CURRENT_GIFTS,
    payload: payload,
  };
};
export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload: payload,
  };
};
export const removeFromCart = (id) => {
  return {
    type: REMOVE_FROM_CART,
    id,
  };
};
export const subtractQuantity = (id) => {
  return {
    type: SUB_QUANTITY,
    id,
  };
};
export const addQuantity = (id) => {
  return {
    type: ADD_QUANTITY,
    id,
  };
};
export const emptyCart = () => {
  return {
    type: EMPTY_CART,
  };
};

export const fetchGifts = () => async (dispatch) => {
  const res = await giftAPI.getGifts();
  dispatch(addCurrentGifts(res.listServices));
};

const giftReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENT_GIFTS:
      return {
        ...state,
        gifts: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        products: Object.assign(...action.payload, { amount: 1 }),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.id
            ? { ...product, selected: false, quantity: 1 }
            : product
        ),
      };
    case ADD_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        ),
      };
    case SUB_QUANTITY:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.id
            ? {
                ...product,
                quantity: product.quantity !== 1 ? product.quantity - 1 : 1,
              }
            : product
        ),
      };
    case EMPTY_CART:
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
};
export default giftReducer;
