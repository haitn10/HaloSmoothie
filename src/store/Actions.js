import {
  LOG_OUT,
  SET_TOKEN,
  SET_PRODUCTS,
  SET_OFFICES,
  SET_MATERIALS,
  SET_COUPONS,
  SET_PROFILE,
  SET_STAFFERS,
} from "./Constants";

export const setToken = (state) => ({
  type: SET_TOKEN,
  state,
});

export const setProfile = (state) => ({
  type: SET_PROFILE,
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

export const setStaffers = (state) => ({
  type: SET_STAFFERS,
  state,
});

export const logOut = () => ({
  type: LOG_OUT,
});
