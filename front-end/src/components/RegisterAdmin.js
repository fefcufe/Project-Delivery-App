import React, { useState, useEffect, useContext } from 'react';
import AdmContext from '../context/AdmContext';
import { getUsers } from '../helpers/getDataRequests';
import { checkAdmUserCreationValidation } from '../helpers/inputValidation';
import { requestAdmUserCreation } from '../services/requests';

export default function RegisterAdmin() {
  const [registerButton, setRegisterButton] = useState(true);
  const [registerFail, setRegisterFail] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'default',
  });
  const { setUsers } = useContext(AdmContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async () => {
    setRegisterFail(false);

    try {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const allUsers = await requestAdmUserCreation('/users', user, token);
      const allUsersAdmView = allUsers
        .filter((currUser) => currUser.role !== 'administrator');

      setUsers(allUsersAdmView);
      setUser({
        name: '',
        email: '',
        password: '',
        role: 'default',
      });
    } catch (error) {
      setRegisterFail(true);
    }
  };

  useEffect(() => {
    const registerValidation = checkAdmUserCreationValidation(user);
    return registerValidation ? setRegisterButton(false) : setRegisterButton(true);
  }, [user]);

  useEffect(() => {
    const returnMyUsers = async () => {
      const myUsers = await getUsers('/users');
      setUsers(myUsers);
    };
    returnMyUsers();
  }, [setUsers]);

  return (
    <div>
      {
        registerFail
          && (
            <span
              data-testid="admin_manage__element-invalid-register"
            >
              User already exists.
            </span>
          )
      }

      <form action="">
        <label htmlFor="name-input">
          Name
          <input
            type="text"
            id="name-input"
            name="name"
            value={ user.name }
            data-testid="admin_manage__input-name"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="email-input">
          Email
          <input
            type="email"
            id="email-input"
            name="email"
            value={ user.email }
            data-testid="admin_manage__input-email"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password-input">
          Password
          <input
            type="password"
            id="password-input"
            name="password"
            value={ user.password }
            data-testid="admin_manage__input-password"
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="role-select">
          Role
          <select
            id="role-select"
            name="role"
            data-testid="admin_manage__select-role"
            onChange={ handleChange }
          >
            <option value="default">
              Select Role...
            </option>
            <option value="seller">
              Seller
            </option>
            <option value="customer">
              Customer
            </option>
          </select>
        </label>
        <button
          type="button"
          data-testid="admin_manage__button-register"
          disabled={ registerButton }
          onClick={ handleRegister }
        >
          Register
        </button>
      </form>
    </div>
  );
}
