import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

const moment = require('moment');

export default function UserOrdersCards({
  id,
  status,
  saleDate,
  totalPrice,
  deliveryAddress,
  index,
}) {
  const { pathname } = useLocation();

  const sellerPathname = '/seller/orders';

  const newDateFormat = moment(saleDate).locale('pt-br').format('DD/MM/YYYY');

  return (
    <div>
      <div
        data-testid={ pathname === sellerPathname
          ? `seller_orders__element-order-id-${id}`
          : `customer_orders__element-order-id-${id}` }
      >
        { index + 1 }
      </div>
      <div>
        <div
          data-testid={ pathname === sellerPathname
            ? `seller_orders__element-delivery-status-${id}`
            : `customer_orders__element-delivery-status-${id}` }
        >
          { status }
        </div>
        <div>
          <span
            data-testid={ pathname === sellerPathname
              ? `seller_orders__element-order-date-${id}`
              : `customer_orders__element-order-date-${id}` }
          >
            { newDateFormat }
          </span>
          <br />
          <span
            data-testid={ pathname === sellerPathname
              ? `seller_orders__element-card-price-${id}`
              : `customer_orders__element-card-price-${id}` }
          >
            { totalPrice.replace(/\./, ',') }
          </span>
        </div>
        { pathname === '/seller/orders' && (
          <div>
            <span
              data-testid={
                `seller_orders__element-card-address-${id}`
              }
            >
              { deliveryAddress }
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

UserOrdersCards.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
