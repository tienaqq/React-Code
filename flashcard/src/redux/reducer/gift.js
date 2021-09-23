import giftAPI from "apis/gift";

const initialState = {
  products: [],
};

const ADD_TO_PRODUCTS = "ADD_TO_PRODUCTS";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const ADD_QUANTITY = "ADD_QUANTITY";
const SUB_QUANTITY = "SUB_QUANTITY";
const EMPTY_CART = "EMPTY_CART";

export const addToProducts = (payload) => {
  return {
    type: ADD_TO_PRODUCTS,
    payload: payload,
  };
};
export const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    id,
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

const create = (values) => {
  let product = [];
  values?.map((item) => {
    product.push({
      id: item.id,
      serviceId: item.serviceId,
      serviceName: item.serviceName,
      serviceTypeId: item.serviceTypeId,
      serviceInformation: item.serviceInformation,
      max: item.quantity,
      image_link: item.image_link,
      startDate: item.startDate,
      endDate: item.endDate,
      price: 600,
      quantity: 0,
      selected: false,
    });
  });
  return product;
};

export const fetchGifts = () => async (dispatch) => {
  const res = await giftAPI.getGifts();
  let array = create(res.listServices);
  dispatch(addToProducts(array));
};

const giftReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case ADD_TO_CART:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.id
            ? { ...product, quantity: 1, selected: true }
            : product
        ),
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
