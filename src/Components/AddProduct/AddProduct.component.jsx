import React, { useState } from "react";
import { Input, Button } from "antd";
import { productserv } from "../../Services";
import "./AddProduct.component.jsx";
import { productActions } from "../../Actions";
import { message } from "antd";
import { useSelector, useDispatch } from "react-redux";

export default function AddProduct() {
  const dispatch = useDispatch();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const addProduct = async () => {
    const product = {
      name: name,
      desc: desc,
    };
    const data = await productserv.addProducts(product);
    console.log("data", data);
    if (data._id) {
      message.success("product added successfully");
      setName("");
      setDesc("");
      dispatch(productActions.getAllProduct());
    }
  };

  return (
    <div>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Add New Product</h1>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "10px" }}>
          <label>Name</label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Input>
        </div>
        <div style={{ marginLeft: "10px" }}>
          <label>desc</label>
          <Input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></Input>
        </div>
        <div style={{ marginLeft: "20px", marginTop: "20px" }}>
          <Button type="primary" onClick={addProduct}>
            {" "}
            add
          </Button>
        </div>
      </div>
    </div>
  );
}
