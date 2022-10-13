import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import handleLocalStorage from '../helpers/handleCustomerLocalStorage';
import CustomerContext from '../context/CustomerContext';

export default function ProductsCard({
  id,
  name,
  price,
  urlImage,
}) {
  const [quantity, setQuantity] = useState('0');
  const [decreasedButton, setDecreasedButton] = useState(true);
  const {
    setShoppingCart,
  } = useContext(CustomerContext);

  const cartItem = {
    id,
    name,
    price,
    urlImage,
    quantity,
    subTotal: price * quantity,
  };

  const handleQuantityInput = ({ target }) => {
    const numberTarget = target.value;
    setQuantity(numberTarget);
    if (quantity === 0) return setDecreasedButton(true);
    setDecreasedButton(false);
    handleLocalStorage({
      ...cartItem,
      quantity: String(Number(numberTarget)),
      subTotal: price * String((Number(numberTarget))),
    });
  };

  const handleKeyDown = (event) => {
    if (['e', 'E', '+', '-'].includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleIncreaseButton = () => {
    setDecreasedButton(false);
    setQuantity(String(Number(quantity) + 1));
    handleLocalStorage({
      ...cartItem,
      quantity: String(Number(quantity) + 1),
      subTotal: price * (String(Number(quantity) + 1)),
    });
  };

  const handleDecreaseButton = () => {
    setQuantity(String(Number(quantity) - 1));
    handleLocalStorage({
      ...cartItem,
      quantity: String(Number(quantity) - 1),
      subTotal: price * (String(Number(quantity) - 1)),
    });
  };

  useEffect(() => quantity === '0' && setDecreasedButton(true), [quantity]);

  useEffect(() => {
    const scStorage = JSON.parse(localStorage.getItem('shoppingCart'));
    setShoppingCart(scStorage);
    const scStorageItem = JSON.parse(localStorage.getItem('shoppingCart'))
      .find((cart) => cart.id === id);
    if (scStorageItem) {
      setQuantity(scStorageItem.quantity);
      setDecreasedButton(false);
    }
  }, [id, setShoppingCart, quantity]);

  return (
    <div>
      <div>
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          { `R$ ${price.replace(/\./, ',')}` }
        </p>
        <img
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt={ name }
          width="100px"
          height="100px"
        />
      </div>
      <div>
        <p
          data-testid={ `customer_products__element-card-title-${id}` }
        >
          { name }
        </p>
        <div>
          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            onClick={ handleDecreaseButton }
            disabled={ decreasedButton }
          >
            -
          </button>
          <input
            type="number"
            data-testid={ `customer_products__input-card-quantity-${id}` }
            onKeyDown={ handleKeyDown }
            min="0"
            value={ quantity }
            onChange={ handleQuantityInput }
          />
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            onClick={ handleIncreaseButton }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

ProductsCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};
