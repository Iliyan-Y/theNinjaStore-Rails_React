import { combineReducers } from 'redux';
import basketReducer from './basketReducer';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  basket: basketReducer,
});

export default rootReducer;
