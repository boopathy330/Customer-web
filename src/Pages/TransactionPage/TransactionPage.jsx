import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { transactionActions } from "../../Actions";
import { Table, DatePicker, Tag } from "antd";
import UserSession from "../../Components/UserSession/UserSession.component.jsx";

export default function TransactionPage() {
  const transactionList = useSelector(
    (state) => state.transactions.transactionData
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(transactionActions.getAllTransactions());
  }, [dispatch]);
  const dateFormat = "YYYY-MM-DD";

  const columns = [
    { title: "trasaction id", dataIndex: "_id", key: "_id" },
    {
      title: "products",
      key: "productObjects",
      dataIndex: "productObjects",
      render: (productObjects) => (
        <>
          {productObjects.map((product) => {
            return <Tag key={product._id}>{product.name.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
    {
      title: (
        <DatePicker
          placeholder="createdAt"
          onChange={(date, dateString) => {
            console.log("e", dateString);
            dispatch(transactionActions.getAllTransactions(dateString));
          }}
          format={dateFormat}
        />
      ),
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <div>
      <UserSession />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1>Transaction List</h1>
      </div>
      <div style={{ margin: "10px", padding: "10px" }}>
        <Table
          className="components-table-demo-nested"
          columns={columns}
          dataSource={transactionList}
        />
      </div>
    </div>
  );
}
