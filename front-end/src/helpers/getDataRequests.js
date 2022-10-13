import { requestData } from '../services/requests';

const moment = require('moment');

export const getOrderDetails = (endpoint, pathId, pathName) => requestData(endpoint)
  .then((response) => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    const allOrders = response.filter((order) => (
      (pathName.includes('/customer/orders'))
        ? order.userId === userStorage.id
        : order.sellerId === userStorage.id
    ));
    const myOrder = allOrders.find((order) => +order.id === Number(pathId));
    const orderIndex = allOrders.findIndex((item) => +item.id === Number(pathId));
    const newDateFormat = moment(myOrder.saleDate).locale('pt-br').format('DD/MM/YYYY');
    return {
      ...myOrder,
      saleDate: newDateFormat,
      currIndex: (orderIndex + 1),
    };
  })
  .catch((error) => console.log(error));

export const getOrders = (endpoint, pathname) => requestData(endpoint)
  .then((response) => {
    const userStorage = JSON.parse(localStorage.getItem('user'));
    return response.filter((order) => (
      (pathname === '/customer/orders')
        ? order.userId === userStorage.id
        : order.sellerId === userStorage.id
    ));
  })
  .catch((error) => console.log(error));

export const getUsers = (endpoint) => requestData(endpoint)
  .then((response) => {
    const usersAdmView = response
      .filter((currUser) => currUser.role !== 'administrator');
    return usersAdmView;
  })
  .catch((error) => console.log(error));
