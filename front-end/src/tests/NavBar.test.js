import React from 'react';
import renderWithRouter from '../tests/utils/RenderWithRouter';
import App from '../App';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const customerPathName = '/customer/products';
const productsLinkTestId = 'customer_products__element-navbar-link-products';
const ordersLinkTestId = 'customer_products__element-navbar-link-orders';
const userFullNameTestId = 'customer_products__element-navbar-user-full-name';
const logoutLinkTestId = 'customer_products__element-navbar-link-logout';

describe('Testa se o navbar na tela de cliente', () => {
  const customerUser = {
    email: "zebirita@email.com",
    id: 3,
    name: "Cliente Zé Birita",
    role: "customer",
    token: "any-token"
  };

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify(customerUser));
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it('Testa os elementos do Navbar na tela do cliente', async () => {
    renderWithRouter(<App />, customerPathName);

    const productsLink = screen.getByTestId(productsLinkTestId);
    const ordersLink = screen.getByTestId(ordersLinkTestId);
    const usernameElement = screen.getByTestId(userFullNameTestId);
    const logoutLink = screen.getByTestId(logoutLinkTestId);

    expect(productsLink).toBeInTheDocument();
    expect(ordersLink).toBeInTheDocument();
    expect(usernameElement).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
  });

  it('Testa se o link do logout limpa a chave user do localstorage', () => {
    act(() => {
      renderWithRouter(<App />, customerPathName);
    })

    const logoutLink = screen.getByTestId(logoutLinkTestId);

    act(() => {
      userEvent.click(logoutLink);
    })

    const user = localStorage.getItem('user');
    expect(user).toBe(null);
  });
});