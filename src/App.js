import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./Helpers/PrivateRoute";
import { HomePage, LoginPage, RegisterPage, TransactionPage } from "./Pages";
import { authActions } from "./Actions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.setAuth());
  }, [dispatch]);

  return (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/signup" component={RegisterPage} />
      <PrivateRoute path="/transaction" component={TransactionPage} />
      <PrivateRoute path="/" strict component={HomePage} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}

export default App;
