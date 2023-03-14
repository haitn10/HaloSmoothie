import {
  LOG_OUT,
  SET_COUPONS,
  SET_MATERIALS,
  SET_OFFICES,
  SET_PRODUCTS,
  SET_PROFILE,
  SET_STAFFERS,
  SET_TOKEN,
} from "./Constants";

const token = JSON.parse(sessionStorage.getItem("token"));

export const initialState = {
  accessToken: token ? token.accessToken : null,
  profile: [],
  products: [],
  offices: [],
  materials: [],
  coupons: [],
  staffers: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        accessToken: action.state,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.state,
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
    case SET_STAFFERS:
      return {
        ...state,
        staffers: action.state,
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
        staffers: [],
      };
    default:
      return state;
  }
};
