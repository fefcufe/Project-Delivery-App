import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import getHomePagePath from '../helpers/getHomePagePath';
import { checkLoginValidation } from '../helpers/inputValidation';
import { requestAuth } from '../services/requests';

export default function LoginForm() {
  const [loginButton, setLoginButton] = useState(true);
  const [loginFail, setLoginFail] = useState(false);
  const [logged, setLogged] = useState(false);
  const [homePage, setHomePage] = useState('');
  const [register, setRegister] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async () => {
    setLoginFail(false);

    try {
      const data = await requestAuth('/login', { email, password });
      const homePagePath = getHomePagePath(data.role);

      localStorage.setItem('user', JSON.stringify(data));

      setHomePage(homePagePath);
      setLogged(true);
    } catch (error) {
      setLoginFail(true);
      setUser({
        email: '',
        password: '',
      });
    }
  };

  const handleRegister = () => setRegister(true);

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    if (userStorage) {
      const homePagePath = getHomePagePath(userStorage.role);
      setHomePage(homePagePath);
      setLogged(true);
    }
    const loginValidation = checkLoginValidation(user);
    return loginValidation ? setLoginButton(false) : setLoginButton(true);
  }, [user]);

  if (logged) return <Navigate to={ homePage } />;
  if (register) return <Navigate to="/register" />;

  return (
    <div>
      <form action="">
        <label htmlFor="email-input">
          E-mail
          <input
            type="email"
            id="email-input"
            name="email"
            value={ email }
            data-testid="common_login__input-email"
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="password-input">
          Password
          <input
            type="text"
            id="password-input"
            name="password"
            value={ password }
            data-testid="common_login__input-password"
            onChange={ handleChange }
          />
        </label>

        <button
          type="button"
          data-testid="common_login__button-login"
          disabled={ loginButton }
          onClick={ handleLogin }
        >
          Login
        </button>

        <button
          type="button"
          data-testid="common_login__button-register"
          onClick={ handleRegister }
        >
          Ainda não tenho conta
        </button>
        {
          loginFail
            && (
              <span
                data-testid="common_login__element-invalid-email"
              >
                Email ou senha incorretos.
              </span>
            )
        }
      </form>
    </div>
  );
}
