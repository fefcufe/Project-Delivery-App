import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getOrderDetails } from '../helpers/getDataRequests';
import { requestSaleUpdate } from '../services/requests';
import UserOrderDetailsProducts from './UserOrderDetailsProducts';

export default function SellerOrderDetailsSection() {
  const { id } = useParams();
  const [currOrder, setCurrOrder] = useState({});
  const [isPreparing, setIsPreparing] = useState(false);
  const [isDispatched, setIsDispatched] = useState(true);

  const { pathname } = useLocation();

  const orderDetailsSectionTestIds = {
    orderId: 'seller_order_details__element-order-details-label-order-id',
    orderDate: 'seller_order_details__element-order-details-label-order-date',
    orderStatus: 'seller_order_details__element-order-details-label-delivery-status',
    preparingCheck: 'seller_order_details__button-preparing-check',
    dispatchCheck: 'seller_order_details__button-dispatch-check',
  };

  const handlePreparingClick = ({ target }) => {
    requestSaleUpdate(`/orders/${target.id}`, { status: 'Preparando' });
  };

  const handleDispatchClick = ({ target }) => {
    requestSaleUpdate(`/orders/${target.id}`, { status: 'Em Trânsito' });
  };

  useEffect(() => {
    const myOrder = async () => {
      const order = await getOrderDetails('/complete-orders', id, pathname);
      setCurrOrder(order);
      if (order.status !== 'Pendente') setIsPreparing(true);
      if (order.status === 'Preparando') setIsDispatched(false);
      if (order.status === 'Em Trânsito') setIsDispatched(true);
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
              data-testid={ orderDetailsSectionTestIds.orderDate }
            >
              { currOrder.saleDate }
            </span>
            <br />
            <span
              data-testid={ orderDetailsSectionTestIds.orderStatus }
            >
              { currOrder.status }
            </span>
            <br />
            <button
              id={ currOrder.id }
              type="button"
              data-testid={ orderDetailsSectionTestIds.preparingCheck }
              onClick={ handlePreparingClick }
              disabled={ isPreparing }
            >
              Prepare Order
            </button>
            <button
              id={ currOrder.id }
              type="button"
              data-testid={ orderDetailsSectionTestIds.dispatchCheck }
              onClick={ handleDispatchClick }
              disabled={ isDispatched }
            >
              In transit
            </button>
          </div>
          <UserOrderDetailsProducts currOrder={ currOrder } />
        </div>)
      : ''
  );
}
