import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { authConstants } from "../../Constants";
import { useHistory } from "react-router-dom";
import { config } from "../../Constants";

import "./RegisterPage.css";
const RegisterPage = () => {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const dispatch = useDispatch();
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await window.fetch(`${config.CUSTOMER_SERV}/v1/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });
      const result = await response.json();
      if (result.error) {
        throw result.error;
      } else {
        message.success("Registered Successfully");
        history.push("/login");
      }
    } catch (err) {
      console.log(err);
      message.error(err.message);
    }
  };

  useEffect(() => {
    if (authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  return (
    <div id="register-body">
      <div className="container" id="container">
        <div className="form-container sign-in-container">
          <form onSubmit={handleRegister}>
            <h1
              style={{
                margin: "20px auto",
                fontSize: "2.5em",
                fontWeight: "600",
                color: "#666",
              }}
            >
              Create a new account
            </h1>
            <input
              type="text"
              name="user-name"
              placeholder="user Name *"
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
              minLength="8"
              required
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <a
                href=""
                onClick={() => history.push("/login")}
                style={{ color: "#999", textDecoration: "underline" }}
              >
                Already have an account? Sign In
              </a>
              <button>Register</button>
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button id="signIn" onClick={() => handleRegister()}>
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
