import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getOrderDetails } from '../helpers/getDataRequests';
import { requestSaleUpdate } from '../services/requests';
import UserOrderDetailsProducts from './UserOrderDetailsProducts';

export default function CustomerOrderDetailsSection() {
  const { id } = useParams();
  const [currOrder, setCurrOrder] = useState({});
  const [isDelivered, setIsDelivered] = useState(true);

  const { pathname } = useLocation();

  const orderDetailsSectionTestIds = {
    orderId: 'customer_order_details__element-order-details-label-order-id',
    sellerName: 'customer_order_details__element-order-details-label-seller-name',
    orderDate: 'customer_order_details__element-order-details-label-order-date',
    deliveryCheck: 'customer_order_details__button-delivery-check',
  };

  const handleDeliveredClick = ({ target }) => {
    requestSaleUpdate(`/orders/${target.id}`, { status: 'Entregue' });
  };

  useEffect(() => {
    const myOrder = async () => {
      const order = await getOrderDetails('/complete-orders', id, pathname);
      setCurrOrder(order);
      return (order.status === 'Em Trânsito')
        ? setIsDelivered(false) : setIsDelivered(true);
    };
    myOrder();
  }, [id, pathname, currOrder]);

  return (
    currOrder.currIndex
      ? (
        <div>
          <div style={ { marginLeft: '10px' } }>
            <span
              data-testid={ orderDetailsSectionTestIds.orderId }
            >
              { currOrder.currIndex }
            </span>
            <br />
            <span
              data-testid={ orderDetailsSectionTestIds.sellerName }
            >
              { currOrder.seller.name }
            </span>
            <br />
            <span
              data-testid={ orderDetailsSectionTestIds.orderDate }
            >
              { currOrder.saleDate }
            </span>
            <br />
            <span
              data-testid={
                'customer_order_details__element-'
                + `order-details-label-delivery-status${currOrder.currIndex}`
              }
            >
              { currOrder.status }
            </span>
            <br />
            <button
              id={ currOrder.id }
              type="button"
              data-testid={ orderDetailsSectionTestIds.deliveryCheck }
              onClick={ handleDeliveredClick }
              disabled={ isDelivered }
            >
              Mark as Delivered
            </button>
          </div>
          <UserOrderDetailsProducts currOrder={ currOrder } />
        </div>)
      : ''
  );
}
