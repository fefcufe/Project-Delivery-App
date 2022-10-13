import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerContext from '../context/CustomerContext';

export default function SubtotalBar() {
  const [checkoutBtnDisabled, setCheckoutBtnDisabled] = useState(true);
  const {
    shoppingCart,
  } = useContext(CustomerContext);

  const navigate = useNavigate();

  useEffect(
    () => ((shoppingCart.length > 0)
      ? setCheckoutBtnDisabled(false) : setCheckoutBtnDisabled(true)),
    [shoppingCart],
  );

  return (
    <button
      type="button"
      data-testid="customer_products__button-cart"
      onClick={ () => navigate('/customer/checkout') }
      disabled={ checkoutBtnDisabled }
    >
      <p data-testid="customer_products__checkout-bottom-value">
        {
          shoppingCart
            .reduce((acc, currCart) => acc + currCart.subTotal, 0)
            .toFixed(2)
            .replace(/\./, ',')
        }
      </p>
    </button>
  );
}
