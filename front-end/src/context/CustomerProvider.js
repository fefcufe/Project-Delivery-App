import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import CustomerContext from './CustomerContext';

function CustomerProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState([]);

  const contextValue = useMemo(() => ({
    shoppingCart,
    setShoppingCart,
  }), [shoppingCart]);

  return (
    <CustomerContext.Provider value={ contextValue }>
      { children }
    </CustomerContext.Provider>
  );
}

CustomerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomerProvider;
