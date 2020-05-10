import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardList from "../../Components/CardList/CardList.component.jsx";
import Addproduct from "../../Components/AddProduct/AddProduct.component.jsx";
import { productActions } from "../../Actions";

const HomePage = () => {
  const productList = useSelector((state) => state.products.productsData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(productActions.getAllProduct());
  }, [dispatch]);
  const role = window.sessionStorage.getItem("role");

  return (
    <>
      {role && role === "ADMIN" && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignContent: "center",
            width: "100%",
            margin: "20px",
            padding: "20px",
          }}
        >
          <Addproduct />
        </div>
      )}

      <div>
        <CardList productList={productList} />
      </div>
    </>
  );
};

export default HomePage;
