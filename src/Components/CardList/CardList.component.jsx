import React, { useState } from "react";
import Card from "../Card/Card.component.jsx";
import "./CardList.component.css";
import { Row, Col, Button } from "antd";
import { transactionServ } from "../../Services";

export default function CardList(props) {
  const productList = props.productList;
  const [productId, setProductId] = useState([]);

  const createTransaction = async () => {
    const userId = window.localStorage.getItem("userId");
    if (productId && productId.length > 0) {
      const transaction = {
        productId: productId,
        userId: userId,
      };
      const createdTransaction = await transactionServ.addTransacations(
        transaction
      );
      console.log("transactions", transaction);
    }
  };
  return (
    <>
      <div style={{ margin: "25px" }}>
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <h1>Add the Products to Start Transaction</h1>
        </div>
        <div
          style={{
            border: "1px solid black",
            padding: "10px",
            minHeight: "400px",
            paddingTop: "30px",
          }}
        >
          <Row gutter={[16, 8]}>
            {productList &&
              productList.length > 0 &&
              productList.map((product) => {
                return (
                  <Col span={4} xs={24} md={4}>
                    <Card
                      product={product}
                      buyProductCB={(productId) => {
                        setProductId((oldArray) => [...oldArray, productId]);
                      }}
                      removeProductCB={(id) => {
                        const index = productId.indexOf(id);
                        if (index > -1) {
                          productId.splice(index, 1);
                        }
                        setProductId(productId);
                        console.log(productId);
                      }}
                    />
                  </Col>
                );
              })}
          </Row>
        </div>
      </div>
      {productId && productId.length > 0 && (
        <div
          style={{
            width: "100%",
            bottom: "0",
            position: "fixed",
            overflow: "hidden",
            height: "50px",
            background: "black",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button default style={{ width: "30%" }} onClick={createTransaction}>
            Buy
          </Button>
        </div>
      )}
    </>
  );
}
