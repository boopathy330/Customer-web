import React from "react";
import { Menu, Dropdown, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../Actions";

export default function UserSession() {
  const history = useHistory();
  const dispatch = useDispatch();
  // const logout = () => {
  //   dispatch(authActions.logout());
  // };

  const logout = () => {
    dispatch(authActions.logout());
    history.push("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={() => history.push("/")}>home</Menu.Item>
      <Menu.Item onClick={() => history.push("/transaction")}>
        transaction
      </Menu.Item>
      <Menu.Item onClick={logout}>logout</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ float: "right", marginRight: "10px" }}>
      <Dropdown overlay={menu} placement="bottomRight">
        <Button color={"black"} size={"large"} shape="circle">
          <UserOutlined />
        </Button>
      </Dropdown>
    </div>
  );
}
