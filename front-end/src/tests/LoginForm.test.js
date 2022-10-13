import React from 'react';
import renderWithRouter from '../tests/utils/RenderWithRouter';
import App from '../App';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { requestAuth } from '../services/requests';

const emailInputTestId = 'common_login__input-email';
const passwordInputTestId = 'common_login__input-password';
const loginButtonTestId = 'common_login__button-login';
const registerButtonTestId = 'common_login__button-register';
const loginPathname = '/login';

jest.mock('../services/requests');

describe('Testa os componentes da página Login', () => {
  it('Deve ter email/password inputs, e register/login buttons', () => {
    renderWithRouter(<App />, loginPathname);

    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const loginButton = screen.getByTestId(loginButtonTestId);
    const registerButton = screen.getByTestId(registerButtonTestId);

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});

describe('Tests if inputs can be filled', () => {
  it('should be possible to fill email and password', () => {
    renderWithRouter(<App />, loginPathname);

    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);

    userEvent.type(emailInput, 'ravena@gmail.com');
    userEvent.type(passwordInput, 'ravenadog');

    expect(emailInput).toHaveValue('ravena@gmail.com');
    expect(passwordInput).toHaveValue('ravenadog');
  });
});

describe('Testa se redireciona para tela do usuário após login', () => {
  const customerUser = {
    email: "zebirita@email.com",
    id: 3,
    name: "Cliente Zé Birita",
    role: "customer",
    token: "any-token"
  };

  afterEach(() => {
    window.localStorage.clear();
  });

  it('Deve redirecionar para tela principal do cliente', () => {
    localStorage.setItem('user', JSON.stringify(customerUser));
    const { customHistory } = renderWithRouter(<App />, loginPathname);

    expect(customHistory.location.pathname).toBe('/customer/products');
  });
});

describe('Testa se redireciona para tela do usuário após login', () => {
  it('Deve redirecionar para tela principal do cliente', () => {
    renderWithRouter(<App />, loginPathname);

    const registerButton = screen.getByTestId(registerButtonTestId);

    userEvent.click(registerButton);
  });
});

describe('Deve redirecionar se login retornar sucesso', () => {
  const customerUser = {
    email: "zebirita@email.com",
    id: 3,
    name: "Cliente Zé Birita",
    role: "customer",
    token: "anytoken"
  };

  it('Should redirect to customer home page', async () => {
    renderWithRouter(<App />, loginPathname);

    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const loginButton = screen.getByTestId(loginButtonTestId);
    
    userEvent.type(emailInput, 'zebirita@email.com');
    userEvent.type(passwordInput, '$#zebirita#$');
    userEvent.click(loginButton);
    
    await act(async () => {
      expect(requestAuth).toHaveBeenCalledTimes(1);
      expect(requestAuth).toHaveBeenCalledWith('/login', {email: "zebirita@email.com", password: "$#zebirita#$"} );
    })
  });
});
