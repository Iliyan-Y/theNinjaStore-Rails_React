import React from 'react';
import { Switch, Route } from 'react-router-dom';

//components
import Home from './storeHome/home';
import CreateProduct from './Product/createProduct';
import ShowProduct from './Product/showProduct';
import SignUp from './Auth/SignSup';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/new/product" component={CreateProduct} />
      <Route exact path="/show/product/:productId" component={ShowProduct} />
      <Route exact path="/register" component={SignUp} />
    </Switch>
  );
};

export default App;
