import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const requestAuth = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestUserCreation = async (endpoint, body) => {
  const { data } = await api.post(endpoint, body);
  return data;
};

export const requestData = async (endpoint) => {
  const { data } = await api.get(endpoint);
  return data;
};

export const requestOrderCreation = async (endpoint, body, token) => {
  const config = {
    headers: { Authorization: token },
  };

  const { data } = await api.post(endpoint, body, config);
  return data;
};

export const requestSaleUpdate = async (endpoint, body) => {
  await api.put(endpoint, body);
};

export const requestAdmUserCreation = async (endpoint, payload, token) => {
  const config = {
    headers: { Authorization: token },
  };

  const { data } = await api.post(endpoint, payload, config);
  return data;
};

export const requestDeleteUser = async (endpoint, token) => {
  const config = {
    headers: { Authorization: token },
  };

  const { data } = await api.delete(endpoint, config);
  return data;
};

export default api;
