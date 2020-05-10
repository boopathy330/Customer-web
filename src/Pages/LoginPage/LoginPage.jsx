import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { authConstants } from "../../Constants";
import { useHistory } from "react-router-dom";
import "./LoginPage.css";
import { authActions } from "../../Actions";
const Login = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const error = useSelector((state) => state.auth.error);
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(authActions.login(userName, password));
  };

  useEffect(() => {
    if (authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);
  return (
    <div id="login-body">
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin} id="loginForm">
            <h1
              style={{
                margin: "20px auto",
                fontSize: "2.5em",
                fontWeight: "600",
                color: "#666",
              }}
            >
              Sign In
            </h1>
            <input
              type="text"
              name="username"
              placeholder="User Name"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <button type="submit" id="submit">
                Submit
              </button>
              <a
                href=""
                onClick={() => history.push("/signup")}
                style={{ color: "#999", textDecoration: "underline" }}
              >
                Don't have an account? Sign up
              </a>
            </div>
            {error && error.message && (
              <div>
                <span style={{ color: "red", marginTop: "5px" }}>
                  {error.message}
                </span>
              </div>
            )}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
