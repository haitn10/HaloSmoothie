import {
  LOG_OUT,
  SET_COUPONS,
  SET_MATERIALS,
  SET_OFFICES,
  SET_PRODUCTS,
  SET_STAFFS,
  SET_TOKEN,
  SET_USER,
  SET_USERS,
} from "./Constants";

const token = JSON.parse(sessionStorage.getItem("token"));

export const initialState = {
  accessToken: token ? token.accessToken : null,
  products: [],
  offices: [],
  materials: [],
  coupons: [],
  users: [],
  staffs: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        accessToken: action.state,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.state,
      };
    case SET_OFFICES:
      return {
        ...state,
        offices: action.state,
      };
    case SET_MATERIALS:
      return {
        ...state,
        materials: action.state,
      };
    case SET_COUPONS:
      return {
        ...state,
        coupons: action.state,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.state,
      };
    case SET_STAFFS:
      return {
        ...state,
        staffs: action.state,
      };
    case LOG_OUT:
      sessionStorage.clear();
      return {
        ...state,
        accessToken: null,
        products: [],
        offices: [],
        materials: [],
        cupons: [],
        users: [],
        staffs: [],
      };
    default:
      return state;
  }
};
