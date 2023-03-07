import {
  LOG_OUT,
  SET_TOKEN,
  SET_USER,
  SET_PRODUCTS,
  SET_OFFICES,
  SET_MATERIALS,
  SET_COUPONS,
} from "./Constants";

export const setToken = (state) => ({
  type: SET_TOKEN,
  state,
});

export const setPoducts = (state) => ({
  type: SET_PRODUCTS,
  state,
});

export const setOffices = (state) => ({
  type: SET_OFFICES,
  state,
});

export const setMaterials = (state) => ({
  type: SET_MATERIALS,
  state,
});

export const setCoupons = (state) => ({
  type: SET_COUPONS,
  state,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const setUser = (state) => ({
  type: SET_USER,
  state,
});
