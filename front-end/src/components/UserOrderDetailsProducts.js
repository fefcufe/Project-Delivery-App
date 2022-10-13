import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

export default function UserOrderDetailsProducts({
  currOrder,
}) {
  const { pathname } = useLocation();

  const sellerPathname = '/seller/orders';

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
          </tr>
          { currOrder.products.map(({ id, name, price, SalesProducts }, index) => (
            <tr
              key={ id }
              className="table-data"
            >
              <td
                data-testid={ pathname.includes(sellerPathname)
                  ? `seller_order_details__element-order-table-item-number-${index}`
                  : `customer_order_details__element-order-table-item-number-${index}` }
              >
                { index + 1 }
              </td>
              <td
                data-testid={ pathname.includes(sellerPathname)
                  ? `seller_order_details__element-order-table-name-${index}`
                  : `customer_order_details__element-order-table-name-${index}` }
              >
                { name }
              </td>
              <td
                data-testid={ pathname.includes(sellerPathname)
                  ? `seller_order_details__element-order-table-quantity-${index}`
                  : `customer_order_details__element-order-table-quantity-${index}` }
              >
                { SalesProducts.quantity }
              </td>
              <td
                data-testid={ pathname.includes(sellerPathname)
                  ? `seller_order_details__element-order-table-unit-price-${index}`
                  : `customer_order_details__element-order-table-unit-price-${index}` }
              >
                { price.replace(/\./, ',') }
              </td>
              <td
                data-testid={ pathname.includes(sellerPathname)
                  ? `seller_order_details__element-order-table-sub-total-${index}`
                  : `customer_order_details__element-order-table-sub-total-${index}` }
              >
                {
                  String((price * SalesProducts.quantity)
                    .toFixed(2))
                    .replace(/\./, ',')
                }
              </td>
            </tr>
          )) }
        </thead>
      </table>

      <div
        data-testid={ pathname.includes(sellerPathname)
          ? 'seller_order_details__element-order-total-price'
          : 'customer_order_details__element-order-total-price' }
      >
        {
          `Total: R$ ${currOrder.totalPrice.replace(/\./, ',')}`
        }
      </div>
    </div>
  );
}

UserOrderDetailsProducts.propTypes = {
  currOrder: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};
