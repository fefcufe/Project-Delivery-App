import React, { useContext, useEffect } from 'react';
import CustomerContext from '../context/CustomerContext';
import CustomerInfoSection from './CustomerInfoSection';
import CustomerOrderSection from './CustomerOrderSection';

export default function CustomerCheckoutSection() {
  const {
    setShoppingCart,
  } = useContext(CustomerContext);

  useEffect(() => {
    const scStorage = JSON.parse(localStorage.getItem('shoppingCart'));
    setShoppingCart(scStorage);
  }, [setShoppingCart]);

  return (
    <>
      <CustomerOrderSection />
      <CustomerInfoSection />
    </>
  );
}
