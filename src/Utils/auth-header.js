import { config } from "../Constants";

export function authHeader() {
  // return authorization header with jwt token
  const token = window.sessionStorage.getItem("token");

  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
  } else {
    return {};
  }
}

export function checkRefresh() {
  const expiresIn = window.localStorage.getItem("expiresIn");
  const userName = window.localStorage.getItem("username");
  const refreshToken = window.localStorage.getItem("refreshToken");
  console.log("am trigged", refreshToken, expiresIn);
  if (refreshToken && expiresIn) {
    const exp = new Date(expiresIn);

    const now = new Date();
    console.log("time", exp.getTime() < now.getTime());
    if (exp.getTime() < now.getTime()) {
      console.log("am exprired");
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          user_name: userName,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        }),
      };
      return window
        .fetch(`${config.CUSTOMER_SERV}/v1/user/auth/token`, requestOptions)
        .then(handleResponse)
        .then((result) => {
          window.sessionStorage.setItem("token", result.accessToken);
          window.localStorage.setItem("expiresIn", result.expiresIn);
          window.localStorage.setItem("userId", result.userId);
          window.localStorage.setItem("username", result.username);
          window.sessionStorage.setItem("role", result.role);
          return result;
        });
    }
  }
}

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    return data;
  });
}
