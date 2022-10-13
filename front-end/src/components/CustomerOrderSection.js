import React, { useContext } from 'react';
import CustomerContext from '../context/CustomerContext';

export default function CustomerOrderSection() {
  const {
    shoppingCart,
    setShoppingCart,
  } = useContext(CustomerContext);

  const handleRemoveClick = ({ target: { id } }) => {
    const scStorage = JSON.parse(localStorage.getItem('shoppingCart'));
    const scWithRemovedItem = scStorage.filter((item) => item.id !== Number(id));
    setShoppingCart(scWithRemovedItem);
    localStorage.setItem('shoppingCart', JSON.stringify(scWithRemovedItem));
  };

  return (
    <div>
      <table className="table-section">
        <thead>
          <tr>
            <th>
              Item
            </th>
            <th>
              Description
            </th>
            <th>
              Quantity
            </th>
            <th>
              Unit value
            </th>
            <th>
              Sub-total
            </th>
            <th>
              Remove item
            </th>
          </tr>
          { shoppingCart.map((item, index) => (
            <tr
              key={ item.id }
              className="table-data"
            >
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                { item.name }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                { item.quantity }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                { item.price.replace(/\./, ',') }
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                { (String(item.subTotal.toFixed(2))).replace(/\./, ',') }
              </td>
              <td>
                <button
                  type="button"
                  id={ item.id }
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                  onClick={ handleRemoveClick }
                >
                  Remove
                </button>
              </td>
            </tr>
          )) }
        </thead>
      </table>

      <div
        data-testid="customer_checkout__element-order-total-price"
      >
        {
          `Total: R$ ${
            shoppingCart
              .reduce((acc, currCart) => acc + currCart.subTotal, 0)
              .toFixed(2)
              .replace(/\./, ',')
          }`
        }
      </div>
    </div>
  );
}
