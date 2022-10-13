import React, { useContext } from 'react';
import AdmContext from '../context/AdmContext';
import { requestDeleteUser } from '../services/requests';

export default function UsersList() {
  const { users, setUsers } = useContext(AdmContext);

  const handleRemoveClick = async ({ target: { id } }) => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    const newUsers = await requestDeleteUser(`/users/${id}`, token);
    const newUsersAdmView = newUsers
      .filter((currUser) => currUser.role !== 'administrator');
    if (newUsers) setUsers(newUsersAdmView);
  };

  return (
    <div>
      <table className="table-section">
        <thead>
          <tr>
            <th>
              Item
            </th>
            <th>
              Name
            </th>
            <th>
              E-mail
            </th>
            <th>
              Role
            </th>
            <th>
              Remove
            </th>
          </tr>
          { users.map((item, index) => (
            <tr
              key={ item.id }
              className="table-data"
            >
              <td
                data-testid={
                  `admin_manage__element-user-table-item-number-${index}`
                }
              >
                { index + 1 }
              </td>
              <td
                data-testid={
                  `admin_manage__element-user-table-name-${index}`
                }
              >
                { item.name }
              </td>
              <td
                data-testid={
                  `admin_manage__element-user-table-email-${index}`
                }
              >
                { item.email }
              </td>
              <td
                data-testid={
                  `admin_manage__element-user-table-role-${index}-${index}`
                }
              >
                { item.role }
              </td>
              <td>
                <button
                  type="button"
                  id={ item.id }
                  data-testid={
                    `admin_manage__element-user-table-remove-${index}`
                  }
                  onClick={ handleRemoveClick }
                >
                  Remove
                </button>
              </td>
            </tr>
          )) }
        </thead>
      </table>
    </div>
  );
}
