import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import HomeCustomer from './pages/HomeCustomer';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerCheckout from './pages/CustomerCheckout';
import CustomerContextLayout from './ContextLayouts/CustomerContextLayout';
import AdmContextLayout from './ContextLayouts/AdmContextLayout';
import CustomerOrders from './pages/CustomerOrders';
import CustomerOrderDetails from './pages/CustomerOrderDetails';
import SellerOrders from './pages/SellerOrders';
import SellerOrderDetails from './pages/SellerOrderDetails';
import HomeAdmin from './pages/HomeAdmin';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/register" element={ <Register /> } />
      <Route element={ <CustomerContextLayout /> }>
        <Route path="/customer/products" element={ <HomeCustomer /> } />
        <Route path="/customer/checkout" element={ <CustomerCheckout /> } />
        <Route path="/customer/orders/:id" element={ <CustomerOrderDetails /> } />
        <Route path="/customer/orders" element={ <CustomerOrders /> } />
      </Route>
      <Route path="/seller/orders/:id" element={ <SellerOrderDetails /> } />
      <Route path="/seller/orders" element={ <SellerOrders /> } />
      <Route element={ <AdmContextLayout /> }>
        <Route path="/admin/manage" element={ <HomeAdmin /> } />
      </Route>
    </Routes>
  );
}

export default App;
