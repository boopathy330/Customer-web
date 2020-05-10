import { config } from "../Constants";
import { authHeader, checkRefresh } from "../Utils/auth-header";

const getAllTransacations = (params) => {
  checkRefresh();
  const headers = authHeader();
  const requestOptions = {
    method: "GET",
    headers,
  };
  const url = `http://localhost:3001/v1/transaction`;
  if (params) {
    url = url + "?createdAt" + params.createdAt;
  }
  return window
    .fetch(url, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
};

const addTransacations = (transaction) => {
  checkRefresh();
  const headers = authHeader();
  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify(transaction),
  };
  return window
    .fetch(`http://localhost:3001/v1/transaction`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
};

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    return data;
  });
}

export const transactionServ = {
  getAllTransacations,
  addTransacations,
};
