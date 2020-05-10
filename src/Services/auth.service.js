import { config } from "../Constants";
import { authHeader } from "../Utils/auth-header";

const login = (username, password) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_name: username,
      password: password,
      grant_type: "password",
    }),
  };
  return window
    .fetch(`${config.CUSTOMER_SERV}/v1/user/auth/token`, requestOptions)
    .then(handleResponse)
    .then((result) => {
      console.log("response", result);
      if (result && result.error && result.error.status === 400) {
        return result.error;
      } else {
        return result;
      }
    });
};

const checkAuth = () => {
  try {
    const token = window.sessionStorage.getItem("token");
    const user = {
      userId: window.localStorage.getItem("userId"),
      username: window.localStorage.getItem("userName"),
    };
    if (token && user) {
      return { token, user };
    } else {
      const token = false;
      const user = false;
      return { token, user };
    }
  } catch (err) {
    console.log(err);
    return Error;
  }
};

const logout = () => {
  // remove user from local storage to log user out
  const headers = authHeader();
  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify({
      user_id: window.localStorage.getItem("userId"),
      refresh_token: window.localStorage.getItem("refreshToken"),
    }),
  };

  return window
    .fetch(`${config.CUSTOMER_SERV}/v1/user/revoke/token`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return Promise.resolve;
    });
};

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    return data;
  });
}

export const authService = {
  login,
  logout,
  checkAuth,
};
