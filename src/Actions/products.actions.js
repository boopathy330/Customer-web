import { productsConstants } from "../Constants";
import { productserv } from "../Services";

const getAllProduct = () => {
  return async (dispatch) => {
    try {
      const data = await productserv.getProducts();
      await dispatch({
        type: productsConstants.LOAD_PRODUCTS,
        payload: data,
      });
    } catch (err) {
      console.log(err);
      return Promise.reject;
    }
  };
};

export const productActions = {
  getAllProduct,
};
