import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout/Layout';
import Home from './components/Home';
import Checkout from './components/Checkout/Checkout'; 

import './custom.css'
import CartProvider from './store/CartProvider';

const App = () => {

  return (
      <CartProvider>
        <Layout>
          <Route exact path='/' component={Home} />
          <Route path='/checkout' component={Checkout} />
        </Layout>
      </CartProvider>
    );
  
}
export default App
