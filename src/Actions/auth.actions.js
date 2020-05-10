import { authConstants } from "../Constants";
import { authService } from "../Services";
import { history } from "../Helpers/history";

const login = (email, password) => {
  return (dispatch) => {
    authService.login(email, password).then((result) => {
      if (result.status === 400 || result.status === 401) {
        dispatch({
          type: authConstants.LOAD_ERROR_MSG,
          payload: {
            status: result.status,
            message: result.message,
          },
        });
      } else {
        dispatch({
          type: authConstants.LOAD_USER_PROFILE,
          payload: {
            id: result._id,
            username: result.username,
            role: result.role,
          },
        });
        window.sessionStorage.setItem("token", result.accessToken);
        window.localStorage.setItem("refreshToken", result.refreshToken);
        window.localStorage.setItem("expiresIn", result.expiresIn);
        window.localStorage.setItem("userId", result.userId);
        window.localStorage.setItem("username", result.username);
        window.sessionStorage.setItem("role", result.role);
      }
    });

    return Promise.resolve;
  };
};
const setAuth = () => {
  return (dispatch) => {
    try {
      const { token, user } = authService.checkAuth();
      if (token && user) {
        const userData = JSON.parse(user);
        dispatch({
          type: authConstants.LOAD_USER_PROFILE,
          payload: {
            id: userData._id,
            username: userData.username,
          },
        });
      } else {
        dispatch({ type: authConstants.REMOVE_USER_PROFILE });
      }
    } catch (err) {
      dispatch({ type: authConstants.REMOVE_USER_PROFILE });
    }
  };
};
const logout = () => {
  return (dispatch) => {
    console.log("from function");
    authService.logout();
    history.push("/");
    dispatch({
      type: authConstants.REMOVE_USER_PROFILE,
    });
    window.sessionStorage.removeItem("token");
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("expiresIn");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("username");
    window.sessionStorage.removeItem("role");
    return Promise.resolve();
  };
};
export const authActions = {
  login,
  logout,
  setAuth,
};
