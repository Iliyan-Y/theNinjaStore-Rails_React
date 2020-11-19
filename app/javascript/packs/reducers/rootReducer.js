import { combineReducers } from 'redux';
import basketReducer from './basketReducer';
import generalReducer from './general';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
  products: productsReducer,
  basket: basketReducer,
  general: generalReducer,
});

export default rootReducer;
