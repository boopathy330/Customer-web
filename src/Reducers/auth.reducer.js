import { authConstants } from "../Constants";

const initialState = {
  authenticated: false,
  user: {},
  error: {},
};
export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case authConstants.LOAD_USER_PROFILE:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
        error: {},
      };
    case authConstants.REMOVE_USER_PROFILE:
      return {
        ...state,
        authenticated: false,
        user: {},
        error: {},
      };
    case authConstants.LOAD_ERROR_MSG:
      return {
        ...state,
        authenticated: false,
        user: {},
        error: action.payload,
      };
    default:
      return state;
  }
};
