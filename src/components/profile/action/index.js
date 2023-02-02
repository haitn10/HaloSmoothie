import Axios from "axios";
import { baseURL } from "../../../api";

export const LOGIN = "LOGIN";
export const GET_PROFILE = "GET_PROFILE";
export const SET_PROFILE_STATE = "SET_PROFILE_STATE";

export const setState = (state) => ({
  type: SET_PROFILE_STATE,
  state,
});

export const login = (credential) => {
  return async (dispatch, getState) => {
    const state = getState().profile;
    if (state.isLoggingIn) {
      return Promise.reject(new Error("You are being logged in.").message);
    }
    try {
      dispatch(setState({ isLoggingIn: true }));
      const { data: profile } = await Axios.post(
        `${baseURL}/api/login`,
        credential
      );
      Axios.defaults.headers = { Authorization: profile.accessToken };
      dispatch(setState({ isLoggingIn: false, profile }));
    } catch (e) {
      dispatch(setState({ isLoggingIn: false }));
      const message = e.response.data ? e.response.data.message : e.message;
      return Promise.reject(message);
    }
  };
};

export const getProfile = () => {
  return async (dispatch, getState) => {
    const state = getState().profile;
    if (state.isLoggingIn) {
      return Promise.reject(new Error("You are being logged in.").message);
    }

    dispatch(setState({ isLoggingIn: true }));
  };
};
