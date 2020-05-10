import { transactionsConstants } from '../Constants'

const initialState = {
  transactionData: [],
  transactionDataLoading: false
}
export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case transactionsConstants.LOAD_TRANSACATIONS:
      return {
        ...state,
        transactionData: action.payload,
        transactionDataLoading: false
      }
    case transactionsConstants.UPDATE_TRANSACATIONS_LOADING:
      return {
        ...state,
        transactionDataLoading: action.payload
      }
    default:
      return state
  }
}
