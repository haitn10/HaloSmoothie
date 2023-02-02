import { LOGIN, GET_PROFILE, SET_PROFILE_STATE } from "../action";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = { isFetching: false, isLoggingIn: false }, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
      };
    case GET_PROFILE:
      return {
        ...state,
        ...action.state
      }
      case SET_PROFILE_STATE:
        return {
          ...state,
          ...action.state
        }
    default:
      return state;
  }
};
