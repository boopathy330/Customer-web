import { productsConstants } from '../Constants'

const initialState = {
  productsData: [],
  productsDataLoading: true
}
export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case productsConstants.LOAD_PRODUCTS:
      return {
        ...state,
        productsData: action.payload,
        productsDataLoading: false
      }
    case productsConstants.UPDATE_PRODUCTS_LOADING:
      return {
        ...state,
        productsDataLoading: action.payload
      }
    default:
      return state
  }
}
