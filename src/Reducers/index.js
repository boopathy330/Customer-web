import { combineReducers } from 'redux'

import authReducer from './auth.reducer'
import productsReducer from './products.reducer'
import transactionsReducer from './transactions.reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  products: productsReducer,
  transactions: transactionsReducer
})

export default rootReducer
