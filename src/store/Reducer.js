import { LOG_OUT, SET_MATERIALS, SET_OFFICES, SET_PRODUCTS, SET_TOKEN } from "./Constants";

const token = JSON.parse(sessionStorage.getItem("token"));

export const initialState = {
  accessToken: token ? token.accessToken : null,
  products: [],
  offices: [],
  materials: [],
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
    case LOG_OUT:
      sessionStorage.clear();
      return {
        ...state,
        accessToken: null,
        products: [],
        offices: [],
        materials: [],
      };
    default:
      return state;
  }
};
