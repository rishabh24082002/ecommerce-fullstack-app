import API from '../utils/axiosConfig';

export const createOrder = async (data) => {

  const response = await API.post(
    '/orders',
    data
  );

  return response.data;
};

export const getOrders = async () => {

  const response = await API.get(
    '/orders'
  );

  return response.data;
};

export const getOrderById = async (id) => {

  const response = await API.get(
    `/orders/${id}`
  );

  return response.data;
};