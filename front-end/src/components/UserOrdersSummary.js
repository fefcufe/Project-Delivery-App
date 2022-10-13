import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getOrders } from '../helpers/getDataRequests';
import UserOrdersCards from './UserOrdersCards';

export default function UserOrdersSummary() {
  const [orders, setOrders] = useState([]);

  const { pathname } = useLocation();

  useEffect(() => {
    const myOrders = async () => {
      const allOrders = await getOrders('/orders', pathname);
      setOrders(allOrders);
    };
    myOrders();
  }, [pathname]);

  return (
    <div>
      { orders
        .sort((a, b) => b.id - a.id)
        .map(({
          id,
          status,
          saleDate,
          totalPrice,
          deliveryAddress,
        }, index) => (
          <Link
            to={ `${pathname}/${id}` }
            key={ id }
          >
            <UserOrdersCards
              id={ id }
              status={ status }
              saleDate={ saleDate }
              deliveryAddress={ deliveryAddress }
              totalPrice={ totalPrice }
              index={ index }
            />
          </Link>
        )) }
    </div>
  );
}
