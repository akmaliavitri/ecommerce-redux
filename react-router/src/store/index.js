import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {productReducer} from '../store/reducer/product'
import {chartReducer} from '../store/reducer/chart'

const reducer = combineReducers({
  productReducer,
  chartReducer
})

const store = createStore(reducer,applyMiddleware(thunk))

export default store