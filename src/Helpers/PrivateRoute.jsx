import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { checkRefresh } from "../Utils/auth-header";

const PrivateRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    if (window.sessionStorage.getItem("refreshToken")) {
      checkRefresh();
    }
  });
  return (
    <Route
      {...rest}
      render={(props) => {
        if (window.sessionStorage.getItem("token")) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
export default PrivateRoute;
