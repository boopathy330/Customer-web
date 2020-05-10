import { transactionsConstants } from "../Constants";
import { transactionServ } from "../Services";

const getAllTransactions = (params) => {
  return async (dispatch) => {
    try {
      const data = await transactionServ.getAllTransacations(params);
      await dispatch({
        type: transactionsConstants.LOAD_TRANSACATIONS,
        payload: data,
      });
    } catch (err) {
      console.log(err);
      return Promise.reject;
    }
  };
};

export const transactionActions = {
  getAllTransactions,
};
