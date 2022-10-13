import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { requestData, requestOrderCreation } from '../services/requests';
import CustomerContext from '../context/CustomerContext';

export default function CustomerInfoSection() {
  const [sellers, setSellers] = useState([]);
  const [saleId, setSaleId] = useState(undefined);
  const [isFinished, setIsFinished] = useState(false);
  const {
    shoppingCart,
  } = useContext(CustomerContext);
  const [userInfo, setUserInfo] = useState({
    sellerId: '2',
    deliveryAddress: '',
    deliveryNumber: '',
  });

  const { sellerId, deliveryAddress, deliveryNumber } = userInfo;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleFinishOrderClick = async () => {
    const totalprice = shoppingCart
      .reduce((acc, currCart) => acc + currCart.subTotal, 0)
      .toFixed(2);
    const { id, token } = JSON.parse(localStorage.getItem('user'));
    const payload = {
      shoppingCart,
      userId: id,
      sellerId: Number(sellerId),
      totalPrice: Number(totalprice),
      deliveryAddress,
      deliveryNumber,
      status: 'Pendente',
    };
    const idSale = await requestOrderCreation('/orders', payload, token);
    setSaleId(idSale);
    setIsFinished(true);
    localStorage.setItem('shoppingCart', JSON.stringify([]));
  };

  const getSellers = (endpoint) => requestData(endpoint)
    .then((response) => setSellers(response))
    .catch((error) => console.log(error));

  useEffect(() => {
    getSellers('/users');
  }, [shoppingCart]);

  if (isFinished) return <Navigate to={ `/customer/orders/${saleId}` } />;

  return (
    <div>
      <div>
        Details and Delivery address
      </div>
      <div>
        <label htmlFor="sales-person-input">
          Sales Person
          <select
            type="text"
            id="sales-person-input"
            name="sellerId"
            data-testid="customer_checkout__select-seller"
            onChange={ handleChange }
          >
            { sellers.map((seller) => (
              seller.role === 'seller'
                ? (
                  <option
                    key={ seller.id }
                    value={ seller.id }
                  >
                    { seller.name }
                  </option>
                )
                : null
            )) }
          </select>
        </label>
        <label htmlFor="address-input">
          Address
          <input
            type="text"
            id="address-input"
            name="deliveryAddress"
            value={ deliveryAddress }
            data-testid="customer_checkout__input-address"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="address-number-input">
          Number
          <input
            type="text"
            id="address-number-input"
            name="deliveryNumber"
            value={ deliveryNumber }
            data-testid="customer_checkout__input-address-number"
            onChange={ handleChange }
          />
        </label>
      </div>
      <div>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleFinishOrderClick }
        >
          Finish Order
        </button>
      </div>
    </div>
  );
}
