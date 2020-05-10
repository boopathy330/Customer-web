import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./Card.component.css";
import { Button } from "antd";

export default function Card(props) {
  const product = props.product;
  const [clicked, setClicked] = useState(false);
  return (
    <div
      style={{
        boxShadow: "7px 12px 18px 0px rgba(212,212,212,0.33)",
        display: "flex",
        padding: "5px",
        justifyContent: "space-around",
      }}
    >
      <div>
        <h3>{product.name}</h3>
        <div>
          <p>{product.desc}</p>
        </div>
        <div>
          <Button
            type={clicked ? "primary" : "default"}
            onClick={() => {
              if (clicked) {
                props.removeProductCB(product._id);
              } else {
                props.buyProductCB(product._id);
              }
              setClicked(!clicked);
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
