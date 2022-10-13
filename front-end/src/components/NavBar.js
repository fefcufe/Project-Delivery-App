import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
  const [userFullName, setUserFullName] = useState('');
  const [mainLinkName, setMainLinkName] = useState('My Orders');

  const { pathname } = useLocation();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserFullName(user.name);
    if (pathname.includes('/seller')) setMainLinkName('Orders');
    if (pathname.includes('/admin')) setMainLinkName('Manage Users');
  }, [pathname]);

  return (
    <header>
      <div>
        { pathname.includes('/customer') && (
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            Products
          </Link>
        )}
        <Link
          to={ pathname.includes('/customer')
            ? '/customer/orders'
            : '/seller/orders' }
          data-testid="customer_products__element-navbar-link-orders"
        >
          { mainLinkName }
        </Link>
      </div>
      <div>
        <div
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { userFullName }
        </div>
        <Link
          to="/"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ () => localStorage.removeItem('user') }
        >
          Log out
        </Link>
      </div>
    </header>
  );
}
