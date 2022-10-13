import React from 'react';
import renderWithRouter from '../tests/utils/RenderWithRouter';
import App from '../App';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { requestUserCreation } from '../services/requests';

const nameInputTestId = 'common_register__input-name';
const emailInputTestId = 'common_register__input-email';
const passwordInputTestId = 'common_register__input-password';
const registerButtonTestId = 'common_register__button-register';
const registerPathname = '/register';

jest.mock('../services/requests');

describe('Tests if Login page has Login components', () => {
  it('should have email/password inputs, and login/register buttons', () => {
    renderWithRouter(<App />, registerPathname);

    const nameInput = screen.getByTestId(nameInputTestId);
    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const registerButton = screen.getByTestId(registerButtonTestId);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });
});

describe('Tests if inputs can be filled', () => {
  it('should be possible to fill email and password', () => {
    renderWithRouter(<App />, registerPathname);

    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);

    userEvent.type(emailInput, 'ravena@gmail.com');
    userEvent.type(passwordInput, 'ravenadog');

    expect(emailInput).toHaveValue('ravena@gmail.com');
    expect(passwordInput).toHaveValue('ravenadog');
  });
});

describe('Should redirect if login returns success', () => {
  const customerUser = {
    email: "zebirita@email.com",
    id: 3,
    name: "Cliente Zé Birita",
    role: "customer",
    token: "any-token"
  };

  it('Should redirect to customer home page', async () => {
    renderWithRouter(<App />, registerPathname);

    const nameInput = screen.getByTestId(nameInputTestId);
    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const registerButton = screen.getByTestId(registerButtonTestId);
    
    userEvent.type(nameInput, 'zebirita ravena');
    userEvent.type(emailInput, 'zebirita@email.com');
    userEvent.type(passwordInput, '$#zebirita#$');
    userEvent.click(registerButton);
    
    await act(async () => {
      expect(requestUserCreation).toHaveBeenCalledTimes(1);
      expect(requestUserCreation).toHaveBeenCalledWith('/register', {
        name: "zebirita ravena",
        email: "zebirita@email.com",
        password: "$#zebirita#$"
      });
    })
  });
});
