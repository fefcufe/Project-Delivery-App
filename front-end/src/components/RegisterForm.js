import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { checkRegisterValidation } from '../helpers/inputValidation';
import { requestUserCreation } from '../services/requests';

export default function RegisterForm() {
  const [registerButton, setRegisterButton] = useState(true);
  const [registerFail, setRegisterFail] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async () => {
    setRegisterFail(false);

    try {
      await requestUserCreation('/register', user);

      setIsRegistered(true);
    } catch (error) {
      setRegisterFail(true);
      setUser({
        name: '',
        email: '',
        password: '',
      });
    }
  };

  useEffect(() => {
    const registerValidation = checkRegisterValidation(user);
    return registerValidation ? setRegisterButton(false) : setRegisterButton(true);
  }, [user]);

  if (isRegistered) return <Navigate to="/customer/products" />;

  return (
    <div>
      <form action="">
        <label htmlFor="name-input">
          Name
          <input
            type="text"
            id="name-input"
            name="name"
            value={ user.name }
            data-testid="common_register__input-name"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="email-input">
          E-mail
          <input
            type="email"
            id="email-input"
            name="email"
            value={ user.email }
            data-testid="common_register__input-email"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="password-input">
          Password
          <input
            type="text"
            id="password-input"
            name="password"
            value={ user.password }
            data-testid="common_register__input-password"
            onChange={ handleChange }
          />
        </label>

        <button
          type="button"
          data-testid="common_register__button-register"
          disabled={ registerButton }
          onClick={ handleRegister }
        >
          Register
        </button>

        {
          registerFail
            && (
              <span
                data-testid="common_register__element-invalid_register"
              >
                User already exists.
              </span>
            )
        }
      </form>
    </div>
  );
}
