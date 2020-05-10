import { config } from "../Constants";
import { authHeader, checkRefresh } from "../Utils/auth-header";

const getProducts = () => {
  checkRefresh();
  const headers = authHeader();
  const requestOptions = {
    method: "GET",
    headers,
  };
  return window
    .fetch(`http://localhost:3001/v1/product`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
};

const addProducts = (product) => {
  checkRefresh();
  const headers = authHeader();
  const requestOptions = {
    method: "POST",
    headers,
    body: JSON.stringify(product),
  };

  return window
    .fetch(`http://localhost:3001/v1/product`, requestOptions)
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

export const productserv = {
  getProducts,
  addProducts,
};
