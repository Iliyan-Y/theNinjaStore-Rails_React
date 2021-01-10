import React from 'react';
import { Switch, Route } from 'react-router-dom';

//components
import Home from './storeHome/home';
import CreateProduct from './Product/createProduct';
import ShowProduct from './Product/showProduct';
import SignUp from './Auth/SignUp';
import LogIn from './Auth/LogIn';
import BasketPage from './Basket/basketPage';
import ActionBar from './ActionBar/actionBar';
import OrderForm from './Orders/orderForm';
import ViewAllOrders from './AdminPanel/viewAllOrders';
import UserOrders from './UserPanel/userOrders';
import CheckoutCancel from './checkout/cancel';
import CheckoutSuccess from './checkout/success';

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
        <Route exact path="/order" component={OrderForm} />
        <Route exact path="/admin/all-orders" component={ViewAllOrders} />
        <Route exact path="/user/orders" component={UserOrders} />
        <Route exact path="/checkout/success" component={CheckoutSuccess} />
        <Route exact path="/checkout/cancel" component={CheckoutCancel} />
      </Switch>
    </>
  );
};

export default App;
