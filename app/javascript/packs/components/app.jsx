import React from 'react';
import { Switch, Route } from 'react-router-dom';

//components
import Home from './storeHome/home';
import CreateProduct from './Product/createProduct';
import ShowProduct from './Product/showProduct';
import SignUp from './Auth/SignSup';
import LogIn from './Auth/LogIn';
import BasketPage from './Basket/basketPage';
import ActionBar from './ActionBar/actionBar';

const App = () => {
  return (
    <>
      <ActionBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/new/product" component={CreateProduct} />
        <Route exact path="/show/product/:productId" component={ShowProduct} />
        <Route exact path="/register" component={SignUp} />
        <Route exact path="/log-in" component={LogIn} />
        <Route exact path="/basket" component={BasketPage} />
      </Switch>
    </>
  );
};

export default App;
